<template>
  <div>
    <el-dialog :title="rolesDialog.title" :visible.sync="rolesDialog.show" width="30%" destroy-on-close @close='closeDialog' @open='openDialog' :close-on-click-modal="false" :close-on-press-escape="false" :modal-append-to-body="false">
      <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="权限名称" prop="title">
          <el-input v-model="formData.title" placeholder="权限名称" style="width:90%;" />
        </el-form-item>
        <el-form-item label="权限级别" prop="roleType">
          <el-input-number v-model="formData.roleType" :min="4" placeholder="权限级别" style="width:80%;" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="rolesDialog.show = false">取 消</el-button>
        <el-button type="primary" v-if="rolesDialog.option == 'add'" @click="addRoles('form')">确 定</el-button>
        <el-button type="primary" v-if="rolesDialog.option == 'edit'" @click="editRoles('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['rolesDialog', 'formData'],
  data() {
    return {
      rules: {
        title: [{ required: true, message: '请输入权限名称', trigger: 'blur' }],
        roleType: [{ required: true, message: '请输入权限级别', trigger: 'blur' }],
      },
    };
  },
  methods: {
    openDialog() {},
    closeDialog() {},
    addRoles(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('addRoles');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    editRoles(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('editRoles');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>

<style lang="sass" scoped>
</style>