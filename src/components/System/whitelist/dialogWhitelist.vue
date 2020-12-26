<template>
  <div class="flex">
    <el-dialog :title="dialogWhitelist.title" :visible.sync="dialogWhitelist.show" width="40%" center  :close-on-click-modal="false">
      <el-form :model="formData" label-width="80px" :rules="rules" ref="form" style="text-align: center;">
        <el-form-item label="IP地址" prop="ipaddr">
          <el-input v-model="formData.ipaddr" placeholder="请输入IP地址"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="preview=!preview">预览提交参数</el-button>
        <el-button @click="resetForm('form')">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('form')">确 定</el-button>
      </span>
      <PreviewCode :preview='preview' :formData='formData' />
    </el-dialog>
  </div>
</template>

<script>
import { isValidIp } from '@/utils/validate';
import PreviewCode from '@/components/Common/previewCode';
export default {
  props: {
    dialogWhitelist: Object,
    formData: Object,
  },
  data() {
    var checkIP = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('IP不能为空'));
      } else {
        if (isValidIp(value)) {
          callback();
        } else {
          return callback(new Error('IP格式不正确'));
        }
      }
    };
    return {
      preview: false,

      rules: {
        ipaddr: [{ required: true, validator: checkIP, trigger: 'blur' }],
        // remark: [{ required: true, message: '请输入备注描述', trigger: 'blur' }],
      },
    };
  },

  methods: {
    // 点击确定按钮触发
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialogWhitelist.option == 'add') {
            this.$emit('handleSubmit');
          }
          if (this.dialogWhitelist.option == 'edit') {
            this.$emit('handleSubmitEdit');
          }
        } else {
          return false;
        }
      });
    },
    // 点击取消按钮触发
    resetForm(formName) {
      this.dialogWhitelist.show = false;
      this.$refs[formName].resetFields();
    },
  },
  components: {
    PreviewCode,
  },
};
</script>

<style lang="scss" scoped>
</style>