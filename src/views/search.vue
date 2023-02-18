<template>
  <div class="banners">
    <van-sticky>
      <van-search
        v-model="value"
        placeholder="搜索"
        input-align="center"
        background="rgb(251, 114, 153)"
        clearable
        show-action
        sticky
        @search="sousuo"
        @input="linkSugt"
        @cancel="cancels"
      />
    </van-sticky>
    <div v-if="searched">
      <van-cell-group v-if="isInput">
        <van-cell
          v-for="item in suggustVal"
          :key="item"
          @click="toSuggestVal(item)"
        >
          <p slot="title">
            <i class="my-icon my-icon-sousuo"></i>&nbsp;&nbsp;&nbsp;&nbsp;<span
              v-html="lightHight(item)"
            ></span>
          </p>
        </van-cell>
      </van-cell-group>
      <van-cell-group v-else>
        <van-cell title="搜索历史">
          <span v-show="deleteBtn" @click="allremove">全部删除</span>
          &nbsp;&nbsp;
          <span v-show="deleteBtn" @click="deleteBtn = !deleteBtn">完成</span>
          <van-icon name="delete" @click="deleteBtn = !deleteBtn" />
        </van-cell>
        <van-cell
          :title="item"
          v-for="(item, index) in histroyVal"
          :key="index"
          @click="toSearchHistroy(item)"
        >
          <van-icon
            name="close"
            v-show="deleteBtn"
            @click.stop="removes(index)"
          />
        </van-cell>
      </van-cell-group>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="finishedText"
      @load="onLoad"
      v-else
    >
      <!-- <van-cell v-for="item in list" :key="item.art_id" :title="item.art_id" /> -->
      <artcleltem
        v-for="(item, index) in searchRsult"
        :key="index"
        :title="item.title"
        :artclename="item.aut_name"
        :comment="item.comm_count"
        :time="item.pubdate"
        :is_top="item.is_top"
        :cover="item.cover"
        :itemId="item.art_id"
      ></artcleltem>
    </van-list>
  </div>
</template>

<script>
import { LinkThinkAPI, toSearchAPI } from "@/api";
import artcleltem from "../components/artcleItem.vue";
export default {
  components: {
    artcleltem,
  },
  data() {
    return {
      deleteBtn: false,
      value: "",
      suggustVal: [],
      histroyVal: [],
      searchRsult: [],
      isSearch: false,
      isInput: false,
      searched: true,
      Timer: null,
      finishedText: "没有符合条件的结果",
      loading: false,
      finished: false,
      page: 1,

      // valsss: '<span style="color: red">SB</span>',
    };
  },
  methods: {
    sousuo() {
      const idx = this.histroyVal.findIndex((item) => {
        return item === this.value.trim();
      });
      if (this.histroyVal.length > 10) {
        this.histroyVal.splice(this.histroyVal.length - 1, 1);
        if (idx != -1) {
          this.histroyVal.splice(idx, 1);
          this.histroyVal.unshift(this.value);
        } else {
          this.histroyVal.unshift(this.value);
        }
      } else {
        if (idx != -1) {
          this.histroyVal.splice(idx, 1);
          this.histroyVal.unshift(this.value);
        } else {
          this.histroyVal.unshift(this.value);
        }
      }
      // this.tosearch(this.value);
      this.tosearch();
      this.searched = true;
      this.searched = false;
      // this.onLoad();
    },
    allremove() {
      this.histroyVal = [];
    },
    removes(index) {
      this.histroyVal.splice(index, 1);
    },
    linkSugt() {
      this.deleteBtn = false;
      this.searched = true;
      this.isInput = true;
      if (this.Timer) {
        clearTimeout(this.Timer);
        this.Timer = null;
        return;
      } else {
        this.Timer = setTimeout(
          async () => {
            if (this.value.trim()) {
              console.log(this.value);
              const res = await LinkThinkAPI({ q: this.value });
              this.suggustVal = res.data.data.options;
              console.log(res);
              if (res.data.data.options.length <= 1) {
                this.suggustVal = ["没有符合"];
              }
            } else {
              return;
            }
          },

          500
        );
      }
      if (this.value.trim() === "") {
        this.suggustVal = [];
        this.isInput = false;
      }
    },
    toSuggestVal(val) {
      this.value = val;

      this.sousuo();
    },
    lightHight(val) {
      const reg = new RegExp(this.value, "gi");
      return val.replace(reg, `<span style="color: red">${this.value}</span>`);
    },
    async tosearch() {
      const res = await toSearchAPI({
        page: 1,
        q: this.value,
      });
      // console.log(res);
      this.finished = false;
      this.page = 1;
      console.log("搜索中...");
      this.searchRsult = res.data.data.results;
    },
    cancels() {
      this.searched = true;
      this.value = "";
      this.searchRsult = [];
      this.$router.history.go(-1);
    },
    toSearchHistroy(item) {
      this.value = item;
      // console.log(item);
      // this.searched = false;
      this.sousuo();
      // this.onLoad();
    },
    async onLoad() {
      this.finished = false;
      this.page++;

      // this.page = 1;
      const res = await toSearchAPI({
        page: this.page,
        q: this.value,
      });

      console.log(res);
      this.searchRsult = [...this.searchRsult, ...res.data.data.results];

      // this.finished = false;
      // this.loading = false;
      console.log(this.value);
      console.log(this.page);
      // console.log(res.data.data.results.length);
      if (res.data.data.results.length < 10) {
        this.loading = false;
        this.finished = true;
        this.finishedText = "没有更多啦";
        console.log("小于10条");
      }
      if (res.data.data.total_count === 0) {
        this.loading = false;
        this.finished = true;
        this.finishedText = "没有符合条件的结果";
      }
      // console.log("<10 loading");
      this.loading = false;
    },
  },
  watch: {
    histroyVal(newval) {
      localStorage.setItem("Search_Historys", JSON.stringify(newval));
    },
  },
  created() {
    this.histroyVal = JSON.parse(localStorage.getItem("Search_Historys")) || [];
  },
};
</script>

<style lang="less" scoped>
// .banners {
//   overflow-y: scroll;
//   height: 100%;
// }
// /deep/ .van-search {
//   width: 100%;
//   position: fixed;
//   top: 0;
// }
/deep/ .van-search__action {
  color: #fff;
}
</style>