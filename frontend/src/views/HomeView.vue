  <template>
  <div>
    <NavBar />
    <MyCarosel />
    <div class="columns hero is-fullheight">
      <div
        class="container mb-4"
        v-for="(valueallbooks, indexallbooks) in books"
        :key="indexallbooks"
      >
        <div class="column mt-4">
          <section class="card is-small is-narrow p-5">
            <div
              class="field has-addons is-pulled-right"
              style="color: #123c69"
            >
              <button class="button">ดูหนังสือทั้งหมด</button>
            </div>
            <h1 class="ml-4">{{ nameevent[indexallbooks].thainame }}</h1>
            <div class="divider is-info" style="color: #123c69">
              {{ nameevent[indexallbooks].engname }}
            </div>
            <div class="columns">
              <div
                class="column"
                v-for="(value, index) in valueallbooks.slice(0, 5)"
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

      <div
        class="container mb-4"
        v-for="(valueall, indexall) in booksevent"
        :key="indexall"
      >
        <div class="column mt-4">
          <section class="card is-small is-narrow p-5">
            <div
              class="field has-addons is-pulled-right"
              style="color: #123c69"
            >
              <button class="button">ดูหนังสือทั้งหมด</button>
            </div>
            <h1 class="ml-4">test</h1>
            <div class="divider is-info" style="color: #123c69">test</div>
            <div class="columns">
              <div
                class="column"
                v-for="(value, index) in valueall"
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
      nameevent: [
        { thainame: "หนังสือมาใหม่", engname: "Latest new books" },
        { thainame: "หนังสือขายดี", engname: "bestseller" },
      ],

      books: [],
      booksevent: [],
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
        const eventdata = response.data;

        // เรียงลำดับตามวันที่
        const sortedByDate = data.sort(function (a, b) {
          const dateA = new Date(a.Date).getTime();
          const dateB = new Date(b.Date).getTime();
          return dateB - dateA;
        });

        // สร้าง array ใหม่จาก data เดิมแล้วเรียงตามจำนวน sales
        const sortedBySales = [...data].sort(function (a, b) {
          return b.sales - a.sales;
        });

        // ส่งค่ากลับเป็น array 2 ตัว
        this.books = [sortedByDate, sortedBySales];

        this.booksevent = eventdata.reduce((result, current) => {
          if (current.eventname !== "") {
            // เพิ่มเงื่อนไขเช็คว่า eventname ไม่ใช่สตริงว่าง

            const index = result.findIndex(
              (item) =>
                item.length > 0 && item[0].eventname === current.eventname
            );
            if (index >= 0) {
              result[index].push(current);
            } else {
              result.push([current]);
            }
          }
          return result;
        }, []);
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

