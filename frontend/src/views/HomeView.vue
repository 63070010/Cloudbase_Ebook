<template>
  <div>
    <NavBar />
    <MyCarosel />
    <div class="columns hero is-fullheight">
      <div class="column mt-4">
        <section class="section">
          <h1>
            <span class="material-icons" style="color: #123c69"
              >&#xe87d; หนังสือทั้งหมด
            </span>

            <div
              class="field has-addons is-pulled-right"
              style="color: #123c69"
            >
              หนังสือในตะกร้า: {{ numbookincart }}
            </div>
            <div class="divider is-info" style="color: #123c69">
              Latest Book
            </div>
          </h1>
          <div class="columns is-mobile is-centered">
            <div class="box has-text-centered">
              <input
                class="input"
                type="text"
                v-model="search"
                placeholder="ชื่อหนังสือ"
              />
              <button @click="getBooks" class="button mt-3">
                ค้นหาหนังสือ
              </button>
            </div>
          </div>
        </section>

        <div class="container is-max-desktop">
          <div class="is-multiline columns is-variable is-2">
            <div
              class="column is-one-quarter"
              v-for="(value, index) in books"
              :key="value.id"
            >
              <div class="card">
                <router-link :to="`/DetailsBook/${value.id}`">
                  <div class="card-image">
                    <figure class="image is-1by1">
                      <img
                        :src="value.image"
                        alt="Placeholder image"
                        style="object-fit: cover"
                      />
                    </figure>
                  </div>

                  <div class="card-content" style="height: 180px">
                    <div class="media">
                      <div class="media-content" style="color: #edc7b7">
                        <p
                          class="is-size-6 has-text-centered subtitle"
                          style="color: #edc7b7"
                        >
                          {{ value.title }}
                        </p>
                        <p class="is-size-7" style="color: #bab2b5">
                          By {{ value.penname }}
                        </p>
                        type:
                        <span
                          class="is-size-7 text-right"
                          style="color: #bab2b5"
                          v-for="(value, index) in value.type"
                          :key="index"
                        >
                          {{ value }}
                        </span>
                      </div>
                    </div>
                  </div>
                </router-link>
                <div class="level ml-2" v-show="this.checkadmin.length == 0">
                  ฿ {{ value.price }}
                  <button
                    v-if="
                      this.totalBook.find((x) => x.book_id == value.id) ===
                      undefined
                    "
                    class="button is-ghost level-right"
                    @click="cardpush(value)"
                  >
                    <i
                      class="fa fa-cart-plus is-size-4"
                      style="color: #edc7b7"
                      aria-hidden="true"
                    ></i>
                  </button>
                  <span v-else class="mt-4 mr-2" style="color: #edc7b7"
                    >มีหนังสือเล่มนี้แล้ว</span
                  >
                </div>
                <div class="level ml-2" v-show="this.checkadmin.length > 0">
                  ฿ {{ value.price }}
                  <button
                    class="button is-ghost level-right ml-2"
                    @click="bookdelete(value, index)"
                    style="color: #123c69"
                  >
                    ส่งลบ
                  </button>
                  /
                  <button
                    class="button is-ghost"
                    @click="bookedit(value, index)"
                    style="color: #123c69"
                  >
                    ส่งแก้ไข
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar";
import MyCarosel from "@/components/MyCarosel";
export default defineComponent({
  name: "HomeView",
  components: {
    NavBar,
    MyCarosel,
  },
  data() {
    return {
      books: [
        {
          book_id: 1,
          title: "your talent is mine",
          image:
            "https://www.osemocphoto.com/collectManga/6534/6534_cover.jpg?0",
        },
      ],
      search: "",
      cart: [],
      cart_item: [],
      pay: {},
      mybook: [],
      totalBook: [],
      numbookincart: 0,
      order: [],
      orderlist: [],
      checkadmin: [],
    };
  },
});
</script>
<style>
@import "~@creativebulma/bulma-divider";
</style>
