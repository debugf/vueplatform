// src\components\page\home.vue
<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header>
      <div class>
        <img src alt />
        <span>自动化测试平台</span>
      </div>
      <el-button type="info" @click="singOut">退出</el-button>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 左侧菜单 -->
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="toggle">|||</div>
        <el-menu :default-active="navState" :router="true" :collapse-transition="false" :collapse="isCollapse" background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened>
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="(item,index) in menuList" :key="index">
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item @click="saveNavState('/'+item2.path)" :index="'/'+item2.path" v-for="(item2,index2) in item.children" :key="index2">
              <template slot="title">
              <i class="el-icon-s-grid"></i>
              <span>{{item2.authName}}</span>
            </template>
            </el-menu-item>

          </el-submenu>

        </el-menu>
      </el-aside>
      <!-- 内容展示 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: '',  //左侧菜单数据,
      iconObj : {
         '125':'el-icon-user',
         '103':'el-icon-suitcase',
         '101':'el-icon-goods',
         '102':'el-icon-edit-outline',
         '145':'el-icon-data-line',
      },
      isCollapse:false,
      navState:'',   //被激活的链接地址
    }
  },
  created(){
    this.getMenuList()
    this.navState = sessionStorage.getItem('navState')
  },

  methods: {
    singOut() {
      sessionStorage.clear();
      this.$router.push("/");
    },
    //获取所有的菜单
    async getMenuList(){
      const {data:res} = await this.$http.get('menus')
      if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      // console.log(res.data);    
    },
    
    //点击折叠菜单与展开
    toggle(){
      this.isCollapse = ! this.isCollapse
    },
    
    //保存连接的激活状态
    saveNavState(index){
    //  console.log(index);
     sessionStorage.setItem('navState',index);
     this.navState = index
    }  
  }
};
</script>

<style scoped>
.container {
  height: 100%;
}

.el-header {
  background-color: #242f42;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
}

.el-aside {
  background-color: rgb(50, 65, 87);
}

.el-menu{
  border-right: 0px;
}

.el-main {
  background-color: #eaedf1;
}

.toggle-button{
  background-color: #4A5064;
  color: #fff;
  text-align: center;
  font-size: 10px;
  line-height: 24px;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>