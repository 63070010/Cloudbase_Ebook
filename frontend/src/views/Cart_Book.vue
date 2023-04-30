<template>
  <div>
    <NavBar />
    <div class="hero-body hero is-fullheight">
      <div class="container has-text-centered">
        <div class="column">
          <p class="is-size-3" style="color: #31708e">
            <i class="fa fa-book" aria-hidden="true" style="color: #687864">
            </i>
            &nbsp;รายชื่อหนังสือใน ตะกร้า
          </p>
          <br />
          <div class="divider is-info" style="color: #8fc1e3">
            Books in the cart
          </div>
        </div>
        <div v-if="cartitemlast.length > 0">
          <div
            class="box"
            v-for="(value, index) in cartitemlast"
            v-bind:key="index"
          >
            <article class="media">
              <div class="media-left">
                <img
                  :src="value.image"
                  alt="Image"
                  style="object-fit: cover"
                  class="image is-128x128"
                />
              </div>
              <div class="media-content" style="margin-left: 900px">
                <div class="content">
                  <span style="color: #8fc1e3"
                    >ชื่อหนังสือ: {{ value.title }}</span
                  >
                  <br />
                  <span style="color: #8fc1e3">ราคา: {{ value.price }}</span>
                  <br />
                  <span style="color: #8fc1e3"
                    >แต้มสะสม: {{ value.point }}</span
                  >
                </div>
                <div class="level-right">
                  <a class="level-item">
                    <span class="icon is-small" @click="dropbook(value)">
                      <i class="fa fa-trash" style="color: #687864"></i>
                    </span>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div class="divider is-info is-size-6" style="color: #8fc1e3">
          <router-link to="/" style="color: #8fc1e3"
            >กลับไปเลือกซื้อหนังสือเพิ่ม</router-link
          >
        </div>
      </div>
      <div class="container hero-body">
        <div class="columns is-multiline box">
          <div class="column is-12">
            <h1
              class="title has-text-centered section-title is-size-4"
              style="color: #31708e"
            >
              ยอดชำระเงิน : {{ totalprice }} บาท
            </h1>
            <h1
              class="title has-text-centered section-title is-size-4"
              style="color: #31708e"
            >
              คะแนนสะสมรวม : {{ totalpoint }} บาท
            </h1>
          </div>
          <div class="column is-10 has-text-centered is-offset-1">
            <h2 class="subtitle" style="color: #31708e">
              จำนวนหนังสือในตะกร้า : {{ cartitemlast.length }} เล่ม
            </h2>

            <router-link to="/QrCodeWithCheck" v-if="cartitemlast.length != 0"
              ><button class="button">
                ไปหน้าชำระเงิน&emsp;<i
                  class="fa fa-arrow-circle-right"
                  aria-hidden="true"
                ></i>
              </button>
            </router-link>

            <div v-else>
              <button class="button" disabled>
                ไปหน้าชำระเงิน&emsp;<i
                  class="fa fa-arrow-circle-right"
                  aria-hidden="true"
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar";
import axios from "axios";

export default {
  name: "Cart_Book",
  components: {
    NavBar,
  },
  data() {
    return {
      cart: [],
      book: [],
      cartitemlast: [],
      cartitem: [],
      totalprice: 0,
      bookshelf: [],
      id: null,
      totalpoint: 0,
    };
  },
  mounted() {
    // ดึงค่า id จาก LocalStorage เมื่อ component ถูกโหลด
    this.id = localStorage.getItem("id");
    this.getcartitem();
  },
  methods: {
    async getcartitem() {
      try {
        const response = await axios.get(
          "https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/book"
        );
        this.book = response.data;

        const cartResponse = await axios.get(
          `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/cart?id=${this.id}`
        );
        this.cart = cartResponse.data;
        this.cartitem = this.cart[0].cart_item.NS;
        this.bookshelf = this.cart[0].bookshelf.NS;
        this.totalprice = this.cart[0].price;
        this.totalpoint = this.cart[0].point;

        this.cartitemlast = this.book.filter((item) => {
          return this.cartitem.includes(String(item.book_id));
        });
        console.log(this.cartitemlast);
      } catch (error) {
        console.error(error);
      }
    },
    async dropbook(event) {
      this.totalprice -= event.price;
      this.totalpoint -= event.point;
      this.cartitem = this.cartitem.filter(
        (item) => item !== String(event.book_id)
      );

      this.cartitemlast = this.cartitemlast.filter(
        (obj) => obj.book_id !== event.book_id
      );
      console.log(this.cartitemlast);
      if (this.cartitem.length == 0) {
        this.cartitem = ["0"];
      }

      axios
        .put(
          "https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/cart",
          {
            id: String(this.id),
            bookshelf: this.bookshelf,
            cart_item: this.cartitem,
            user_id: String(this.id),
            price: this.totalprice,
            point: this.totalpoint,
          }
        )
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
<style >
@import "~@creativebulma/bulma-divider";
</style>