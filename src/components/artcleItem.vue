<template>
  <van-cell size="large" @click="toArtticlelabel(itemId)">
    <template #title>
      <div class="titleS">
        <p>{{ title }}</p>
        <div class="place" v-if="cover.type === 1"></div>
        <div class="cover" v-if="cover.type === 1">
          <img :src="cover.images[0]" alt="" />
        </div>
      </div>
    </template>
    <template #label>
      <div class="imgs" v-if="cover.type === 3">
        <img
          alt=""
          :src="item"
          v-for="(item, index) in cover.images"
          :key="index"
        />
      </div>

      <div class="info">
        <span class="top" v-show="is_top === 0 ? true : false">顶置</span>
        <span>{{ artclename }}</span>
        <span>{{ comment }}</span>
        <span>{{ time }}</span>
        <span class="close"><i class="my-icon my-icon-guanbi"></i></span>
      </div>
    </template>
  </van-cell>
</template>

<script>
export default {
  props: [
    "title",
    "artclename",
    "comment",
    "time",
    "is_top",
    "cover",
    "itemId",
  ],
  data() {
    return {};
  },
  methods: {
    toArtticlelabel(id) {
      this.$router.push({ path: `/article/${id}` });
    },
  },
};
</script>

<style lang="less" scoped>
.titleS {
  display: flex;
  p {
    word-break: normal;
    white-space: pre-wrap;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    flex: 1;
  }
  .place {
    width: 267px;
    height: 146px;
  }
}
.top {
  color: #e22829;
}
.info {
  margin-top: 30px;
}
span {
  color: #b4b4b4;
  font-size: 23px;
  margin-right: 10px;
}
.close {
  position: absolute;
  right: 30px;
  .my-icon-guanbi {
    font-size: 16px !important;
  }
}

.cover {
  position: absolute;
  right: 26px;

  img {
    width: 232px;
    height: 146px;
  }
}
.imgs {
  display: flex;
  margin-top: 30px;

  img {
    // margin-left: 8px;
    padding: 0 1px;
    width: 232px;
    height: 146px;
  }
}
</style>