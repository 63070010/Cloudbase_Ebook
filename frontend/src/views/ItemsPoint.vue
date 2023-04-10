<template>
  <div>
    <NavBar />
    <div class="container is-max-widescreen">
      <!--######### ส่วนแสดงผล #########-->
      <div class="container">
        <section class="card is-small is-narrow p-5">
          <div class="columns">
            <div
              class="column is-one-fifth"
              v-for="(value, index) in item"
              :key="index"
            >
              <div class="card">
                  <div class="card-image">
                    <figure class="image is-square">
                      <img :src="value.image" />
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="media">
                      <div class="media-content" style="color: #edc7b7">
                        <p class="is-size-6 has-text-centered subtitle">
                          {{ value.title }}
                        </p>
                        <p class="is-size-6" style="color: #687864">
                          ใช้คะแนน {{ value.point }} แต้ม
                        </p>
                      </div>
                    </div>
                  </div>
                <div class="level ml-2 mt-6">
                  จำนวนที่มี {{ countitems[index] }}
                  <button
                    class="button is-ghost level-right"
                  >
                    <i
                      class="fa fa-cart-plus is-size-4"
                      style="color: #5085a5"
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!--######### BTN NEXT && BACK #########-->
          <div class="field next_or_back has-addons">
            <button
              v-if="this.currentPage == 1"
              disabled
              class="button is-primary is-outlined"
            >
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </button>
            <button
              v-else
              class="button is-primary is-outlined"
              v-on:click="backPage"
            >
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </button>
            <h2 class="textPage mt-2 mx-2">หน้าที่ {{ this.currentPage }}</h2>
            <button
              v-if="this.lastpage > this.currentPage"
              v-on:click="nextPage"
              class="button is-primary is-outlined"
            >
              <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
            <button v-else disabled class="button is-primary is-outlined">
              <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
        </section>
      </div>
      <br />
      <!-- <div class="container" v-for="(valueallbooks, indexallbooks) in books" :key="indexallbooks">
        <div>{{ valueallbooks.book_id }}</div>
      </div> -->
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import axios from "axios";

export default {
  name: "ItemsPoint",
  components: {
    NavBar,
  },
  created() {
    this.fetchData();
  },
  data() {
    return {
      search: "",
      number: 1,
      typeTab: "ค้นหา ทั้งหมด",
      user: [],
      currentPage: 1,
      lastpage: 1,
      cart: [],
      totalprice: 0,
      bookincart: [],
      bookshelf: [],
      id: 1,
      item: [],
      countitems: [],
    };
  },
  computed: {
    paginatedBooks() {
      const startIndex = (this.currentPage - 1) * 3;
      const endIndex = startIndex + 3;
      return this.books.slice(startIndex, endIndex);
    },
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/user?id=${"1"}`
        );
        this.user = response.data;
        const response2 = await axios.get(
          "https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/item"
        );
        this.item = response2.data;
        this.countitems = this.user[0].item_count.NS;
        console.log(this.item);
        console.log(this.countitems)

      } catch (error) {
        console.log(error);
      }
    },

    nextPage() {
      this.currentPage++;
    },
    backPage() {
      this.currentPage--;
    },
    getProducts() {},
    changeTab(text, num) {
      this.typeTab = "ค้นหา " + text;
      this.number = num;
    },
  }
};
</script>
<style>
body {
  background: #f7f9fb;
  font-family: "Itim", cursive;
  width: 100vw;
  min-height: 100vh;
}

.container {
  margin-top: 3%;
}

.search {
  margin-top: 3%;
  width: 100%;
  position: relative;
}

.search_field {
  margin: auto;
  /* display: block; */
  width: 40%;
}

.search_input {
  width: 100%;
}

.next_or_back {
  display: block;
  margin: auto;
  width: 15%;
  text-align: center;
}

/* .textPage {
  margin: 5px;
} */

.columns {
  display: flex;
  flex-wrap: wrap;
  max-height: 1000px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 20px;
}

.column {
  margin-top: 20px;
}

.card-content {
  height: 100px;
}

/* @media screen and (max-width: 900px) {
  .column {
    margin-top: 20px;
    width: 50%;
  }
} */
/* @media screen and (max-height: 1000px) {
  .columns {
    display: none;
  }
} */
</style>