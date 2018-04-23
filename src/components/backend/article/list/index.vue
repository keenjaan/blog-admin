<template>
  <div>
    <el-table
      :data="articleList"
      style="width: 100%">
       <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="classify"
        label="分类"
        width="180">
      </el-table-column>
      <el-table-column
        prop="create_at"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
         width="200">
        <template scope="scope">
          <el-button @click="handleClick" type="text" size="small">查看</el-button>
          <el-button @click="updateArticle(scope)" type="text" size="small">编辑</el-button>
          <el-button @click="removeArticle(scope.$index)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="admin-article-pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import api    from '@/api';
  export default {
    data () {
      return {
        articleList: [],
        currentPage: 1,
        total: 0
      };
    },
    created () {
      this.initData();
    },
    methods: {
      handleCurrentChange (index) {
        this.currentPage = index;
        this.initData();
      },
      handleClick () {
        //
      },
      removeArticle (index) {
        // console.log(this.articleList[index]);
        this.$confirm('确认删除该文章吗？')
          .then(_ => {
            this.removeArticleApi(this.articleList[index]._id);
          })
          .catch(_ => {});
      },
      initData () {
        this.$core.get(api.getArticleList, {
          page: this.currentPage,
          limit: 10
        }).then((data) => {
          this.articleList = data.articleList;
          this.total = data.total;
        });
      },
      removeArticleApi (id) {
        this.$core.post(api.removeArticle, {
          id: id
        }).then((data) => {
          if (data.code === 200) {
            this.$notify({
              title: '成功',
              message: '文章删除成功！',
              type: 'success'
            });
            this.initData();
          }
        });
      },
      updateArticle (item) {
        this.$router.push({path: '/admin/article-edite', query: {id: item.row._id}});
      }
    }
  };
</script>

<style lang="less">
  @import './style.less';
</style>
