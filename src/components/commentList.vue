<template>
  <div class="commts">
    <div ref="maincontent" class="maincontent">
      <ul>
        <li
          v-for="(item, index) in commentList"
          :key="index"
          class="commentlis"
        >
          <div class="usersInfo">
            <!-- <div class="users">
              <div class="avatar">
                <img :src="item.aut_photo" alt="" />
              </div>
              <span class="username">{{ item.aut_name }}</span>
            </div> -->
            <userInfo
              :userInfo="item"
              :isshowtime="false"
              :activeColor="fontcolor"
            ></userInfo>

            <div @click="dianzan(item.com_id, index)">
              <i
                class="my-icon my-icon-dianzan"
                :class="{ dianzan: item.is_liking }"
              ></i
              ><span :class="{ dianzan: item.is_liking }">{{
                item.like_count
              }}</span>
            </div>
          </div>
          <div class="banner">
            <p>{{ item.content }}</p>
          </div>
          <div class="bot">
            <div class="time" style="margin-right: 30px">
              {{ item.pubdate | getDateNow }}
            </div>
            <button class="btn" @click="getinnercom(item.com_id, item, index)">
              {{ item.reply_count }}回复
            </button>
          </div>
        </li>
      </ul>
    </div>
    <van-action-sheet v-model="show" :title="commetcount + '条评论'" round>
      <div class="contentinside" ref="insidemain" @mousewheel="scrollChange">
        <div class="maincommet">
          <div class="usersInfo">
            <!-- <div class="users">
              <div class="avatar">
                <img :src="activemaincommet.aut_photo" alt="" />
              </div>
              <span class="username">{{ activemaincommet.aut_name }}</span>
            </div> -->
            <userInfo
              :userInfo="activemaincommet"
              :isshowtime="false"
              :activeColor="fontcolor2"
            ></userInfo>

            <div @click="dianzan2(activemaincommet.com_id, activeindex)">
              <i
                class="my-icon my-icon-dianzan"
                :class="{ dianzan: activemaincommet.is_liking }"
              ></i
              ><span :class="{ dianzan: activemaincommet.is_liking }">{{
                activemaincommet.like_count
              }}</span>
            </div>
          </div>
          <div class="banner">
            <p>{{ activemaincommet.content }}</p>
          </div>
          <div class="bot">
            <div class="time" style="margin-right: 30px">
              {{ activemaincommet.pubdate | getDateNow }}
            </div>
            <button class="btn" @click="innercommet(activemaincommet.com_id)">
              {{ activemaincommet.reply_count }}回复
            </button>
          </div>
        </div>
        <p class="allp">全部评论</p>
        <ul class="innerul">
          <li v-for="(item, index) in innercommentList" :key="index">
            <div class="usersInfo">
              <userInfo
                :userInfo="item"
                :isshowtime="false"
                :activeColor="fontcolor"
              ></userInfo>
              <div @click="dianzan3(item.com_id, index)">
                <i
                  class="my-icon my-icon-dianzan"
                  :class="{ dianzan: item.is_liking }"
                ></i
                ><span :class="{ dianzan: item.is_liking }">{{
                  item.like_count
                }}</span>
              </div>
            </div>
            <div class="banner">
              <p>{{ item.content }}</p>
            </div>
            <div class="bot">
              <div class="time" style="margin-right: 30px">
                {{ item.pubdate | getDateNow }}
              </div>
              <button
                class="btn"
                @click="
                  innercommet2(
                    activemaincommet.com_id,
                    item.aut_name,
                    item.content
                  )
                "
              >
                回复
              </button>
            </div>
          </li>
        </ul>
        <div class="placeline">
          <div class="btoom">
            <div class="container">
              <svg xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 400 160 A 2 2 90 0 0 260 160 A 2 2 90 0 0 120 160 C 120 230 260 270 260 350 C 260 270 400 230 400 160"
                  class="line"
                />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 400 160 A 2 2 90 0 0 260 160 A 2 2 90 0 0 120 160 C 120 230 260 270 260 350 C 260 270 400 230 400 160"
                  class="line line2"
                />
              </svg>
            </div>
          </div>
        </div>
        <p class="endp">已展示所有评论</p>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { getcommetsAPI, likecommetAPI, dislikecommetAPI } from "@/api/index";
