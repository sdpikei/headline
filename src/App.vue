<template>
  <div>
    <!-- 需要缓存的视图组件 -->

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"> </router-view>
    </keep-alive>

    <!-- 不需要缓存的视图组件 -->
    <router-view v-if="!$route.meta.keepAlive"> </router-view>
    <!-- <keep-alive>
      <router-view> </router-view>
    </keep-alive> -->
  </div>
</template>

<script>
export default {
  name: "app",
  // data: () => ({
  //   include: [],
  // }),
  // watch: {
  //   $route(to, from) {
  //     //如果 要 to(进入) 的页面是需要 keepAlive 缓存的，把 name push 进 include数组
  //     if (to.meta.keepAlive) {
  //       !this.include.includes(to.name) && this.include.push(to.name);
  //     }
  //     //如果 要 form(离开) 的页面是 keepAlive缓存的，
  //     //再根据 deepth 来判断是前进还是后退
  //     //如果是后退
  //     if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
  //       var index = this.include.indexOf(from.name);
  //       index !== -1 && this.include.splice(index, 1);
  //     }
  //   },
  // },
};
</script>

<style>
</style>