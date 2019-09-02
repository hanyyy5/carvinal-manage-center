<template>
  <div class="navbar">
    <div class="logo">
        <img src="../../../assets/images/carnival_logo.png" alt="">
        <div class="name">烽火嘉年华</div>
    </div>
    <div class="avatar-container">
      <div class="avatar-wrapper">
        <img src="../../../assets/images/avatar.jpg" class="user-avatar">
      </div>
      <div class="user-logstatus logout" @click="loginout">
        <img src="../../../assets/images/logout.png">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Headermenu from '@/components/Headermenu'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Headermenu
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    loginout(){
      this.$router.push('/login')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 60px;
  line-height: 60px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
  display: flex;
  align-items: center;
  background-color: #2d3e53;
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    padding-left: 24px;
    img {
      width: 48px;
      margin-bottom: 9px;
    }
    .name {
      font-size: 22px;
      margin-left: 12px;
    }
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 60px;
    display: inline-block;
    position: absolute;
    right: 0;
    .avatar-wrapper {
      position: absolute;
      right: 70px;
      cursor: pointer;
      margin-top: 16px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 28px;
        height: 28px;
        border-radius: 50%;
      }
    }
    .user-logstatus {
      vertical-align: top;
      line-height: 52px;
      text-align: center;
      position: absolute;
      right: 0;
      top: 0;
      background-color: #263242;
      padding: 8px 16px 0;
      cursor: pointer;
    }
  }
}
</style>

