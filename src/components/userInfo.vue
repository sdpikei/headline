<template>
  <div class="userName" @click="touserpage">
    <div class="avatar"><img :src="userInfo.aut_photo" alt="" /></div>
    <div class="inf">
      <p :style="{ color: activeColor || baseColor }">
        {{ userInfo.aut_name }}
      </p>
      <p class="time" v-if="userInfo.pubdate && isshowtime">
        {{ userInfo.pubdate }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userInfo", "isshowtime", "activeColor"],
  data() {
    return {
      // : false,
      baseColor: "none",
    };
  },
  methods: {
    touserpage() {
      this.$router.push({ path: "/user/" + this.userInfo.aut_id });
    },
  },
};
</script>

<style lang="less" scoped>
.userName {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .inf {
    padding-left: 10px;
    overflow: hidden;
    p {
      font-size: 16px;
    }
  }
  .avatar {
    width: 70px;
    height: 70px;
    overflow: hidden;
    border-radius: 70px;
    img {
      width: 100%;
    }
  }
}
</style>
