<template>
  <div class="homess">
    <div class="search">
      <van-button
        type="default"
        round
        size="large"
        color="rgba(255,255,255,0.5)"
        @click="toSearch"
      >
        <span slot="icon">
          <i class="my-icon my-icon-sousuo"></i>
        </span>
        搜索</van-button
      >
    </div>

    <van-tabs
      v-model="active"
      swipeable
      animated
      sticky
      swipe-threshold="3"
      :offset-top="61"
      line-width="16px"
      title-active-color="#333333"
      title-inactive-color="#777777"
      :before-change="beforeChange"
      @change="onClick"
    >
      <div
        slot="nav-right"
        class="placeholder"
        :style="{ flexShrink: channelLsitLs }"
      ></div>
      <div class="classLab" slot="nav-right" @click="setCannel">
        <i class="my-icon my-icon-gengduo1"></i>
      </div>
      <van-tab
        v-for="(item, index) in channelList"
        :key="item.id"
        :title="item.name"
      >
        <article-list
          :arcal_id="item.id"
          :index="index"
          ref="list"
        ></article-list>
      </van-tab>
    </van-tabs>
    <van-popup
      round
      closeable
      close-icon-position="top-left"
      v-model="show"
      position="right"
      :style="{ height: '90%', width: '100%' }"
      @close="subCg"
    >
      <channelLis ref="channelLs"></channelLis>
    </van-popup>
  </div>
</template>

