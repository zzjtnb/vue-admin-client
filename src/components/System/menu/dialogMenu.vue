<template>
  <div class="flex">
    <el-dialog :title="dialogMenu.title" :visible.sync="dialogMenu.show" width="40%" @open="openFun">
      <el-form ref="form" :model="formData" label-width="80px" :rules="rules">
        <!-- 菜单类型 -->
        <el-form-item label="菜单类型">
          <el-radio-group v-model="formData.type">
            <el-radio-button :label="1" :disabled="formData.type != 1 && dialogMenu.option == 'edit'">菜单</el-radio-button>
            <el-radio-button :label="2" :disabled="formData.type != 2 && dialogMenu.option == 'edit'">子菜单</el-radio-button>
            <el-radio-button :label="3" :disabled="formData.type != 3 && dialogMenu.option == 'edit'">按钮</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <!-- 选择图标 -->
        <el-form-item label="选择图标" v-if="formData.type != 3" prop="icon">
          <e-icon-picker v-model="formData.icon" :options="options" style="width:76%;" />
        </el-form-item>
        <!-- 菜单可见 ，菜单标题 -->
        <div class="flex" v-if="formData.type != 3">
          <el-form-item label="侧边栏隐藏" label-width="90px">
            <el-radio-group v-model="formData.hidden">
              <el-radio-button :label="1">是</el-radio-button>
              <el-radio-button :label="0">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="面包屑显示" label-width="90px" style="margin:0 2rem;">
            <el-radio-group v-model="formData.breadcrumb">
              <el-radio-button :label="1">是</el-radio-button>
              <el-radio-button :label="0">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="formData.type==1?'菜单排序':'子菜单排序'" prop="sort" :label-width="formData.type==1?'80px':'93px'">
            <el-input-number placeholder="请排序" controls-position="right" v-model="formData.sort"></el-input-number>
          </el-form-item>

        </div>
        <!-- 路由地址和菜单排序 -->
        <div class="flex" v-if="formData.type != 3">
          <el-form-item label="组件名称" prop="name">
            <el-input placeholder="示例:menu" v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="重定向" prop="redirect" v-if="nestedRouting==1&&formData.type==1">
            <el-input placeholder="示例:/system/index" v-model="formData.redirect"></el-input>
          </el-form-item>
          <el-form-item :label="formData.type==1?'菜单标题':'子菜单标题'" style="margin-left:1rem;" prop="title" :label-width="formData.type==1?'5rem':'6rem'">
            <el-input placeholder="请输入标题" v-model="formData.title"></el-input>
          </el-form-item>
        </div>
        <!-- 组件名称 、组件路径 -->
        <div class="flex" v-if="formData.type != 3">
          <el-col :span="8">
            <el-form-item label="路由地址" prop="path">
              <el-input :placeholder="formData.type==1?'示例:/system':'示例:system/menu'" v-model="formData.path"></el-input>
            </el-form-item>
          </el-col>
          <el-form-item label="嵌套路由" v-if="formData.type==1" style="margin-left:1rem;">
            <el-radio-group v-model=" nestedRouting">
              <el-radio-button :label="1">是</el-radio-button>
              <el-radio-button :label="0">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-col :span="10" v-if="formData.type==2">
            <el-form-item label="组件路径" style="margin-left:1rem;" prop="component">
              <el-input placeholder="示例:system/menu/index" v-model="formData.component"></el-input>
            </el-form-item>
          </el-col>
        </div>
        <!-- 按钮名称、权限标识 -->
        <div class="flex" v-if="formData.type == 3">
          <el-form-item label="按钮名称" prop="title">
            <el-input placeholder="示例:新增" v-model="formData.title"></el-input>
          </el-form-item>
          <el-form-item label="权限标识" style="margin-left:1rem;" prop="permissions">
            <el-input placeholder="示例:add" v-model="formData.permissions"></el-input>
          </el-form-item>
        </div>
        <!-- 上级类目 -->
        <div class="flex">
          <el-col :span="8">
            <el-form-item label="上级类目" prop="pid">
              <el-cascader :options="allMenu" v-model="formData.pid" :show-all-levels='false' :props="{ checkStrictly: true,label:'title',value:'id' }" placeholder="请选择菜单层级" size='mini' filterable clearable>

              </el-cascader>
            </el-form-item>
          </el-col>
          <el-form-item label="始终可见" v-if="formData.type!=3" style="margin-left:1rem;">
            <el-radio-group v-model="formData.alwaysShow">
              <el-radio-button :label="1">是</el-radio-button>
              <el-radio-button :label="0">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="按钮排序" prop="sort" style="margin-left:1rem;" v-if='formData.type == 3'>
            <el-input-number placeholder="数字小靠前" controls-position="right" v-model="formData.sort"></el-input-number>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="preview=!preview">预览提交参数</el-button>
        <el-button @click="resetForm('form')">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('form')">确 定</el-button>
      </span>
      <PreviewCode :preview='preview' :formData='formData' />
      <!-- <pre v-if="preview">{{formData}}</pre> -->
    </el-dialog>
  </div>
