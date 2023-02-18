<template>
  <div class="main">
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      fixed
      @click-left="fn"
    />
    <van-form @submit="onSubmit" class="van-from">
      <van-field
        show-error
        left-icon="shouji"
        v-model="users.mobile"
        label="用户名"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: 'must be required' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '请填写正确的手机号' },
        ]"
      >
        <template #left-icon>
          <i class="my-icon my-icon-shouji"></i>
        </template>
      </van-field>
      <van-field
        v-model="users.code"
        type="number"
        name="密码"
        label="验证码"
        placeholder="请输入验证码"
        :rules="[
          [
            {
              required: true,
              message: '验证码不能为空',
            },
            {
              pattern: /^\d{6}$/,
              message: '验证码格式错误',
            },
          ],
        ]"
      >
        <i slot="left-icon" class="my-icon my-icon-yanzhengma"></i>
        <template #button>
          <button
            class="getInfoBtn"
            @click="sendCode"
            type="button"
            :disabled="countDown"
          >
            <span v-if="!countDown">发送验证码</span>
            <van-count-down :time="time" format="ss秒" v-else @finish="reset" />
          </button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" class="sub"
          >登录&注册</van-button
        >
        <!-- <van-icon name="fail" />
        <van-icon class-prefix="my-icon" name="dianzan" /> -->
      </div>
    </van-form>
    <a class="botom">隐私条款</a>
  </div>
</template>

<script>
import { loginAPI, sendCodeAPI } from "@/api/index";

export default {
  data() {
    return {
      users: {
        mobile: "",
        // 万能密码==246810==(只能写这个)
        code: "",
      },
      countDown: false,
      time: 60000,
    };
  },
  methods: {
    async onSubmit() {
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: "登录中...", // 提示消息
      });
      try {
        const res = await loginAPI(this.users);
        console.log(res);
        this.$toast("登陆成功");
        // 传入本地储存和vuex
        // this.$store.commit(setKey, res.data.data);-------------------！！！！事件名必须+''
        this.$store.commit("setUser", res.data.data);
        this.$router.push({ path: "/banner/home" });
      } catch (err) {
        if (err.response.status === 400) {
          console.log(err);
          this.$toast("登陆失败");
        }
      }
    },
    async sendCode() {
      this.countDown = true;
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: "发送中...", // 提示消息
      });
      try {
        const res = await sendCodeAPI(this.users.mobile);
        console.log(res);
        this.$toast("发送成功");
      } catch (err) {
        if (err.response.status === 404) {
          console.log(err);
          this.countDown = false;
          this.$toast("发送失败");
        }
      }
    },
    reset() {
      this.countDown = false;
    },
    fn() {
      this.$router.push({ path: "/banner" });
    },
  },
};
</script>

<style lang="less" >
.main {
  padding-top: 92px;
  .van-count-down {
    font-size: 22px;
    color: #666666;
  }
  .van-from {
    margin-top: 50px;
  }
  .sub {
    border-radius: 10px;
    background-color: rgb(251, 114, 153);
    border: none;
  }
  .my-icon {
    font-size: 37px;
  }
  .getInfoBtn {
    border: none;
    border-radius: 23px;
    font-size: 22px;
    color: #666666;
    width: 152px;
    height: 46px;
  }
  .botom {
    position: fixed;
    left: 50%;
    transform: translate(-50%);
    bottom: 54px;
    text-align: center;
    line-height: 36px;
    letter-spacing: 1px;
    color: #666666;
    font-size: 25px;
  }
}

// .van-nav-bar__content {
//   background-color: rgb(251, 114, 153);
// }
// .van-nav-bar__title {
//   color: rgb(255, 245, 255) !important;
// }
// .van-nav-bar__left {
//   .van-icon-arrow-left {
//     color: rgb(255, 245, 255) !important;
//   }
//   .van-nav-bar__text {
//     color: rgb(255, 245, 255) !important;
//   }
// }
</style>
