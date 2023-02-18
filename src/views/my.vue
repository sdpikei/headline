<template>
  <div>
    <div class="userInfo">
      <div class="logined" v-if="$store.state.user">
        <div class="user">
          <div class="userI">
            <div class="avatar"><img :src="userinfo.photo" alt="" /></div>
            <p class="name">{{ userinfo.name }}</p>
          </div>
          <button class="setInfo" @click="toset()">编辑资料</button>
        </div>
        <div class="data-stats">
          <div class="data-item">
            <span class="count">{{ userinfo.art_count }}</span>
            <span class="text">头条</span>
          </div>
          <div class="data-item">
            <span class="count">{{ userinfo.follow_count }} </span>
            <span class="text">关注</span>
          </div>
          <div class="data-item">
            <span class="count">{{ userinfo.fans_count }}</span>
            <span class="text">粉丝</span>
          </div>
          <div class="data-item">
            <span class="count">{{ userinfo.like_count }}</span>
            <span class="text">获赞</span>
          </div>
        </div>
      </div>
      <div class="unlogin" v-else>
        <div class="user">
          <div class="userI">
            <div class="avatar"><img src="../assets/mobile.png" alt="" /></div>
            <p class="title" @click="toLogin()">登录&注册</p>
          </div>
        </div>
      </div>
    </div>
    <van-grid class="libs" column-num="2" :border="false">
      <van-grid-item class="lab left" text="收藏">
        <template #icon>
          <i class="my-icon my-icon-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item class="lab" text="历史">
        <template #icon>
          <i class="my-icon lishi my-icon-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell-group class="information">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <van-button
      type="default"
      hairline
      size="large"
      v-if="$store.state.user"
      @click="quit"
    >
      <template #default>
        <span class="quit">退出登录</span>
      </template>
    </van-button>
  </div>
</template>

<script>
import { getUserNameAPI, getMynameAPI } from "@/api";
export default {
  data() {
    return {
      userinfo: {},
    };
  },
  created() {
    if (this.$store.state.user) {
      this.getInfor();
    }
  },
  // updated() {
  //   if (this.$store.state.user) {
  //     this.getInfor();
  //   }
  // },
  methods: {
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    quit() {
      this.$store.commit("romoveUser");
    },
    async getInfor() {
      try {
        const res = await getMynameAPI();
        console.log(res);
        this.userinfo = res.data.data;
      } catch (err) {
        if (err.response.status === 401) {
          this.$store.commit("romoveUser");
        }
      }
    },
    toset() {
      this.$router.push({ path: "/setInfo" });
    },
  },
};
</script>

<style lang="less" scoped>
.userInfo {
  height: 401px;
  background-image: url("@/assets/banner.png");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .user {
    // position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 116px 33px 0;
    .userI {
      display: flex;
      align-items: center;
      .avatar {
        position: relative;
        width: 116px;
        height: 116px;
        // margin: 116px 0 0 22px;
        //   position: absolute;
        //   top: 116px;
        //   left: 22px;
        border: 1px solid #fff;
        border-radius: 50%;
        overflow: hidden;
        text-align: center;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          display: block;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
          object-fit: cover;
        }
      }
      .name {
        //   position: absolute;
        //   top: 167px;
        //   left: 160px;
        color: #fff;
        font-size: 30px;
        margin-left: 22px;
      }
    }

    .setInfo {
      width: 116px;
      height: 33px;
      line-height: 0;
      padding: 0;
      color: #666666;
      font-size: 20px;
      border-radius: 16px;
      border: none;
      background-color: #fff;
    }
  }
  .data-stats {
    display: flex;
    justify-content: space-around;
    margin-bottom: 32px;
    color: #fff;
    .data-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }
}
.unlogin {
  .user {
    display: flex;
    flex-direction: column;
    .userI {
      display: flex;
      flex-direction: column;
      align-items: center;

      .avatar {
        width: 116px;
        height: 116px;
        // margin: 116px 0 0 22px;
        //   position: absolute;
        //   top: 116px;
        //   left: 22px;
        border: 1px solid #fff;
        border-radius: 50%;
        overflow: hidden;
        img {
          height: 100%;
        }
      }
      .title {
        font-size: 28px;
        color: #fff;
        font-family: MicrosoftYaHei;
        margin-top: 15px;
      }
    }
  }
}
.libs {
  .left {
    &:after {
      /* 必须设置 content 属性才能生效 */
      content: "";
      /* border 宽度 */
      width: 1px;
      /* border 高度 */
      height: 102px;
      background-color: #edeff3;
      /* border 位置 absolute(绝对定位) */
      position: absolute;
      left: 100%;
      top: 22px;
      /* 自动内减 */
      box-sizing: border-box;
      z-index: 999;
    }
  }
  .my-icon {
    font-size: 45px;
    color: #ff9d1d;
  }
  .lishi {
    color: #eb5253 !important;
  }
}
.information {
  margin: 10px 0;
}
.quit {
  font-size: 30px;
  font-family: MicrosoftYaHei;
  color: #d86262;
}
</style>