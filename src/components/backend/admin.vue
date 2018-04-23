<template>
  <div class="admin-border">
    <div :class="['admin-head', 'admin-head-'+skin]">
      <div class="admin-head-logo"><span>A D </span><i :class="['logo-'+skin]">M I N</i></div>
      <div class="admin-head-menu">
        <el-select :class="['admin-head-menu-dropdown-'+skin]" v-model="skin" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button :class="['exit-'+skin]" type="text" @click="exit">退出</el-button>
      </div>
    </div>
    <div class="admin-main">
      <div :class="['admin-main-left', 'admin-main-left-'+skin]">
        <div
          v-for="(item, index) in menuList"
          :key="index"
          :class="['admin-main-menu-item', 'admin-main-menu-item-'+skin, {'admin-main-menu-item-active': selectIndex === index}]"
          @click="() => toRouter(item, index)"
        >{{item.name}}</div>
        <div
          :class="['admin-main-menu-item', 'admin-main-menu-item-'+skin]"
          @click="addClass"
        >添加分类</div>
      </div>
      <div class="admin-main-right">
        <router-view @hasData="hasData"></router-view>
      </div>
    </div>
    <el-dialog size="tiny" title="新建分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.classify" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createClass">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api        from '@/api';
  export default {
    data () {
      return {
        menuList: [{
          name: '文章列表',
          router: '/admin/article-list'
        },
        {
          name: '新建文章',
          router: '/admin/article-create'
        },
        {
          name: '分类列表',
          router: '/admin/classify-list'
        }],
        selectIndex: 0,
        form: {
          classify: ''
        },
        dialogFormVisible: false,
        formLabelWidth: '120px',
        dialogVisible: false,
        hasTips: false,
        skin: 'blue',
        options: [{
          value: 'blue',
          label: '魅力蓝'
        }, {
          value: 'green',
          label: '清新绿'
        }]
      };
    },
    mounted () {
      this.menuList.map((v, i) => {
        if (v.router === this.$route.path) {
          this.selectIndex = i;
          return false;
        }
      });
    },
    methods: {
      addClass () {
        this.dialogFormVisible = true;
      },
      toRouter (item, index) {
        if (this.selectIndex === 1 && this.hasTips) {
          this.$confirm('确定要放弃编辑文章吗？')
          .then(() => {
            this.hasTips = false;
            this.selectIndex = index;
            this.$router.push({path: item.router});
          })
          .catch(() => {});
        } else {
          this.selectIndex = index;
          this.$router.push({path: item.router});
        }
      },
      createClass () {
        this.$core.post(api.createClassify, {
          classify: this.form.classify
        }).then((data) => {
          if (data.code === 200) {
            this.$message({
              message: '新建分类成功！',
              type: 'success'
            });
          }
          this.dialogFormVisible = false;
        });
      },
      comfirm (item, index) {
        //
      },
      hasData (bool) {
        if (bool) {
          this.hasTips = true;
        }
      },
      exit () {
        window.localStorage.setItem('token', '');
        this.$router.push({path: '/admin/login'});
      }
    }
  };
</script>

<style lang="less">
  @blue: #3d4b65;
  @assist-blue: #20a0ff;

  @green: #054039;
  @assist-green: #00d1b2;

  .admin-border {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .admin-head {
    height: 50px;
    display: flex;
    justify-content: space-between;
    padding-right: 40px;
  }

  .admin-head-blue {
    background-color: @blue;
  }

  .admin-head-green {
    background-color: @green;
  }

  .admin-main {
    flex: 1;
    display: flex;
  }

  .admin-main-left {
    height: 100%;
    width: 200px;
  }

  .admin-main-left-blue {
    background-color: @blue;
  }

  .admin-main-left-green {
    background-color: @green;
  }

  .admin-main-right {
    flex: 1;
    width: 1px;
    overflow: auto;
  }

  .admin-head-logo {
    width: 200px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #fff;
  }

  .admin-main-menu-item {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    color: #d7dbe1;
    transition: background-color 0.2s;
  }

  .admin-main-menu-item-blue {
     &:hover {
      background-color: lighten(@blue, 10%);
    }
  }

  .admin-main-menu-item-green {
     &:hover {
      background-color: lighten(@green, 10%);
    }
  }

  .admin-main-right {
    padding: 30px;
  }

  .admin-main-menu-item-active.admin-main-menu-item-blue {
    color: @assist-blue;
    background-color: darken(@blue, 5%);
  }

  .admin-main-menu-item-active.admin-main-menu-item-green {
    color: @assist-green;
    background-color: darken(@green, 5%);
  }

  .logo-blue {
    color: @assist-blue;
  }

  .logo-green {
    color: @assist-green;
  }

  .exit-blue {
    color: @assist-blue;
  }

  .exit-green {
    color: @assist-green;
  }

  .admin-head-menu-dropdown-blue {
    color: @assist-blue;
    margin-right: 20px;
    input {
      background: transparent;
      color: @assist-blue;
      border: none;
      width: 100px;
    }
  }

  .admin-head-menu-dropdown-green {
    margin-right: 20px;
    input {
      background: transparent;
      color: @assist-green;
      border: none;
      width: 100px;
    }
    margin-right: 20px;
  }

  .admin-head-menu {
    display: flex;
    align-items: center;
  }
</style>
