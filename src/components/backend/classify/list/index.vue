<template>
  <div>
    <el-table
      :data="classifyList"
      style="width: 100%">
      <el-table-column
        prop="classify"
        label="分类名称">
      </el-table-column>
      <el-table-column
        prop="create_at"
        label="日期">
      </el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
          <el-button @click="updateClass(scope.$index)" type="text" size="small">编辑</el-button>
          <el-button @click="removeClassify(scope.$index)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog size="tiny" title="修改分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.classify" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api    from '@/api';
  export default {
    data () {
      return {
        classifyList: [],
        form: {
          classify: ''
        },
        dialogFormVisible: false,
        formLabelWidth: '120px',
        updateId: 0
      };
    },
    created () {
      this.initData();
    },
    methods: {
      initData () {
        this.$core.get(api.getClassifyList, {}).then((data) => {
          this.classifyList = data.lists;
        });
      },
      removeClassify (index) {
        this.$confirm('确认删除该分类吗？')
          .then(_ => {
            this.removeClassifyApi(this.classifyList[index]._id);
          })
          .catch(_ => {});
      },
      removeClassifyApi (id) {
        this.$core.post(api.removeClassify, {
          id: id
        }).then((data) => {
          if (data.code === 200) {
            this.$notify({
              title: '成功',
              message: '分类删除成功！',
              type: 'success'
            });
            this.initData();
          }
        });
      },
      updateClass (index) {
        this.form.classify = this.classifyList[index].classify;
        this.dialogFormVisible = true;
        this.updateId = this.classifyList[index]._id;
      },
      confirm () {
        this.dialogFormVisible = false;
        this.updateClassApi();
      },
      updateClassApi () {
        this.$core.post(api.updateClassify, {
          id: this.updateId,
          classify: this.form.classify
        }).then((data) => {
          if (data.code === 200) {
            this.$notify({
              title: '成功',
              message: '分类修改成功！',
              type: 'success'
            });
            this.initData();
          }
        });
      }
    }
  };
</script>

<style lang="less">
  // @import './style.less';
</style>