<script>
import { getchannelListAPI } from "@/api";
import article from "./components/articlList.vue";
import channelLis from "./components/setChannel";
export default {
  name: "home",

  components: {
    "article-list": article,
    channelLis,
  },
  methods: {
    toSearch() {
      this.$router.push({ path: "/search" });
    },
    setCannel() {
      console.log("success");
      this.show = true;
    },
    async subCg() {
      this.$refs.channelLs.updatedChannelList();
      this.$refs.channelLs.banji = false;
      if (this.$store.state.user) {
        const res = await getchannelListAPI();
        this.channelList = res.data.data.channels;
      } else {
        this.channelList = JSON.parse(localStorage.getItem("userChannel"));
        console.log(this.channelList);
      }
    },
    // 注：返回true！！！否则无法切换
    beforeChange() {
      for (let i = 0; i < this.pagescroll.length; i++) {
        if (this.pagescroll[i].idx === this.active) {
          console.log(
            this.pagescroll[i].scrol + "滚动距离已更新" + this.active
          );
          this.pagescroll[i].scrol = this.scrollTop;
          return true;
        }
      }
      console.log("滚动数据录入" + this.active);
      this.pagescroll.push({ idx: this.active, scrol: this.scrollTop });

      return true;
    },
    onClick(name, title) {
      console.log(name + "本次点击" + title);
      for (let i = 0; i < this.pagescroll.length; i++) {
        if (this.pagescroll[i].idx === name) {
          console.log("发现滚动滚动距离：" + this.pagescroll[i].scrol);
          this.$nextTick(() => {
            document.documentElement.scrollTop = this.pagescroll[i].scrol;
            document.body.scrollTop = this.pagescroll[i].scrol; // chrome
          });
        }
      }
      // for (let i = 0; i < this.pagescroll.length; i++) {
      //   if (this.pagescroll[i].index === name) {
      //     console.log("finnal test success");
      //     console.log(this.pagescroll[i].listScrollTop);
      //     this.$refs.list[i].btss(this.pagescroll[i].listScrollTop);
      //     // document.documentElement.scrollTop =
      //     //   this.pagescroll[i].listScrollTop || 0;
      //     // document.getElementsByClassName("banner")[0].scrollTop =
      //     //   this.pagescroll[i].listScrollTop || 0;
      //   }
      // }
      // document.documentElement.scrollTop = this.$refs.list[name].scrollTop
      //   ? this.$refs.list[name].scrollTop
      //   : 0;
      // if (this.$refs.list[name].scrollTop) {
      //   console.log("setSuceess");
      //   this.$refs.list[name].bts();
      //   document.documentElement.scrollTop = this.$refs.list[name].scrollTops;
      // }
    },
    // forEach()无法在所有元素都传递给调用的函数之前终止遍历---无法return
    // setpagescorll(data) {
    //   for (let i = 0; i < this.pagescroll.length; i++) {
    //     console.log(this.pagescroll[i].index + "--------" + data.index);
    //     if (this.pagescroll[i].index === data.index) {
    //       console.log("cnm");
    //       this.pagescroll[i].listScrollTop = data.listScrollTop;
    //       return; // 终止循环，必须写在函数中
    //     }
    //   }
    //   this.pagescroll.push(data);
    //   console.log(this.pagescroll);
    //   // this.pagescroll.forEach((item, i) => {
    //   //   console.log(item.index + "--------" + data.index);
    //   //   if (parseInt(item.index) === parseInt(data.index)) {
    //   //     this.pagescroll[i].listScrollTop = data.listScrollTop;
    //   //     console.log("cnm");
    //   //     return;
    //   //   }
    //   // });
    //   // this.pagescroll.push(data);
    // },

    // handleScroll(e) {
    //   this.bodyScroll = e.target.scrollTop;
    // },

    heandlesScroll(e) {
      this.scrollTop =
        window.pageYOffset ||
        document.body.scrollTop ||
        document.documentElement.scrollTop;
      // console.log(this.scrollTop);
    },
  },
  data() {
    return {
      show: false,
      finished: false,
      loading: false,
      searchvalue: "",
      active: 0,
      channelList: [],
      cacheData: null,
      pagescroll: [],
      scrollTop: "",
    };
  },

  // mounted() {
  //   window.addEventListener("scroll", this.handleScroll, true);
  // },
  mounted() {
    window.addEventListener("scroll", this.heandlesScroll, true);
  },
  async created() {
    if (this.$store.state.user) {
      const res = await getchannelListAPI();
      console.log(res);
      this.channelList = res.data.data.channels;
    } else {
      if (JSON.parse(localStorage.getItem("userChannel")) != null) {
        this.channelList = JSON.parse(localStorage.getItem("userChannel"));
        console.log("1");
      } else {
        console.log("2");
        localStorage.setItem(
          "userChannel",
          JSON.stringify([
            {
              id: 0,
              name: "推荐",
            },
          ])
        );
        this.channelList = [
          {
            id: 0,
            name: "推荐",
          },
        ];
      }

      console.log(this.channelList);
    }
  },
  computed: {
    channelLsitLs() {
      return this.channelList.length > 3 ? 0 : 1;
    },
  },
};
</script>

<style lang="less" scoped>
.homess {
  padding-top: 128px;
}
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(251, 114, 153, 1);
  height: 128px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  .my-icon-sousuo {
    font-size: 32px;
  }
  /deep/ .van-button--default {
    width: 555px;
    height: 64px;
    border: none;
    font-size: 28px;
  }
}
// /deep/ .van-tabs__content {
// }
/deep/.van-tab__pane-wrapper {
  height: 100%;
  // overflow-y: auto;
}
/deep/ .van-tab {
  min-width: 200px;
  height: 80px;
  border-right: 1px solid #edeff3;
  font-size: 30px;
  // border-bottom: 1px solid #edeff3;
}
/deep/ .van-tabs__line {
  // transform: translateY(50%);
  // margin-top: -20px;
  background-color: rgb(251, 114, 153);
  top: 68px;
}
/deep/ .van-tabs__nav--line {
  padding-bottom: 0;
}
/deep/ .van-tabs__wrap {
  height: 80px !important;
}
.placeholder {
  flex-shrink: 0;
  min-width: 66px;
  height: 82px;
}
.classLab {
  position: fixed;
  right: 0;
  z-index: 10;
  height: 66px;
  width: 82px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  opacity: 0.902;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    background-image: url(@/assets/gradient-gray-line.png);
    background-size: contain;
  }
  .my-icon-gengduo1 {
    font-size: 40px;
  }
}
</style>