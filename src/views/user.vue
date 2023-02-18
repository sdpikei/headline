<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" :placeholder="true" fixed>
      <div slot="title" class="headInfo">{{ userid }}</div>
      <template slot="right"><van-icon name="ellipsis" size="24px" /></template>
    </van-nav-bar>
    <p>无法获取信息请求接口</p>
  </div>
</template>

<script>
import { getUserNameAPI } from "@/api";
export default {
  data() {
    return {
      userid: this.$route.params.user_id,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.history.go(-1);
    },
  },
  async created() {
    const res = await getUserNameAPI();
    console.log(res);
    console.log(this.userid);
  },
};
</script>

<style lang="less" scoped>
</style>