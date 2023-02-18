<template>
  <div class="Channel">
    <div class="bianji">
      <van-button
        plain
        size="small"
        round
        color="rgb(248,90,90)"
        @click="banji = !banji"
        >编辑</van-button
      >
    </div>
    <p class="titles">我的频道</p>
    <div class="channels">
      <van-button
        type="default"
        color="#f4f5f6"
        v-for="(item, index) in channelList"
        :key="item.id"
      >
        <div slot="default">
          <p>{{ item.name }}</p>
          <div class="removechannel" v-if="banji" @click="removeChannel(index)">
            <i class="my-icon my-icon-guanbi"></i>
          </div>
        </div>
      </van-button>
    </div>
    <p class="titles">频道推荐</p>
    <div class="channels">
      <van-button
        type="default"
        color="#f4f5f6"
        v-for="(item, index) in allChannel"
        :key="item.id"
        @click="addChannel(index)"
        :disabled="!banji"
        ><p slot="default">✛{{ item.name }}</p></van-button
      >
    </div>
  </div>
</template>

<script>
import { getchannelListAPI, getAllChannelsAPI, setUserChannelAPI } from "@/api";
export default {
  data() {
    return {
      channelList: [],
      allChannel: [],
      banji: false,
    };
  },
  async created() {
    if (this.$store.state.user) {
      const res = await getchannelListAPI();
      this.channelList = res.data.data.channels;
      // console.log(res);
    } else {
      this.channelList = JSON.parse(localStorage.getItem("userChannel"));
    }
    const res2 = await getAllChannelsAPI();
    console.log(res2);
    this.allChannel = res2.data.data.channels;
    this.filterAllChannel();
  },
  updated() {
    this.filterAllChannel();
  },
  methods: {
    async updatedChannelList() {
      if (this.$store.state.user) {
        console.log("success");
        const updataArr = [];
        // const updataSerial = [];
        this.channelList.forEach((element, index) => {
          updataArr.push({ id: element.id, seq: index + 1 });
          // updataSerial.push(index);
        });
        console.log(this.channelList);
        try {
          const res = await setUserChannelAPI(updataArr);
          console.log(res);
        } catch (err) {
          if (err) {
            console.log(err);
          }
        }
      } else {
        console.log("local seted");
        localStorage.setItem("userChannel", JSON.stringify(this.channelList));
      }
    },
    removeChannel(index) {
      this.allChannel.unshift(this.channelList[index]);
      // console.log(this.channelList[index]);
      this.channelList.splice(index, 1);
    },
    addChannel(index) {
      this.channelList.push(this.allChannel[index]);
      this.allChannel.splice(index, 1);
    },
    filterAllChannel() {
      this.channelList.forEach((item) => {
        let index = this.allChannel.findIndex((item2) => {
          return item2.name === item.name;
        });
        if (index != -1) {
          this.allChannel.splice(index, 1);
        }
      });
      // console.log(this.allChannel);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-button {
  width: 160px;
  height: 86px;
  margin-top: 30px;
  margin-right: 16px;
}
.channels {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 53px;
  position: relative;
  .removechannel {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    background-color: #f0f0f0;
    border-radius: 100%;
    padding: 10px;
  }
}
.titles {
  font-size: 32px;
  margin-top: 22px;
  margin-bottom: 48px;
}
p {
  font-size: 28px;
  color: #000;
}
.Channel {
  padding: 87px 22px;
  position: relative;
  .bianji {
    position: absolute;
    right: 16px;
    top: 85px;
  }
}
</style>