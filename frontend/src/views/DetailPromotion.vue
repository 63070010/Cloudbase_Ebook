<template>
  <div>
    <NavBar />
    <br />
    <br />
    <br />
    <div class="card" v-if="pro && pro[0]">
      <div class="card-image">
        <figure class="image" v-if="pro && pro[0]">
          <img
            :src="pro[0].image"
            class="color_use"
            style="
              width: 850px;
              height: auto;
              margin-left: auto;
              margin-right: auto;
              border: 8px solid #5085a5;
            "
          />
        </figure>
      </div>
      <div class="card-content" style="text-align: center">
        <div
          class="content"
          style="font-size: 36px; font-weight: bold; color: #5085a5"
        >
          {{ pro[0].title }}
        </div>
      </div>
      <div class="card-content" style="text-align: center">
        <div
          class="content"
          style="font-size: 24px; font-weight: bold; color: #8fc1e3"
        >
          {{ pro[0].desc }}
          <br />
        </div>
      </div>
    </div>

    <br />
    <div class="hero is-fullheight" v-if="bookinevent.length > 0">
      <div class="container mb-4">
        <div class="column mt-4">
          <section class="card is-small is-narrow p-5">
            <div
              class="field has-addons is-pulled-right"
              style="color: #123c69"
            >
              <router-link :to="`/EventAllPromotion/${this.$route.params.id}`">
                <button class="button">ดูหนังสือทั้งหมด</button></router-link
              >
            </div>
            <h1 class="ml-4">book in event</h1>
            <div class="divider is-info" style="color: #123c69">
              Books in event
            </div>
            <div class="columns">
              <div
                class="column"
                v-for="(value, index) in bookinevent.slice(0, 5)"
                :key="index"
              >
                <div class="card" style="width: 220px">
                  <router-link :to="`/DetailsBook/${value.book_id}`">
                    <div class="card-image" style="width: 220px">
                      <figure class="image is-square">
                        <img :src="value.image" />
                      </figure>
                    </div>

                    <div class="card-content" style="height: 160px">
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
                  <div class="level ml-2">
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
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar";
import axios from "axios";
export default {
  name: "DetailPromotion",
  components: {
    NavBar,
  },
  data() {
    return {
      books: [],
      event: [],
      bookinevent: [],
      cart: [],
      id: null,
      totalprice: 0,
      bookincart: [],
      bookshelf: [],
      pro: [],
      totalpoint: 0,
    };
  },
  mounted() {
    // ดึงค่า id จาก LocalStorage เมื่อ component ถูกโหลด
    this.id = localStorage.getItem("id");
    this.fetchData(this.$route.params.id);
    this.promotion(this.$route.params.id);
    this.getcart();
  },

  methods: {
    async promotion(id) {
      try {
        axios
          .get(
            `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/getevent?event_id=${id}`
          )
          .then((response) => {
            this.pro = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchData(id) {
      try {
        const response = await axios.get(
          "https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/book"
        );
        this.books = response.data;
        const response2 = await axios.get(
          `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/getevent?event_id=${id}`
        );
        this.event = response2.data;

        const getevent = this.event[0].book_id.NS;
        this.bookinevent = this.books.filter((item) => {
          return getevent.includes(String(item.book_id));
        });
        console.log(this.event);
      } catch (error) {
        console.log(error);
      }
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
.color_use:hover {
  border: 5px solid #8fc1e3;
  transition: transform 1000ms ease-out;
  transform: scale(1.1);
}
</style>