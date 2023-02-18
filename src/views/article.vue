<template>
  <div class="bodysa">
    <van-nav-bar left-arrow @click-left="onClickLeft" :placeholder="true" fixed>
      <div slot="title" class="headInfo" v-show="isTop">
        <div class="users">
          <!-- <div class="userName">
            <div class="avatar">
              <img :src="article_Info.aut_photo" alt="" />
            </div>
            <div class="inf">
              <p>{{ article_Info.aut_name }}</p>
            </div>
          </div> -->
          <userInfo :userInfo="article_Info" :isshowtime="false"></userInfo>

          <button
            class="subbtn on"
            @click="unfollow(article_Info.aut_id)"
            v-if="article_Info.is_followed"
          >
            已关注
          </button>
          <button class="subbtn" @click="follow(article_Info.aut_id)" v-else>
            +关注
          </button>
        </div>
      </div>
      <template slot="right"><van-icon name="ellipsis" size="24px" /></template>
    </van-nav-bar>
    <!-- 向下固定信息栏 -->

    <!-- <p>文章详情页{{ $route.params.article_id }}</p> -->
    <div class="banner">
      <p class="title">{{ article_Info.title }}</p>
      <div class="users">
        <!-- <div class="userName">
          <div class="avatar"><img :src="article_Info.aut_photo" alt="" /></div>
          <div class="inf">
            <p>{{ article_Info.aut_name }}</p>
            <p class="time">{{ article_Info.pubdate }}</p>
          </div>
        </div> -->
        <userInfo :userInfo="article_Info"></userInfo>

        <button
          class="subbtn on"
          v-show="article_Info.is_followed"
          @click="unfollow(article_Info.aut_id)"
          v-if="article_Info.is_followed"
        >
          已关注
        </button>
        <button class="subbtn" @click="follow(article_Info.aut_id)" v-else>
          +关注
        </button>
      </div>
      <div v-html="article_Info.content" class="content"></div>
    </div>
    <!-- 分割线 -->
    <div class="spliceline">
      <span class="line"></span><span>正文结束</span><span class="line"></span>
    </div>
    <!-- 评论区 -->
    <commentList
      class="commentList"
      :articleInfo="artId"
      ref="comm"
      @sendlttlecommet="showPopupComment"
      @sendinsidecommet="showPopupComment2"
    ></commentList>
    <!-- 底部评论栏 -->
    <div class="commetbanner">
      <button class="tocommet" @click="showpopup">写评论</button>
      <van-popup v-model="show" position="bottom">
        <textarea
          name=""
          cols="30"
          rows="10"
          class="commetbar"
          placeholder="千山万水总是情，评论两句行不行"
          v-model="commetValue"
          style="resize: none"
          ref="areacontent"
        ></textarea>
        <button class="subcommet" @click="judgecom(artId)">发布</button>
      </van-popup>
      <span class="list" @click="tocomment">
        <div class="count">{{ commCount || article_Info.comm_count }}</div>
        <i class="my-icon my-icon-pinglun"></i>
      </span>
      <span class="dianzan" @click="crushed(artId)">
        <i
          class="my-icon"
          :class="{
            soucanged: article_Info.attitude === 1,
            'my-icon-dianzan':
              article_Info.attitude === -1 || article_Info.attitude === 1,
            'my-icon-dianzan21-copy': article_Info.attitude === 0,
          }"
        ></i>
      </span>
      <span class="soucan" @click="collection(artId)"
        ><i
          class="my-icon my-icon-shoucang1"
          :class="{ soucanged: article_Info.is_collected }"
        ></i
      ></span>
      <span><i class="my-icon my-icon-fenxiang"></i></span>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import "@/css/techo.css";
