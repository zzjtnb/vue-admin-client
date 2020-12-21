<template>
  <div class="main" style="margin:10px;">
    <el-card>
      <Toobar :AddBtnAuth="AddBtnAuth" @handleAdd='handleAdd'></Toobar>
      <el-card style="margin-top:20px;">
        <div slot="header" class="clearfix">
          <span>用户列表</span>
        </div>
        <el-table :data="tableData" stripe style="width: 100%" v-loading='loading'>
          <el-table-column type="index" label="#" align="center">
          </el-table-column>
          <el-table-column prop="loginname" label="登录账号" align="center">
          </el-table-column>
          <el-table-column prop="role_name" label="所属权限" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-tag size="mini">{{scope.row.role_name}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="date" label="创建时间" align="center">
            <template slot-scope="scope">
              {{scope.row.createdAt | formatDate}}
            </template>
          </el-table-column>
          <el-table-column prop="date" label="登录时间" align="center">
            <template slot-scope="scope">
              {{scope.row.updatedAt | formatDate}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="warning" :disabled="info.identity != 99&&scope.row.id >=1 && scope.row.id <= 3" @click.native.prevent="showEditDialog(scope.row)" v-permission="['edit']">
                编辑
              </el-button>
              <el-button type="danger" :disabled="info.identity != 99&&scope.row.id >=1 && scope.row.id <= 3" @click.native.prevent="handleDel(scope.row)" v-permission="['delete']">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-card>
    <!-- dialog -->
    <DialogUser :dialogUser='dialogUser' :formData='formData' @addUser='addUser' @updateUser='updateUser'></DialogUser>
  </div>
</template>

<script>
import Toobar from '@/components/System/toobar';
import { getUsersList, addUser, updateUser, delUser } from '@/api/system/user';
import DialogUser from '@/components/System/user/dialogUser';

export default {
  data() {
    return {
      info: this.$store.state.user.info,
      AddBtnAuth: ['add'],
      tableData: [],
      loading: false,
      dialogUser: {
        show: false,
        title: '',
      },
      formData: {},
    };
  },
  methods: {
    // 新增按钮触发
    handleAdd() {
      this.dialogUser = {
        show: true,
        title: '新增用户',
        option: 'add',
      };
      this.formData = {
        loginname: '',
        password: '',
        roleId: 3,
      };
    },
    // 获取用户列表
    getUsersList() {
      getUsersList().then((res) => {
        this.loading = true;
        this.tableData = res.data;
        this.loading = false;
      });
    },
    //新增用户
    addUser() {
      addUser(this.formData).then((res) => {
        this.$notify({
          title: '成功',
          message: '新建用户成功！',
          type: 'success',
        });
        this.dialogUser.show = false;
        this.getUsersList();
      });
    },
    handleDel(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          delUser(row.id).then((res) => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            this.getUsersList();
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    showEditDialog(row) {
      this.dialogUser = {
        show: true,
        title: '修改用户',
        option: 'edit',
      };
      this.formData = {
        id: row.id,
        loginname: row.loginname,
        roleId: row.roleId,
      };
    },
    updateUser() {
      updateUser(this.formData.id, this.formData).then((res) => {
        this.$notify({
          title: '成功',
          message: '修改用户成功！',
          type: 'success',
        });
        this.dialogUser.show = false;
        this.getUsersList();
      });
    },
  },
  mounted() {
    this.getUsersList();
  },
  components: {
    Toobar,
    DialogUser,
  },
};
</script>

<style lang="scss" scoped>
</style>