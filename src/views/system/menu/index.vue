<template>
  <div class="main" style="margin: 10px">
    <el-card>
      <Toobar :AddBtnAuth="AddBtnAuth" @handleAdd='handleAdd'></Toobar>
      <el-card style="margin-top: 10px">
        <el-table ref="table" :data="tableData" style="width: 100%" row-key="id" lazy :load="getChildMenus" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column type="index" label="#" width="55"> </el-table-column>
          <el-table-column prop="title" label="菜单标题"> </el-table-column>
          <el-table-column prop="icon" label="图标" align="center" width="50">
            <template slot-scope="props">
              <e-icon :icon-name="props.row.icon" v-if="props.row.icon" />
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" align="center"> </el-table-column>
          <el-table-column prop="path" label="路由" align="center">
            <template slot-scope="props">
              <span>{{props.row.path}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="component" label="组件路径" align="center">
            <template slot-scope="props">
              <span v-if="props.row.component == 'Layout'">--</span>
              <span v-else>{{ props.row.component== undefined ? '--' : props.row.component }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="permissions" label="权限标识" align="center">
            <template slot-scope="props">
              {{ props.row.permissions == '' ? '--' : props.row.permissions }}
            </template>
          </el-table-column>
          <el-table-column prop="redirect" label="重定向" align="center">
            <template slot-scope="props">
              <span>{{props.row.redirect}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="菜单类型" align="center" width="80">
            <template slot-scope="props">
              <el-tag type="success" v-if="props.row.type == 1">菜单</el-tag>
              <el-tag type="warning" v-if="props.row.type == 2">子菜单</el-tag>
              <el-tag type="danger" v-if="props.row.type == 3">按钮</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="hidden" label="侧边栏隐藏" align="center" :formatter='changeType'>
            <template slot-scope="props">
              <el-switch v-model="props.row.hidden" disabled :active-value="1" active-text="是" :inactive-value="0" inactive-text="否">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="breadcrumb" label="面包屑中显示" align="center">
            <template slot-scope="props">
              <el-switch v-model="props.row.breadcrumb" disabled :active-value="1" active-text="是" :inactive-value="0" inactive-text="否">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="alwaysShow" align="center">
            <template slot="header" slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式" placement="top">
                <span> 始终可见</span>
              </el-tooltip>
            </template>
            <template slot-scope="props">
              <el-switch v-model="props.row.alwaysShow" disabled :active-value="1" active-text="是" :inactive-value="0" inactive-text="否" v-if="props.row.type == 1">
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column prop="date" label="创建日期" align="center">
            <template slot-scope="props">
              {{ props.row.date | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="props">
              <el-button type="primary" @click="handleEdit(props.row)">编辑</el-button>
              <el-button type="danger" :disabled="info.identity != 99&&props.row.id >=1 && props.row.id <= 18" @click="handleDelete(props.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-card>
    <DialogMenu :dialogMenu=' dialogMenu' :formData='formData' @handleSubmit='handleSubmit' @handleSubmitEdit='handleSubmitEdit'>
    </DialogMenu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Toobar from '@/components/System/toobar';
import { getMenuList, addMenu, delMenu, updateMenu } from '@/api/system/menu';
import DialogMenu from '@/components/System/menu/dialogMenu.vue';
export default {
  data() {
    return {
      AddBtnAuth: ['add'],
      tableData: [],
      dialogMenu: {
        show: false,
      },
      formData: {},
      oldPid: '',
    };
  },
  computed: {
    ...mapGetters(['menus', 'info']),
  },
  methods: {
    //是否多服务数据处理
    changeType(row, column) {
      return row.hidden == 1 ? '是' : '否';
    },
    getMenuList() {
      getMenuList({ pid: 0 }).then((res) => {
        res.data.forEach((item, index) => {
          if (!item.title && this.menus[index].id == item.id && this.menus[index].children) {
            res.data[index].title = this.menus[index].children[0].title;
          }
        });
        this.tableData = res.data;
      });
    },
    //回调函数
    getChildMenus(tree, treeNode, resolve) {
      const data = { pid: tree.id };
      getMenuList(data).then((res) => {
        resolve(res.data);
      });
    },
    // 新增按钮触发
    handleAdd() {
      this.dialogMenu = {
        show: true,
        title: '新增菜单',
        option: 'add',
      };
      this.formData = {
        type: 1,
        pid: null,
        icon: null,
        path: null,
        title: null,
        sort: 1,
        name: null,
        redirect: null,
        component: 'Layout',
        hidden: 0,
        breadcrumb: 1,
        alwaysShow: 0,
      };
    },
    //提交新增请求
    handleSubmit() {
      addMenu(this.formData).then((res) => {
        this.dialogMenu.show = false;
        this.$message.success('新增成功！');
        if (this.formData.pid != 0) {
          // 实现无感刷新
          getMenuList({ pid: this.formData.pid }).then((res) => {
            this.$set(this.$refs.table.store.states.lazyTreeNodeMap, this.formData.pid, res.data);
          });
        }
        this.getMenuList();
      });
    },
    // 提交编辑请求
    handleSubmitEdit() {
      if (this.formData.id == this.formData.pid) {
        this.$message.error('自己不能成为自己的下级！');
        return false;
      }
      updateMenu(this.formData.id, this.formData).then((res) => {
        this.dialogMenu.show = false;
        this.$message.success('修改成功！');
        if (this.formData.pid != 0) {
          if (this.formData.pid != this.oldPid) {
            // 这时候说明已经改变了上级类目
            getMenuList({ pid: this.oldPid }).then((res) => {
              this.$set(this.$refs.table.store.states.lazyTreeNodeMap, this.oldPid, res.data);
              getMenuList({ pid: this.formData.pid }).then((res) => {
                this.$set(this.$refs.table.store.states.lazyTreeNodeMap, this.formData.pid, res.data);
              });
            });
          } else {
            getMenuList({ pid: this.formData.pid }).then((res) => {
              this.$set(this.$refs.table.store.states.lazyTreeNodeMap, this.formData.pid, res.data);
            });
          }
        } else {
          this.getMenuList();
        }
        // // 无感刷新子节点数据
        // getMenuList({ pid: this.formData.pid }).then(res => {
        //   this.$set(this.$refs.table.store.states.lazyTreeNodeMap, this.formData.pid, res.data)
        // })
      });
    },
    // 删除按钮触发
    handleDelete(row) {
      this.$confirm('此操作将永久删除该菜单，并删除所属子级, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          delMenu(row.id).then((res) => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            // 无感刷新
            getMenuList({ pid: row.pid }).then((res) => {
              this.$set(this.$refs.table.store.states.lazyTreeNodeMap, row.pid, res.data);
            });
            if (row.pid == 0) {
              this.getMenuList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    // 编辑按钮触发
    handleEdit(row) {
      this.dialogMenu = {
        show: true,
        title: '修改菜单',
        option: 'edit',
      };
      this.formData = {
        id: row.id,
        type: row.type,
        icon: row.icon,
        title: row.title,
        name: row.name,
        path: row.path,
        redirect: row.redirect,
        component: row.component,
        sort: row.sort,
        pid: row.pid + '',
        permissions: row.permissions,
        hidden: row.hidden,
        breadcrumb: row.breadcrumb,
        alwaysShow: row.alwaysShow,
      };
      this.oldPid = row.pid;
    },
  },
  mounted() {
    this.getMenuList();
  },
  components: {
    Toobar,
    DialogMenu,
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-switch.is-disabled {
  opacity: 1;
}
::v-deep .el-switch.is-checked .el-switch__core {
  &:hover {
    cursor: pointer;
  }
}
</style>