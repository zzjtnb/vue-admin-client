<template>
  <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
    <el-dialog title="分配权限" :visible.sync="permissionsDialog.show" destroy-on-close @close='closeDialog' @open='openDialog' :close-on-click-modal="false" :close-on-press-escape="false" :modal-append-to-body="false">
      <el-tree :data="data" default-expand-all :check-strictly='isCheck' show-checkbox node-key="id" :default-checked-keys="defaultkey" :props="defaultProps" ref="treeRef">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="permissionsDialog.show = false">取 消</el-button>
        <el-button type="primary" @click="giveRules">确 定</el-button>
      </span>
    </el-dialog>
  </el-col>
</template>

<script>
import { getAllRouter } from '@/api/system/role';

export default {
  props: ['permissionsDialog', 'defaultkey'],
  data() {
    return {
      data: [],
      isCheck: false,
      defaultProps: {
        children: 'children',
        label: 'title',
      },
    };
  },
  methods: {
    closeDialog() {
      this.$emit('resetDefaultKey');
    },
    openDialog() {
      getAllRouter().then((res) => {
        res.data.forEach((item, index) => {
          if (!item.title && item.children) item.title = item.children[0].title;
        });
        this.data = res.data;
      });
    },
    giveRules() {
      const keys = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys()];
      let idStr = keys.join(',');
      if (idStr == '') {
        idStr = ' ';
      }
      this.$emit('giveRules', idStr);
    },
  },
};
</script>