import commentList from "@/components/commentList.vue";
import userInfo from "@/components/userInfo.vue";
import {
  getArticalsAPI,
  followingsAPI,
  unfollowingsAPI,
  colletionsAPI,
  uncolletionsAPI,
  dislikeingsAPI,
  likeingsAPI,
  popcommentAPI,
} from "@/api";
export default {
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
    commentList,
    userInfo,
  },

  data() {
    return {
      artId: this.$route.params.article_id,
      article_Info: {},
      offsetTop: document.documentElement.scrollTop,
      isTop: false,
      isFllow: false,
      show: false,
      commetValue: "",
      commCount: "0",
      insideId: "",
      isinside: false,
      insidename: "",
      insidecontent: "",
      // iscolletion: false,
    };
  },
  async created() {
    console.log(this.artId);
    const res = await getArticalsAPI(this.artId);
    console.log(res);
    this.article_Info = res.data.data;
    this.commCount = res.data.data.comm_count;
    setTimeout(() => {
      this.PreviewImage();
    }, 0);
  },
  mounted() {
    this.PreviewImage();
    window.addEventListener("scroll", this.topInfo);
  },
  deactivated() {
    this.$destroy();
  },
  methods: {
    onClickLeft() {
      this.$router.history.go(-1);
    },
    PreviewImage() {
      let imgas = document.querySelectorAll(".content img");
      let imgasUrl = [];
      // console.log(imgas[0].src);
      imgas.forEach((item, index) => {
        imgasUrl.push(item.src);
        item.addEventListener("click", function () {
          ImagePreview({
            images: imgasUrl,
            startPosition: index,
          });
        });
      });
    },
    async follow(id) {
      try {
        const res = await followingsAPI(id);
        this.article_Info.is_followed = true;
        console.log(res);
      } catch (err) {
        if (err) {
          console.log("need logined");
          this.$dialog.alert({
            message: "请登录",
          });
        }
      }
    },
    async unfollow(id) {
      const res = await unfollowingsAPI(id);
      console.log(res);
      this.article_Info.is_followed = false;
    },
    async collection(id) {
      if (this.article_Info.is_collected === true) {
        const res = await uncolletionsAPI(id);
        console.log("取消成功");
        console.log(res);
        return (this.article_Info.is_collected = false);
      }
      try {
        const ids = parseInt(id);
        const res = await colletionsAPI(ids);
        this.article_Info.is_collected = true;
        console.log(res);
      } catch (err) {
        if (err) {
          console.log("关注失败");
          this.$dialog.alert({
            message: "请登录",
          });
        }
      }
    },
    async crushed(id) {
      if (this.article_Info.attitude === 1) {
        dislikeingsAPI(id);
        return (this.article_Info.attitude = -1);
      }
      try {
        likeingsAPI(id);
        this.article_Info.attitude = 1;
      } catch (err) {
        if (err) {
          alert("请登录");
        }
      }
    },
    tocomment() {
      console.log(document.querySelector(".commentList").offsetTop);
      document.documentElement.scrollTop =
        document.querySelector(".commentList").offsetTop - 200;
    },
    showpopup() {
      this.show = true;
      this.$nextTick(() => {
        this.$refs.areacontent.placeholder = "千山万水总是情，评论两句行不行";
      });
    },
    showPopupComment(id) {
      this.show = true;
      this.insideId = id;
      console.log("send" + this.insideId);
      this.insidename = "";
      this.isinside = true;
      this.$nextTick(() => {
        this.$refs.areacontent.placeholder = "千山万水总是情，评论两句行不行";
      });
    },
    showPopupComment2(id, name, content) {
      this.show = true;
      this.insideId = id;
      this.isinside = true;
      this.insidename = name;
      this.insidecontent = content;
      this.$nextTick(() => {
        this.$refs.areacontent.placeholder = "回复:" + name;
      });
    },
    judgecom(id) {
      if (this.isinside === false) {
        this.popupcommet(id);
      } else {
        this.popuinsidepcommet(id);
      }
    },
    async popupcommet(id) {
      if (!this.commetValue.trim()) {
        return this.$toast.fail("请输入内容");
      }
      try {
        const res = await popcommentAPI({
          target: id,
          content: this.commetValue.trim(),
        });
        this.show = false;
        console.log(res);
        this.$refs.comm.refushcom(res.data.data.new_obj);
        // 一直会优先处理父组件
        // this.$nextTick(() => {
        //   this.$refs.comm.postCount();
        // });
        this.commCount = this.commCount + 1;
        // console.log(`-----------${this.$refs.comm.commet_count}`);
        this.commetValue = "";
        this.isinside = false;
      } catch (err) {
        if (err.response.status === 401) {
          this.$toast.fail("请登录");
          console.log(err);
          console.log(err.response.status);
        }
      }
    },
    async popuinsidepcommet(id) {
      if (!this.commetValue.trim()) {
        return this.$toast.fail("请输入内容");
      }
      if (this.insidename) {
        this.commetValue =
          this.commetValue + "//@" + this.insidename + ":" + this.insidecontent;
      }
      try {
        const res = await popcommentAPI({
          target: this.insideId,
          content: this.commetValue.trim(),
          art_id: id,
        });
        this.show = false;
        console.log(res);
        this.$refs.comm.refushinsidecom(res.data.data.new_obj);
        this.$refs.comm.updatereplycount();
        // 一直会优先处理父组件
        // this.$nextTick(() => {
        //   this.$refs.comm.postCount();
        // });
        this.commCount += 1;
        this.commetValue = "";
      } catch (err) {
        if (err.response.status === 500) {
          this.$toast.fail("请登录");
          console.log(err);
          console.log(err.response.status);
        }
      }
    },

    topInfo() {
      if (document.documentElement.scrollTop >= 100) {
        // console.log("1");
        // console.log(document.querySelector(".headInfo").offsetTop);
        return (this.isTop = true);
      } else {
        return (this.isTop = false);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.soucanged {
  color: rgb(251, 114, 153);
}
.bodysa {
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding-bottom: 90px;
  background-color: #fff;
}
.headInfo {
  width: 100%;
  .users {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

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
  }
  .subbtn {
    width: 137px;
    height: 51px;
    line-height: 1px;
    font-size: 16px;
    color: #fff;
    background-color: rgb(251, 114, 153);
    border: 4px solid #fff;
    border-radius: 10px;
  }
  .on {
    background-color: #a7a7a7;
  }
}
.banner {
  background-color: #fff;
  overflow: hidden;
  padding: 48px 30px 0;
  .title {
    font-size: 40px;
    color: #3a3a3a;
  }
  .users {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .userName {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .inf {
        padding-left: 10px;
        p {
          font-size: 16px;
        }
        .time {
          color: darkgray;
        }
      }
      .avatar {
        width: 70px;
        height: 70px;
        overflow: hidden;
        border-radius: 70px;
        padding: 0 !important;
        img {
          width: 100%;
        }
      }
    }
    .subbtn {
      width: 170px;
      height: 58px;
      font-size: 28px;
      color: #fff;
      background-color: rgb(251, 114, 153);
      border: none;
      border-radius: 29px;
    }
    .on {
      background-color: #a7a7a7;
    }
  }
  .content {
    overflow: hidden;

    /deep/ pre {
      width: 100%;
      font-size: 12px;
      overflow: scroll;
    }
    /deep/ img {
      width: 100%;
    }
    /deep/ p {
      font-size: 28px;
      width: 100%;
    }
    /deep/ h1 {
      margin: 60px 0;
      font-size: 56px;
    }
    /deep/ h2 {
      margin: 30px 0;
      font-size: 42px;
    }
    /deep/ h3 {
      font-size: 32.76px;
      margin: 15px 0;
    }
    /deep/ li {
      font-size: 28px;
    }
    /deep/ span {
      font-size: 28px;
    }
    margin-top: 30px;
    // overflow: hidden;
    // max: width 30px;

    width: 100%;
  }
}
.spliceline {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  span {
    font-size: 20px;
    color: silver;
  }
  .line {
    height: 15px;
    width: 30%;
    border-bottom: dashed silver 2px;
  }
}

.commetbanner {
  position: fixed;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: #fff;
  border-top: 2px solid #eeeeee;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 0 5px;
  z-index: 10000;
  .tocommet {
    width: 400px;
    height: 64px;
    line-height: 64px;
    border: solid 2px #eeeeee;
    border-radius: 32px;
    background-color: #fff;
    font-family: MicrosoftYaHei;
    font-size: 30px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 65px;
    letter-spacing: 2px;
    color: #a7a7a7;
    // text-align: start;
    // text-align: center;
    display: flex;
    justify-content: start;
    align-items: center;
    text-indent: 27px;
    // margin: 0 auto;
  }
  .my-icon {
    font-size: 42px;
  }
  .list {
    position: relative;
  }
  .soucan {
    margin-bottom: 5px;
  }
  .dianzan {
    margin-bottom: 5px;
  }
  .count {
    position: absolute;
    width: 35px;
    height: 35px;
    background-color: #e22829;
    border-radius: 50%;
    right: 0;
    top: 0;
    transform: translate(50%, 10%);
    color: #fff;
    font-size: 12px;
    text-align: center;
    line-height: 35px;
  }
}
.commentList {
  margin-top: 50px;
}
/deep/ .van-nav-bar__title {
  max-width: 90%;
  width: 70%;
}

// 严重注意！！！vant组件没有使用计算属性 ，pandding导致撑开元素 会溢出父元素！！！！！！！！
/deep/ .van-popup {
  padding: 30px 40px;
  box-sizing: border-box;
  z-index: 9999 !important;
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
  margin-right: 20px;
}
// .topleader {
//   z-index: 10;
//   position: fixed;
//   top: 0;
//   width: 100%;
// }
</style>