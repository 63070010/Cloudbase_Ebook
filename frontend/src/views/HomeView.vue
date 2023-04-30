  <template>
  <div>
    <NavBar />
    <MyCarosel />
    <div class="hero is-fullheight">
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
              <router-link
                :to="`/SearchBook/${nameevent[indexallbooks].engname}`"
              >
                <button class="button">ดูหนังสือทั้งหมด</button></router-link
              >
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

      <div class="container mb-4">
        <div class="column mt-4">
          <section class="card is-small is-narrow p-5">
            <div
              class="field has-addons is-pulled-right"
              style="color: #123c69"
            >
              <router-link :to="`/SearchBook/${nameevent[2].engname}`">
                <button class="button">ดูหนังสือทั้งหมด</button></router-link
              >
            </div>
            <h1 class="ml-4">{{ nameevent[2].thainame }}</h1>
            <div class="divider is-info" style="color: #123c69">
              {{ nameevent[2].engname }}
            </div>
            <div class="columns">
              <div
                class="column"
                v-for="(value, index) in Monthlybooks.slice(0, 5)"
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
                  <div class="level ml-2" v-if="userlist.includes(String(id))">
                    <router-link
                      :to="`/ReadBook/${value.book_id}`"
                      class="ml-6"
                    >
                      <button
                        class="button is-rounded mb-2"
                        style="
                          color: #f7f9fb;
                          background-color: #5085a5;

                          width: 150%;
                        "
                      >
                        Read
                      </button>
                    </router-link>
                  </div>
                  <div class="level ml-2" v-else>
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
        { thainame: "หนังสือขายดี", engname: "Bestseller" },
        { thainame: "หนังสือรายเดือน", engname: "Books for this month" },
      ],
      books: [],
      booksevent: [],
      cart: [],
      totalprice: 0,
      bookincart: [],
      bookshelf: [],
      totalpoint: 0,
      Monthlybooks: [],
      userlist: [],
      id: null,
    };
  },

  mounted() {
    // ดึงค่า id จาก LocalStorage เมื่อ component ถูกโหลด
    this.id = localStorage.getItem("id");
    this.fetchData();
    this.getcart();
    console.log(this.id);
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          "https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/book"
        );
        const data = response.data;

        const response2 = await axios.get(
          `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/book`
        );
        const monthly = await axios.get(
          `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/monthly`
        );
        const data2 = response2.data;

        // เรียงหนังสือรายเดือน
        const datamothly = monthly.data;
        this.checkmonthly = datamothly[0].Monthlybook.NS;
        this.userlist = datamothly[0].userlist.NS;

        this.Monthlybooks = data2.filter((item) => {
          return this.checkmonthly.includes(String(item.book_id));
        });

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

        this.books = [sortedByDate, sortedBySales];

        this.booksevent = data.reduce((result, current) => {
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
    async getcart() {
      if (this.id != null) {
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
      }
    },
    async cardpush(event) {
      if (this.id == null) {
        alert("กรุณาเข้าสู่ระบบหรือสมัครสมาชิก");
      } else {
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

