<template>
  <div class="admin-article-create-border">
    <div class="admin-article-create-head">
      <div class="admin-article-create-left">
        <label class="admin-article-create-item">
          <span>标题</span>
          <div class="admin-article-create-input">
            <el-input v-model="articleTitle" placeholder="请输入标题"></el-input>
          </div>
        </label>
        <label class="admin-article-create-item">
          <span>分类</span>
          <div class="admin-article-create-input">
            <el-select v-model="classify" placeholder="请选择分类">
              <el-option
                :label="item.classify"
                :value="item.classify"
                v-for="(item, index) in classifyList"
                :key="index"
              ></el-option>
            </el-select>
          </div>
        </label>
      </div>
      <div class="admin-article-create-right">
        <el-button class="admin-article-create-back" @click="back">返回</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </div>
    <div class="admin-article-create-main">
      <div class="admin-article-create-edite">
        <el-input
          type="textarea"
          v-model="article"
          class="admin-article-create-main-edite"
          placeholder="请在此处编辑文章"
        ></el-input>
      </div>
      <div class="admin-article-create-display">
        <div v-html="markedToHtml"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import marked     from 'marked';
  import hlj        from 'highlight.js';
  import 'highlight.js/styles/atom-one-dark.css';
  import api        from '@/api';
  export default {
    data () {
      return {
        classify: '',
        article: '',
        articleTitle: '',
        classifyList: []
      };
    },
    created () {
      this.initData();
    },
    computed: {
      markedToHtml () {
        marked.setOptions({
          highlight: function (code) {
            return hlj.highlightAuto(code).value;
          }
        });
        return marked(this.article);
      }
    },
    methods: {
      initData () {
        this.$core.get(api.getArticleById, {
          id: this.$route.query.id
        }).then((data) => {
          this.classify = data.oneArticle.classify;
          this.article = data.oneArticle.content;
          this.articleTitle = data.oneArticle.title;
        });
        this.$core.get(api.getClassifyList, {}).then((data) => {
          this.classifyList = data.lists;
        });
      },
      submit () {
        this.$core.post(api.updateOneArticle, {
          id: this.$route.query.id,
          title: this.articleTitle,
          classify: this.classify,
          content: this.article,
          contentToMark: this.markedToHtml
        }).then((data) => {
          if (data.code === 200) {
            this.$message({
              message: '文章修改成功！',
              type: 'success'
            });
            this.$router.push({path: '/admin/article-list'});
          }
        });
      },
      back () {
        this.$router.push({path: '/admin/article-list'});
      }
    }
  };
</script>

<style lang="less">
  @import './style.less';
</style>
