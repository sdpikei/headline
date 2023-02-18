<template>
  <div class="banner">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <van-tabbar v-model="active" class="bottomBar" route>
      <van-tabbar-item icon="home-o" to="/banner/home">
        <template #icon> <i class="my-icon my-icon-shouye"></i> </template>首页
      </van-tabbar-item>

      <van-tabbar-item icon="shouji">
        <template #icon> <i class="my-icon my-icon-wenda1"></i> </template
        >问答</van-tabbar-item
      >
      <van-tabbar-item icon="friends-o">
        <template #icon> <i class="my-icon my-icon-shipin"></i> </template
        >视频</van-tabbar-item
      >
      <van-tabbar-item icon="setting-o" to="/banner/my">
        <template #icon> <i class="my-icon my-icon-wode"></i> </template
        >{{ loginState }}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { getUserNameAPI } from "@/api";

export default {
  created() {
    this.getInfor();
    this.$nextTick(() => {
      return this.checkState();
    });
  },
  mounted() {
    this.checkState();
  },
  updated() {
    this.checkState();
  },
  data() {
    return {
      active: 0,
      loginState: "我的",
    };
  },
  methods: {
    checkState() {
      if (this.$store.state.user) {
        this.loginState = "我的";
      } else {
        this.loginState = "未登录";
      }
    },
    async getInfor() {
      try {
        const res = await getUserNameAPI();
        console.log(res);
      } catch (err) {
        if (err.response.status === 401) {
          console.log("removeSuccess");
          this.$store.commit("romoveUser");
        }
      }
    },
  },
};
</script>

<style scoped>
.bottomBar {
  height: 98px;
}
.my-icon {
  font-size: 40px !important;
}
.banner {
  height: 100%;
  padding-bottom: 98px;
  background-color: #f5f7f9;
}
</style>