import userInfo from "@/components/userInfo.vue";
import moment from "moment";
export default {
  components: {
    userInfo,
  },
  props: ["articleInfo"],
  data() {
    return {
      fontcolor: "pink",
      fontcolor2: "red",

      commentList: [],
      innercommentList: [],
      commet_count: "",
      show: false,
      commetcount: "",
      activemaincommet: {},
      activeindex: "",
      offset: "",
      endid: "",
      insideoffset: "",
      insideendid: "",
    };
  },
  async created() {
    this.getCommets();
    // const res = await getUserNameAPI();
    // console.log(res);
    // this.usersInfo.aut_name = res.data.data.name
    // this.usersInfo.aut_photo=res.data.data.photo
    // this.usersInfo.aut_id = res.data.data.id
  },
  mounted() {
    const scrollview = document.querySelector(".content");
    window.addEventListener("scroll", this.debounce(this.handleScroll, 500));
    scrollview.addEventListener(
      "scroll",
      this.debounce(this.scrollChange, 500),
      true
    );
  },

  // beforeDestroy() {
  //   window.removeEventListener("scroll", this.debounce(this.handleScroll, 500));
  //   // 获取指定元素
  //   const scrollview = document.querySelector(".contentinside");
  //   scrollview.removeEventListener(
  //     "scroll",
  //     this.debounce(this.scrollChange, 500),
  //     true
  //   );
  //   // 移除监听
  // },
  methods: {
    async getCommets() {
      const res = await getcommetsAPI({ type: "a", source: this.articleInfo });
      console.log("------------评论RES");
      console.log(res);
      this.commentList = res.data.data.results;
      // console.log(this.commentList);
      this.commet_count = res.data.data.total_count;
      this.offset = res.data.data.last_id;
      this.endid = res.data.data.end_id;
    },

    async dianzan(id, index) {
      console.log(this.activeindex);
      if (this.commentList[index].is_liking === true) {
        const res = await dislikecommetAPI(id);
        console.log("取消点赞" + res);
        this.commentList[index].is_liking = false;
        this.commentList[index].like_count =
          this.commentList[index].like_count - 1;

        return;
      }
      const res = await likecommetAPI({ target: id });
      console.log("点赞" + res);
      this.commentList[index].is_liking = true;
      this.commentList[index].like_count =
        this.commentList[index].like_count + 1;
    },
    async dianzan2(id) {
      console.log(this.activemaincommet);
      if (this.activemaincommet.is_liking === true) {
        const res = await dislikecommetAPI(id);
        console.log("取消点赞" + res);
        this.activemaincommet.is_liking = false;
        this.activemaincommet.like_count = this.activemaincommet.like_count - 1;
        console.log(this.activeindex);
        return;
      }
      const res = await likecommetAPI({ target: id });
      console.log("点赞" + res);
      this.activemaincommet.is_liking = true;
      this.activemaincommet.like_count = this.activemaincommet.like_count + 1;
    },
    async dianzan3(id, index) {
      if (this.innercommentList[index].is_liking === true) {
        const res = await dislikecommetAPI(id);
        console.log("取消点赞i" + res);
        this.innercommentList[index].is_liking = false;
        this.innercommentList[index].like_count =
          this.innercommentList[index].like_count - 1;

        return;
      }
      const res = await likecommetAPI({ target: id });
      console.log("点赞i" + res);
      this.innercommentList[index].is_liking = true;
      this.innercommentList[index].like_count =
        this.innercommentList[index].like_count + 1;
    },
    async getinnercom(id, comeinfor, index) {
      this.show = true;
      const res = await getcommetsAPI({ type: "c", source: id });
      console.log(res);
      this.innercommentList = res.data.data.results;
      this.commetcount = res.data.data.total_count;
      this.activemaincommet = comeinfor;
      this.activeindex = index;
      this.$emit("sendindx", index);
      (this.insideoffset = res.data.data.last_id),
        (this.insideendid = res.data.data.end_id);
      // let target = document
      //   .querySelectorAll(".commentlis")
      //   [index].cloneNode(true);
      // // document.querySelector(".content").appendChild(target);
      // let innerul = document.querySelector(".innerul");
      // this.$refs.content.insertBefore(target, innerul);
    },
    async refushinsidecom(data) {
      console.log(data);
      this.innercommentList.unshift(data);
    },
    refushcom(data) {
      this.commentList.unshift(data);
    },
    innercommet(id) {
      this.$emit("sendlttlecommet", id);
    },
    innercommet2(id, name, content) {
      this.$emit("sendinsidecommet", id, name, content);
    },
    updatereplycount() {
      this.commentList[this.activeindex].reply_count += 1;
    },
    scrollChange() {
      console.log("滚动中");
      const scrollview = document.querySelector(".contentinside");
      let scrollTop = scrollview.scrollTop; //滚动条在Y轴滚动过的高度
      let scrollsize = scrollview.scrollHeight;
      console.log(scrollsize);
      console.log(scrollTop);
      if (this.insideoffset === this.insideendid) {
        console.log("endinside");
        // scrollview.removeEventListener("scroll", this.scrollChange, true);
      }
      this.$nextTick(async () => {
        if (
          scrollTop > scrollsize - 800 &&
          this.insideoffset != this.insideendid
        ) {
          console.log("neibu滚动到底部了");
          const res = await getcommetsAPI({
            type: "c",
            source: this.activemaincommet.com_id,
            offset: this.insideoffset,
          });
          console.log(res);
          this.insideoffset = res.data.data.last_id;
          this.innercommentList = [
            ...this.innercommentList,
            ...res.data.data.results,
          ];
        }
      });
    },
    handleScroll() {
      let scrollTop = document.documentElement.scrollTop; //滚动条在Y轴滚动过的高度
      if (this.offset === this.endid) {
        console.log("edn");
        window.removeEventListener(
          "scroll",
          this.debounce(this.handleScroll, 500)
        );
      }
      this.$nextTick(async () => {
        let scrollsize = document.querySelector(".maincontent").offsetTop;
        if (scrollTop > scrollsize + 300 && this.offset != this.endid) {
          console.log("滚动到底部了");
          const res = await getcommetsAPI({
            type: "a",
            source: this.articleInfo,
            offset: this.offset,
          });
          this.offset = res.data.data.last_id;
          this.commentList = [...this.commentList, ...res.data.data.results];
        }
      });
    },
    debounce(fn, delay) {
      let timer = null; //借助闭包
      return function () {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(fn, delay); // 简化写法
      };
    },
  },
  filters: {
    getDateNow(val) {
      return val + moment().year();
    },
  },
};
</script>

