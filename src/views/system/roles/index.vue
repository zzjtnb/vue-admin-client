<template>
  <div class="main" style="margin:10px;">
    <el-card>
      <Toobar :AddBtnAuth="AddBtnAuth" @handleAdd='handleAdd'></Toobar>
      <el-card style="margin-top:20px;">
        <div slot="header" class="clearfix">
          <span>权限列表</span>
        </div>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column type="index" label="ID" align="center" sortable>
          </el-table-column>
          <el-table-column prop="title" label="权限名称" align="center">
          </el-table-column>
          <el-table-column prop="roleType" label="权限级别" align="center" v-if="JSON.stringify(tableData).indexOf('roleType') != -1">
            <template slot-scope="scope" v-if="scope.row.roleType">
              <el-tag>{{scope.row.roleType}}级</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="创建时间" align="center">
            <template slot-scope="scope">
              {{scope.row.createdAt | formatDate}}
            </template>
          </el-table-column>
          <el-table-column prop="date" label="更新时间" align="center">
            <template slot-scope="scope">
              {{scope.row.updatedAt | formatDate}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="success" :disabled="info.identity != 99&&scope.row.id >=1 && scope.row.id <= 3" @click.native.prevent="setPermissions(scope.row)" v-permission="['authorize']">
                分配权限
              </el-button>
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
    <RolesDialog :rolesDialog='rolesDialog' :formData='formData' @addRoles='addRoles' @editRoles='editRoles'></RolesDialog>
    <PermissionsDialog ref="child" @giveRules='giveRules' @resetDefaultKey='resetDefaultKey' :permissionsDialog='permissionsDialog' :defaultkey='defaultkey'>
    </PermissionsDialog>
  </div>
</template>

<script>
import Toobar from '@/components/System/toobar';
import { getRolesList, authorize, addRoles, editRoles, deleteRoles } from '@/api/system/role';
import RolesDialog from '@/components/System/roles/rolesDialog';
import PermissionsDialog from '@/components/System/roles/permissionsDialog';

export default {
  data() {
    return {
      info: this.$store.state.user.info,
      AddBtnAuth: ['add'],
      tableData: [],
      loading: false,
      rolesDialog: {
        show: false,
        title: '',
      },
      formData: {},
      permissionsDialog: {
        show: false,
        id: '',
      },
      defaultkey: [],
    };
  },
  methods: {
    handleAdd() {
      this.rolesDialog = {
        show: true,
        title: '新增权限',
        option: 'add',
      };
      this.formData = {
        title: '',
        roleType: '',
      };
    },
    // 获取权限列表
    getRolesList() {
      getRolesList().then((res) => {
        this.tableData = res.data;
      });
    },
    addRoles() {
      addRoles(this.formData).then((res) => {
        this.rolesDialog.show = false;
        this.$notify({
          title: '成功',
          message: '新建权限成功！',
          type: 'success',
        });
        this.getRolesList();
      });
    },
    showEditDialog(row) {
      this.rolesDialog = {
        show: true,
        title: '编辑权限',
        option: 'edit',
      };
      this.formData = {
        id: row.id,
        title: row.title,
        roleType: row.roleType,
        identity: this.info.identity,
      };
    },
    editRoles() {
      editRoles(this.formData.id, this.formData).then((res) => {
        this.rolesDialog.show = false;
        this.$notify({
          title: '成功',
          message: '编辑权限成功！',
          type: 'success',
        });
        this.getRolesList();
      });
    },
    handleDel(row) {
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteRoles(row.id, { id: row }).then((res) => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            this.getRolesList();
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    // 点击分配权限按钮触发
    setPermissions(row) {
      this.permissionsDialog = {
        show: true,
        roleType: row.roleType,
      };
      let arr = [];
      if (row.rules) {
        arr = row.rules.split(',');
      }
      this.$refs.child.isCheck = true;
      this.defaultkey = arr;
      setTimeout(() => {
        this.$refs.child.isCheck = false;
      }, 500);
    },
    resetDefaultKey() {
      this.defaultkey = [];
    },
    giveRules(data) {
      authorize(this.permissionsDialog.roleType, { rules: data }).then((res) => {
        this.$notify({
          title: '成功',
          message: '分配成功！',
          type: 'success',
        });
        this.permissionsDialog.show = false;
        this.getRolesList();
      });
    },
  },
  mounted() {
    this.getRolesList();
  },
  components: {
    Toobar,
    RolesDialog,
    PermissionsDialog,
  },
};
</script>

<style>
</style>