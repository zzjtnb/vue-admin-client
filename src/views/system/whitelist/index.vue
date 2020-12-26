<template>
  <div class="main" style="margin: 10px">
    <el-card>
      <Toobar :AddBtnAuth="AddBtnAuth" @handleAdd='handleAdd'></Toobar>
      <el-card style="margin-top: 10px">
        <div slot="header" class="clearfix">
          <span>IP白名单列表</span>
        </div>
        <!--列表-->
        <el-table :data="tableData" ref="table" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%" fit>
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column prop="id" label="ID" align="center" width="50"> </el-table-column>
          <el-table-column prop="ipaddr" label="IP地址" align="center">
          </el-table-column>
          <el-table-column prop="creator" label="创建者" align="center">
          </el-table-column>
          <el-table-column prop="remark" label="备注" align="center">
          </el-table-column>
          <el-table-column prop="date" label="创建日期" align="center">
            <template slot-scope="props">
              {{ props.row.createdAt | formatDate }}
            </template>
          </el-table-column>
          <el-table-column prop="date" label="更新日期" align="center">
            <template slot-scope="props">
              {{ props.row.updatedAt | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top" v-permission="['edit']">
                <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top" v-permission="['delete']">
                <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
          <el-button type="primary" @click="handleAllSelect(tableData)">全选</el-button>
          <el-button type="danger" @click="batDel" :disabled="this.sels.length===0">批量删除</el-button>
          <el-pagination layout="total, sizes, prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[20, 30, 40, 50,100]" :page-size="pageSize" :total="total" style="float:right;">
          </el-pagination>
        </el-col>

      </el-card>
    </el-card>
    <DialogWhitelist :dialogWhitelist=' dialogWhitelist' :formData='formData' @handleSubmit='handleSubmit' @handleSubmitEdit='handleSubmitEdit'>
    </DialogWhitelist>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Toobar from '@/components/System/toobar';
import { addWhitelist, delWhitelist, updateWhitelist, getWhitelist } from '@/api/system/whitelist';
import DialogWhitelist from '@/components/System/whitelist/dialogWhitelist.vue';
export default {
  data() {
    return {
      listLoading: false,
      total: 0,
      page: 1,
      pageSize: 20,
      sels: [], //列表选中列
      keys: [],
      AddBtnAuth: ['add'],
      tableData: [],
      dialogWhitelist: {
        show: false,
      },
      formData: {},
    };
  },
  computed: {
    ...mapGetters(['info']),
  },
  mounted() {
    this.getWhitelist();
  },
  methods: {
    getWhitelist() {
      getWhitelist().then((res) => {
        this.total = res.data.count;
        this.tableData = res.data.rows;
      });
    },

    // 新增按钮触发
    handleAdd() {
      this.dialogWhitelist = {
        show: true,
        title: '新增IP',
        option: 'add',
      };
      this.formData = {};
    },
    //提交新增请求
    handleSubmit() {
      addWhitelist(this.formData).then((res) => {
        this.dialogWhitelist.show = false;
        this.getWhitelist();
      });
    },
    // 编辑按钮触发
    handleEdit: function (index, row) {
      this.dialogWhitelist = {
        show: true,
        title: '修改IP',
        option: 'edit',
      };
      this.formData = Object.assign({}, row);
    },
    // 提交编辑请求
    handleSubmitEdit() {
      updateWhitelist(this.formData.id, this.formData).then((res) => {
        this.getWhitelist();
        this.dialogWhitelist.show = false;
        this.$message.success('修改成功！');
      });
    },
    // 删除按钮触发
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该IP, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          delWhitelist({ id: row.id }).then((res) => {
            this.$message({
              type: 'success',
              message: res.data,
            });
            this.getWhitelist();
          });
        })
        .catch((err) => {
          this.$message({
            type: 'info',
            message: err,
          });
        });
    },
    //批量删除
    batDel: function () {
      let ids = this.sels.map((item) => item.id);
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning',
      })
        .then(() => {
          this.listLoading = true;
          delWhitelist({ id: ids }).then((res) => {
            this.listLoading = false;
            this.$message({ type: 'success', message: res.data });
            this.getWhitelist();
          });
        })
        .catch(() => {});
    },
    //选中变化
    selsChange: function (sels) {
      this.sels = sels;
    },
    //页变化
    handleCurrentChange(val) {
      this.page = val;
    },
    //页大小变化
    handleSizeChange(val) {
      this.pageSize = val;
    },
    //全选
    handleAllSelect: function (rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.table.toggleRowSelection(row);
        });
      } else {
        this.$refs.table.clearSelection();
      }
    },
  },

  components: {
    Toobar,
    DialogWhitelist,
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