<style scoped lang="less">
.commts {
  // width: 100%;
  background-color: #fff;
  padding: 0 35px 0 27px;
}
ul {
  margin-bottom: 30px;
}
li,
.maincommet {
  list-style: none;
  display: flex;
  flex-direction: column;
  font-size: 20px;

  .usersInfo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .users {
      display: flex;
      align-items: center;
      .username {
        font-size: 28px;
        color: deeppink;
      }

      .avatar {
        width: 75px;
        height: 75px;
        border-radius: 50%;
        overflow: hidden;
        padding: 0 !important;

        img {
          width: 100%;
        }
      }
    }
    .dianzan {
      color: rgba(251, 114, 153, 1);
    }
  }
  .banner {
    padding: 0 85px 0 75px;
    margin: 20px 0 40px;
    p {
      font-size: 28px;
    }
  }
  .bot {
    display: flex;
    align-items: center;
    padding-left: 75px;
    //   justify-content: space-between;
    .btn {
      width: 128px;
      height: 48px;
      border: none;
      border-radius: 24px;
    }
    .time {
      font-size: 10px;
    }
  }
}
.allp {
  font-size: 30px;
  margin: 30px 0;
}
.endp {
  color: rgb(251, 114, 153);
  font-size: 28px;
  text-align: center;
  margin-top: 20px;
}
/deep/ .van-popup {
  box-sizing: border-box;
  height: 1200px;
}
.contentinside {
  height: 100%;
  overflow-y: auto;
}
.commetbar {
  width: 100%;
  border: none;
  font-size: 18px;
  height: 150px;
}
.subcommet {
  width: 100px;
  height: 40px;
  background-color: rgb(251, 114, 153);
  font-size: 16px;
  border: none;
  border-radius: 20px;
  color: #fff;
  float: right;
  margin-right: 80px;
}
.placeline {
  margin-top: 99px;
  background-color: rgba(251, 114, 153, 1);
  width: 100%;
  height: 2px;
  box-shadow: 0 1px 2px 1px rgba(251, 114, 153, 0.3);
  position: relative;
}
svg {
  position: absolute;
  width: 1000px;
  height: 1000px;
}
.btoom {
  width: 100%;
  position: absolute;
  bottom: -3.8rem;
  left: -0.98rem;
  transform-origin: center;
  transform: scale(25%);
}
.container {
  position: relative;
  width: 400px;
  height: 400px;
  margin: auto;
}

.line {
  --colorA: #f24983;
  fill: none;
  stroke-width: 10;
  stroke-linejoin: round;
  stroke-linecap: round;
  stroke: #fff;
  stroke-dasharray: 328 600;
  animation: rotate 2s infinite linear;
  filter: drop-shadow(0 0 2px var(--colorA)) drop-shadow(0 0 5px var(--colorA))
    drop-shadow(0 0 10px var(--colorA)) drop-shadow(0 0 15px var(--colorA))
    drop-shadow(0 0 25px var(--colorA));
}

.line2 {
  animation: rotate 2s infinite -1s linear;
  --colorA: #37c1ff;
}

@keyframes rotate {
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: 928;
  }
}
</style>