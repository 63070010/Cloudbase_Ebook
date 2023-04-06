  <template>
  <div>
    <NavBar />
    <MyCarosel />
    <div class="columns hero is-fullheight">
      <div class="container">
        <div class="column mt-4">
          <section class="card is-small is-narrow p-5">
            <div
              class="field has-addons is-pulled-right"
              style="color: #123c69"
            >
              <button class="button">ดูหนังสือทั้งหมด</button>
            </div>
            <h1>หนังสือล่าสุด</h1>
            <div class="divider is-info" style="color: #123c69">
              Latest Book
            </div>
            <div class="columns">
              <div class="column" v-for="(value, index) in books" :key="index">
                <div class="card" style="width: 220px">
                  <router-link :to="`/DetailsBook/${value.book_id}`">
                    <div class="card-image" style="width: 220px">
                      <figure class="image is-square">
                        <img :src="value.image" />
                      </figure>
                    </div>

                    <div class="card-content" style="min-height: 150px">
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
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar";
import MyCarosel from "@/components/MyCarosel";
import axios from "axios";

export default defineComponent({
  name: "HomeView",
  components: {
    NavBar,
    MyCarosel,
  },

  data() {
    return {
      books: [],
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

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          "https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/book"
        );
        const data = response.data;

        data.sort(function (a, b) {
          // แปลงวันที่เป็นเลข
          const dateA = new Date(a.Date).getTime();
          const dateB = new Date(b.Date).getTime();
          // เปรียบเทียบวันที่
          return dateB - dateA;
        });
        this.books = data.slice(0, 5);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
  <style>
@import "~@creativebulma/bulma-divider";
.field.has-addons.is-pulled-right {
  margin-top: -0.5rem;
  margin-right: 0.5rem;
}

.divider.is-info {
  margin-left: 0.5rem;
}
</style>

