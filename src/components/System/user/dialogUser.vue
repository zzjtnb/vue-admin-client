<template>
  <div>
    <div>
      <el-dialog :title="dialogUser.title" :visible.sync="dialogUser.show" width="30%" destroy-on-close @open='openDialog' :close-on-click-modal="false" :close-on-press-escape="false" :modal-append-to-body="false">
        <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
          <el-form-item label="登录账号" prop="loginname">
            <el-input v-model="formData.loginname" placeholder="登录账号" style="width:90%;" />
          </el-form-item>
          <el-form-item label="登录密码" prop="password" v-if="dialogUser.option == 'add'">
            <el-input v-model="formData.password" type="password" placeholder="登录密码" style="width:90%;" />
          </el-form-item>
          <el-form-item label="分配权限" prop="rules">
            <!-- <el-input v-model="formData.rules" placeholder="分配权限" style="width:90%;" /> -->
            <el-select v-model="formData.roleId" placeholder="请选择权限" style="width:90%;">
              <el-option v-for="(item,index) in roleList" :key="index" :label="item.title" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="preview=!preview">预览提交参数</el-button>
          <el-button @click="dialogUser.show = false">取 消</el-button>
          <el-button type="primary" v-if="dialogUser.option == 'add'" @click="addUser('form')">确 定</el-button>
          <el-button type="primary" v-if="dialogUser.option == 'edit'" @click="editUser('form')">确 定</el-button>
        </span>
        <PreviewCode :preview='preview' :formData='formData' />
      </el-dialog>

    </div>
  </div>
</template>

<script>
import { getRolesList } from '@/api/system/role';
import PreviewCode from '@/components/Common/previewCode';
export default {
  props: ['dialogUser', 'formData'],
  data() {
    return {
      preview: false,
      rules: {
        loginname: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
        roleId: [{ required: true, message: '请为该用户分配权限', trigger: 'change' }],
      },
      roleList: [],
    };
  },
  methods: {
    openDialog() {
      this.$nextTick(() => {
        this.$refs.form.clearValidate(); //解决dialog打开自动触发了下拉选择框的校验
        //获取权限列表
        getRolesList().then((res) => {
          this.roleList = res.data;
        });
      });
    },
    addUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('addUser');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    editUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('updateUser');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  components: {
    PreviewCode,
  },
};
</script>

<style>
</style>