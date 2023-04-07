<template>
  <div>
    <NavBar />
    <div class="hero-body hero is-fullheight">
      <div class="container has-text-centered">
        <div class="column">
          <p class="is-size-3" style="color: #ac3b61">
            <i class="fa fa-book" aria-hidden="true"> </i>
            &nbsp;รายชื่อหนังสือใน ตะกร้า
          </p>
          <br />
          <div class="divider is-info" style="color: #123c69">
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
                  <p>
                    <strong>ชื่อหนังสือ: {{ value.title }}</strong>
                    <br />
                    <small>ราคา: {{ value.price }}</small>
                  </p>
                </div>
                <div class="level-right">
                  <a class="level-item">
                    <span class="icon is-small" @click="dropbook()">
                      <i class="fa fa-trash" style="color: #ac3b61"></i>
                    </span>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div class="divider is-info is-size-6" style="color: #123c69">
          <router-link to="/" style="color: #123c69"
            >กลับไปเลือกซื้อหนังสือเพิ่ม</router-link
          >
        </div>
      </div>
      <div class="container hero-body">
        <div class="columns is-multiline box">
          <div class="column is-12">
            <h1 class="title has-text-centered section-title is-size-4">
              ยอดชำระเงิน : {{ totalprice }} บาท
            </h1>
          </div>
          <div class="column is-10 has-text-centered is-offset-1">
            <h2 class="subtitle">
              จำนวนหนังสือซื้อที่ซื้อ : {{ cartitemlast.length }} เล่ม
            </h2>
            <router-link style="color: #123c69" v-if="cartitemlast.length > 0">
              <button class="button">
                ไปหน้าชำระเงิน&emsp;<i
                  class="fa fa-arrow-circle-right"
                  aria-hidden="true"
                ></i>
              </button>
            </router-link>
            <div>
              <button class="button" disabled v-if="cartitemlast.length == 0">
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
  created() {
    this.getcartitem();
  },
  data() {
    return {
      cart: [],
      book: [],
      cartitemlast: [],
      cartitem: [],
      totalprice: 0,
      id: 1,
    };
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

        this.cartitemlast = this.book.filter((item) => {
          return this.cartitem.includes(String(item.book_id));
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style >
@import "~@creativebulma/bulma-divider";
</style>