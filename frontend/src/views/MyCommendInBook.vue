<template>
  <div>
    <NavBar />
    <div class="container is-max-widescreen">
      <h2 class="subtitle">ค้นหาหนังสือ</h2>
      <!--######### tab ค้นหา #########-->
      <div class="tabs is-boxed">
        <ul>
          <li
            :class="[number == 1 ? 'is-active' : '']"
            @click="changeTab('ชื่อหนังสือ', 1)"
          >
            <a>
              <span>ชื่อหนังสือ</span>
            </a>
          </li>
          <li
            :class="[number == 2 ? 'is-active' : '']"
            @click="changeTab('ประเภท', 2)"
          >
            <a>
              <span>ประเภท</span>
            </a>
          </li>
          <li
            :class="[number == 3 ? 'is-active' : '']"
            @click="changeTab('นักเขียน', 3)"
          >
            <a>
              <span>นักเขียน</span>
            </a>
          </li>
        </ul>
      </div>

      <!--######### search #########-->
      <div class="search">
        <div class="field search_field has-addons">
          <p class="control search_input">
            <input
              v-model="search"
              class="input is-rounded"
              type="text"
              :placeholder="typeTab"
            />
          </p>
          <p class="control" @click="getProducts()">
            <button class="button is-link is-rounded">
              <i class="fa fa-search"></i>
            </button>
          </p>
        </div>
      </div>

      <!--######### ส่วนแสดงผล #########-->
      <div class="container">
        <section class="card is-small is-narrow p-5">
          <div class="columns">
            <div
              class="column is-one-fifth"
              v-for="(value, index) in mycomments"
              :key="index"
            >
              <div class="card">
                <router-link :to="`/DetailsBook/${value.book_id}`">
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
                        <p class="is-size-7" style="color: #bab2b5">
                          By {{ value.penname }}
                        </p>
                        <p class="is-size-7" style="color: #bab2b5">
                          Date {{ value.Date }}
                        </p>
                      </div>
                    </div>
                  </div>
                </router-link>
                <div class="level ml-2 mt-6">
                  <span v-if="!bookshelf.includes(String(value.book_id))">
                    ฿ {{ value.price }}</span
                  >
                  <button
                    class="button is-ghost level-right mb-2"
                    @click="cardpush(value)"
                    v-if="
                      !bookshelf.includes(String(value.book_id)) &&
                      !bookincart.includes(String(value.book_id))
                    "
                  >
                    <i
                      class="fa fa-cart-plus is-size-4"
                      style="color: #5085a5"
                      aria-hidden="true"
                    ></i>
                  </button>

                  <span
                    v-else-if="bookincart.includes(String(value.book_id))"
                    class="mt-4 mr-2 mb-2"
                    style="color: #5085a5"
                    >หนังสืออยู่ในตะกร้า</span
                  >
                  <router-link
                    to="/Bookshelf"
                    style="margin-left: auto; margin-right: auto"
                    v-else
                  >
                    <button
                      class="button is-rounded mb-2"
                      style="
                        color: #f7f9fb;
                        background-color: #5085a5;
                        margin-left: auto;
                        margin-right: auto;
                      "
                    >
                      Go bookshelf
                    </button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!--######### BTN NEXT && BACK #########-->
          <div
            class="field next_or_back has-addons"
            style="display: flex; justify-content: center; align-items: center"
          >
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
  name: "MyCommendinBook",
  components: {
    NavBar,
  },

  mounted() {
    // ดึงค่า id จาก LocalStorage เมื่อ component ถูกโหลด
    this.id = localStorage.getItem("id");
    this.fetchData();
    this.getcart();
  },
  data() {
    return {
      search: "",
      number: 1,
      typeTab: "ค้นหา ทั้งหมด",
      books: [],
      currentPage: 1,
      lastpage: 1,
      cart: [],
      totalprice: 0,
      bookincart: [],
      bookshelf: [],
      id: null,
      user: [],
      mycomments: [],
      type: "ชื่อหนังสือ",
      totalpoint: 0,
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
          "https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/book"
        );
        this.book = response.data;
        const response2 = await axios.get(
          `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/user?id=${this.id}`
        );
        this.user = response2.data;
        console.log(this.user);

        const usercomment = this.user[0].rev_book.NS;
        this.mycomments = this.book.filter((item) => {
          return usercomment.includes(String(item.book_id));
        });
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
    getProducts() {
      const usercomment = this.user[0].rev_book.NS;
      if (this.search == "") {
        this.mycomments = this.book.filter((item) => {
          return usercomment.includes(String(item.book_id));
        });
      } else if (this.type == "ชื่อหนังสือ") {
        try {
          axios
            .get(
              `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/search?title=${this.search}`
            )
            .then((response) => {
              this.mycomments = response.data;
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        } catch (error) {
          console.log(error);
        }
      } else if (this.type == "ประเภท") {
        try {
          axios
            .get(
              `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/search?type=${this.search}`
            )
            .then((response) => {
              this.mycomments = response.data;
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        } catch (error) {
          console.log(error);
        }
      } else if (this.type == "นักเขียน") {
        try {
          axios
            .get(
              `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/search?penname=${this.search}`
            )
            .then((response) => {
              this.mycomments = response.data;
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
    changeTab(text, num) {
      this.type = text;
      this.typeTab = "ค้นหา " + text;
      this.number = num;
    },
    async getcart() {
      try {
        axios
          .get(
            `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/cart?id=${this.id}`
          )
          .then((response) => {
            this.cart = response.data;
            this.bookshelf = this.cart[0].bookshelf.NS;
            this.bookincart = this.cart[0].cart_item.NS;
            this.totalprice = this.cart[0].price;
            this.totalpoint = this.cart[0].point;
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async cardpush(event) {
      if (this.id != null) {
        this.totalprice += event.price;
        this.totalpoint += event.point;
        this.bookincart.push(String(event.book_id));

        axios
          .put(
            "https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/cart",
            {
              id: String(this.id),
              bookshelf: this.bookshelf,
              cart_item: this.bookincart,
              user_id: String(this.id),
              price: String(this.totalprice),
              point: String(this.totalpoint),
            }
          )
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        alert("กรุณาเข้าสู่ระบบ");
      }
    },
  },
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