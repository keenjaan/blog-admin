<template>
  <div class="admin-article-create-border">
    <div class="admin-article-create-head">
      <div class="admin-article-create-left">
        <label class="admin-article-create-item">
          <span>标题</span>
          <div class="admin-article-create-input">
            <el-input @input="dataListen" v-model="articleTitle" placeholder="请输入标题"></el-input>
          </div>
        </label>
        <label class="admin-article-create-item">
          <span>分类</span>
          <div class="admin-article-create-input">
            <el-select @change="dataListen" v-model="classify" placeholder="请选择分类">
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
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </div>
    <div class="admin-article-create-main">
      <div class="admin-article-create-edite">
        <el-input
          @input="dataListen"
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
        classifyList: [],
        article: '',
        articleTitle: ''
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
        this.$core.get(api.getClassifyList, {}).then((data) => {
          this.classifyList = data.lists;
        });
      },
      submit () {
        this.$core.post(api.createArticle, {
          title: this.articleTitle,
          classify: this.classify,
          content: this.article,
          contentToMark: this.markedToHtml
        }).then((data) => {
          if (data.code === 200) {
            this.$message({
              message: '新建文章成功！',
              type: 'success'
            });
          }
        });
      },
      dataListen () {
        if (this.classify || this.article || this.articleTitle) {
          this.$emit('hasData', true);
        }
      }
    }
  };
</script>

<style lang="less">
  @import './style.less';
</style>