</template>

<script>
import PreviewCode from '@/components/Common/previewCode';
import { getMoveRouter } from '@/api/system/role';
import store from '@/store';
export default {
  props: {
    dialogMenu: Object,
    formData: Object,
  },
  data() {
    return {
      menus: this.$store.state.user.menus,
      preview: false,
      nestedRouting: 1,
      allMenu: [], //全部的路由
      options: {
        FontAwesome: true,
        ElementUI: true,
        eIcon: false, //自带的图标，来自阿里妈妈
        eIconSymbol: false, //是否开启彩色图标
        addIconList: [],
        removeIconList: [],
      },
      rules: {
        sort: [{ required: true, message: '请输入排序编号', trigger: 'blur' }],
        path: [{ required: true, message: '请输入组件路径', trigger: 'blur' }],
        pid: [{ required: true, message: '请选择上级类目', trigger: 'change' }],
        // component: [{ required: true, message: '请输入组件路径', trigger: 'blur' }],
        permissions: [{ required: true, message: '请输入权限标识', trigger: 'blur' }],
      },
    };
  },

  methods: {
    // 弹窗打开触发的方法
    openFun() {
      getMoveRouter().then((res) => {
        if (this.formData.type == 1) {
          res.data.push({ id: 0, title: '顶级目录' });
          res.data.forEach((item, index) => {
            item.id = item.id + '';
            if (!item.title && this.menus[index].children) item.title = this.menus[index].children[0].title;
          });
        }
        // console.log(this.allMenu);
        this.allMenu = res.data;
        if (this.dialogMenu.option == 'add') {
          this.$refs.form.resetFields();
        } else {
          //同级不能绑定上下级关系
          res.data.forEach((item, index) => {
            item.id = '' + item.id;
            if (!item.title && this.menus[index].children) item.title = this.menus[index].children[0].title;
            if (item.children) {
              if (this.formData.type == 2) {
                item.children.forEach((ele) => {
                  ele.disabled = true;
                });
              }
            }
          });
        }
      });
    },
    // 点击确定按钮触发
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialogMenu.option == 'add') {
            this.formData.pid = this.formData.pid[this.formData.pid.length - 1];
            this.$emit('handleSubmit');
          } else {
            if (typeof this.formData.pid != 'string') {
              this.formData.pid = this.formData.pid[this.formData.pid.length - 1];
            }
            this.$emit('handleSubmitEdit');
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 点击取消按钮触发
    resetForm(formName) {
      this.dialogMenu.show = false;
      this.$refs[formName].resetFields();
    },
  },
  watch: {
    'formData.redirect': {
      handler: function () {
        // if (this.formData.redirect) {
        //   this.nestedRouting = '1';
        // } else {
        //   this.nestedRouting = '0';
        // }
        this.nestedRouting = this.formData.redirect ? 1 : 0;
      },
      // 代表在wacth里声明了formData.redirect这个方法之后立即先去执行handler方法
      immediate: true,
    },
    nestedRouting: {
      handler: function () {
        this.formData.redirect = this.nestedRouting == 1 ? this.formData.redirect : null;
      },
      immediate: true,
    },
    'formData.type': {
      handler: function () {
        if (this.dialogMenu.option == 'add') {
          this.formData.component = this.formData.type == 1 ? 'Layout' : null;
        }
      },
      immediate: true,
    },
  },
  components: {
    PreviewCode,
  },
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}
.justifysa {
  justify-content: space-around;
}
</style>