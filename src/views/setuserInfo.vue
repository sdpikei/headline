<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <!-- 个人信息 -->
    <van-cell
      class="avatar-cell"
      title="头像"
      is-link
      center
      @click="updateAvatar"
    >
      <van-image class="avatar" round fit="cover" :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" v-model="userValue" is-link
      ><input type="text" v-model="userValue" class="names"
    /></van-cell>
    <van-cell title="性别" v-model="gender" @click="changesex()" is-link />
    <van-cell
      title="生日"
      v-model="user.birthday"
      is-linka
      @click="changedate()"
    />
    <van-button
      type="primary"
      size="large"
      color="rgba(251, 114, 153,.8)"
      round
      @click="subchange"
      >提交</van-button
    >
    <!-- /个人信息 -->
    <input type="file" hidden ref="file" @change="onFileChange($event)" />
    <van-popup v-model="show" position="bottom">
      <!-- <textarea
        name=""
        cols="30"
        rows="10"
        class="commetbar"
        v-model="userValue"
        style="resize: none"
        ref="areacontent"
        v-if="pickname"
      >
      </textarea> -->
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="subdate"
        v-if="pickbrith"
      />
      <van-cascader
        v-model="cascaderValue"
        title="请选择性别"
        :options="options"
        @close="show = false"
        @finish="onFinish"
        v-if="picksex"
      />
    </van-popup>
  </div>
</template>
  
  <script>
import { getUserNameAPI, changeprofileAPI, updateAvatarAPI } from "@/api";
import moment from "moment";
export default {
  //   name: "UserProfile",
  components: {},
  props: {},
  data() {
    return {
      options: [
        { text: "女", value: 1 },
        { text: "男", value: 0 },
      ],
      user: {},
      show: false,
      userValue: "",
      cascaderValue: "",
      currentDate: "",
      pickname: false,
      picksex: false,
      pickbrith: false,
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(),
    };
  },
  computed: {
    gender() {
      return this.user.gender === 1 ? "女" : "男";
    },
  },
  watch: {},
  async created() {
    const res = await getUserNameAPI();
    this.user = res.data.data;
    this.userValue = this.user.name;
    this.cascaderValue = this.user.gender;
    this.currentDate = this.user.birthday;
    console.log(this.user);
  },
  mounted() {},
  methods: {
    async onFileChange(e) {
      let fromObj = new FormData();
      let pic = e.target.files[0];
      fromObj.append("photo", pic);
      try {
        const res = await updateAvatarAPI(fromObj);
        console.log(res);
        this.user.photo = res.data.data.photo;
      } catch (err) {
        if (err) {
          console.log(err);
        }
      }
    },
    updateAvatar() {
      this.$refs.file.click();
    },
    change() {
      this.show = true;
      this.pickname = true;
      this.pickbrith = false;
      this.picksex = false;
      // this.userValue = data;
    },
    changedate() {
      this.show = true;
      this.pickname = false;
      this.pickbrith = true;
      this.picksex = false;
    },
    changesex() {
      this.show = true;
      this.pickname = false;
      this.pickbrith = false;
      this.picksex = true;
    },
    subdate() {
      this.user.birthday = moment(this.currentDate).format("YYYY-MM-DD");
    },
    onFinish() {
      // console.log(this.cascaderValue);
      this.user.gender = this.cascaderValue;
    },
    async subchange() {
      const res = await changeprofileAPI({
        name: this.userValue,
        gender: this.cascaderValue,
        birthday: this.user.birthday,
      });
      console.log(res);
    },
  },
};
</script>
  
  <style scoped lang="less">
/deep/ .van-button {
  position: fixed;
  bottom: 50px;
}
/deep/ .van-popup {
  //   padding: 30px 40px;
  box-sizing: border-box;
  z-index: 9999 !important;
  overflow: auto;
  height: 600px;
}
.names {
  border: none;
  width: 100%;
  box-sizing: border-box;
  text-align: right;
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
.user-profile {
  .avatar-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }
    .avatar {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
  