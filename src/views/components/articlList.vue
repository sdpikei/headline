<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- <van-cell v-for="item in list" :key="item.art_id" :title="item.art_id" /> -->
      <artcleItem
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
        :artclename="item.aut_name"
        :comment="item.comm_count"
        :time="item.pubdate"
        :is_top="item.is_top"
        :cover="item.cover"
        :itemId="item.art_id"
      ></artcleItem>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { getNewListAPI } from "@/api";
import artcleItem from "@/components/artcleItem.vue";
export default {
  components: { artcleItem },
  props: ["arcal_id", "index"],
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pre_timestamp: null,
      refreshing: false,
      scrollTop: "",
    };
  },
  //   async created() {
  //     const res = await getNewListAPI({
  //       channel_id: this.arcal_id,
  //       timestamp: new Date(),
  //     });
  //     this.list = res.data.data.results;
  //     console.log(res);
  //   },
  mounted() {
    window.addEventListener("scroll", this.heandlesScroll, true);
  },
  deactivated() {
    this.setScrollsize();
  },
  activated() {
    this.backtoscroll();
  },
  methods: {
    async onRefresh() {
      const res = await getNewListAPI({
        channel_id: this.arcal_id,
        timestamp: this.pre_timestamp || Date.now(),
        with_top: 0,
      });
      this.list = [...res.data.data.results];
      this.refreshing = false;
    },
    async onLoad() {
      console.log("updata");
      const res = await getNewListAPI({
        channel_id: this.arcal_id,
        timestamp: this.pre_timestamp || Date.now(),
        with_top: 0,
      });
      console.log(res);
      this.pre_timestamp = res.data.data.pre_timestamp;
      if (res.data.data.results.length === 0) {
        this.finished = true;
      }
      this.list = [...this.list, ...res.data.data.results];

      this.loading = false;
    },
    heandlesScroll(e) {
      this.scrollTop =
        window.pageYOffset ||
        document.body.scrollTop ||
        document.documentElement.scrollTop;
      // console.log(this.scrollTop);
    },
    setScrollsize() {
      this.$nextTick(() => {
        console.log("succes local set" + this.scrollTop);
      });
      window.localStorage.setItem(
        "recolude",
        JSON.stringify({
          listScrollTop: this.scrollTop,
        })
      );
    },
    backtoscroll() {
      console.log("run");
      this.cacheData = window.localStorage.getItem("recolude")
        ? JSON.parse(window.localStorage.getItem("recolude"))
        : null;
      document.documentElement.scrollTop = this.cacheData.listScrollTop;
    },

    bts() {
      // console.log("setsuccsess");
      // // console.log(this.$store.state.pagescrolltop);
      // this.$emit("post", { index: this.index, listScrollTop: this.scrollTop });
      // this.$store.state.pagescrolltop.forEach((element) => {
      //   if (element.index == this.index) {
      //     return (this.$store.state.pagescrolltop[index].listScrollTop =
      //       this.scrollTop);
      //   }
      //   this.$store.commit("setpagescroll", {
      //     index: this.index,
      //     listScrollTop: this.scrollTop,
      //   });
      // });
      // window.localStorage.setItem(
      //   "recoludePage",
      //   JSON.stringify({
      //     index: this.index,
      //     listScrollTop: this.scrollTop,
      //   })
      // );
    },
  },
};
</script>

<style scoped lang="less">
/deep/ .van-pull-refresh {
  height: 100%;
  overflow: auto;
}
</style>