<template>
  <div>
    <NavBar />
    <div>
      <div class="hero is-fullheight">
        <div id="detail_card" class="container p-6" v-if="book.length > 0">
          <h1 class="title is-3 has-text-centered">
            {{ book[0].title }}
          </h1>
          <div class="columns">
            <!-- ######## ส่วน Image ########-->
            <div class="column is-6">
              <figure class="image">
                <img id="image_detail_book" :src="book[0].image" />
              </figure>
            </div>

            <!-- ######## ส่วน Detail ########-->
            <div class="column is-6">
              <p class="is-size-4">
                เขียนโดย :
                <span id="text_color">{{ book[0].penname }}</span>
              </p>
              <p class="is-size-4">
                วันที่วางขาย :
                <span id="text_color">{{ book[0].Date }}</span>
              </p>
              <p class="is-size-4">
                แต้มสะสม :
                <span id="text_color">{{ book[0].point }}</span>
              </p>
              <p class="is-size-4">คำโปรย :</p>
              <p class="is-size-5 mt-2 mb-4">
                <span id="text_color"> &emsp;&emsp;{{ book[0].desc }} </span>
              </p>

              <div
                class="field has-addons"
                v-for="(value, index) in book[0].type"
                :key="index"
              >
                <p class="is-size-4 mb-3 mr-3">ประเภท :</p>
                <button
                  v-for="(valueIn, indexIn) in value"
                  :key="indexIn"
                  class="button is-info is-light is-small mr-1 mb-2"
                >
                  {{ valueIn }}
                </button>
              </div>

              <!-- ######## ส่วน icon ########-->
              <div class="field has-addons line">
                <!-- ส่วน icon อยากได้ -->
                <div id="icon_area" v-if="checkBag">
                  <button
                    id="icon_bag_active"
                    class="button is-rounded"
                    @click="iconBagIsActive()"
                  >
                    <i class="fa fas fa-heart fas fa-lg" aria-hidden="true"></i>
                  </button>
                  <p id="text_bag_active" class="help">
                    เพิ่มในรายการที่ชอบแล้ว
                  </p>
                </div>
                <div id="icon_area" v-else>
                  <button
                    id="icon_bag"
                    class="button is-rounded"
                    @click="iconBag()"
                  >
                    <i class="fa fas fa-heart fas fa-lg" aria-hidden="true"></i>
                  </button>
                  <p id="text_bag" class="help">ชอบเรื่องนี้</p>
                </div>
                <!-- ส่วน icon บล็อก -->
                <div v-if="id == '0'">
                  <div id="icon_area" v-if="checkBlock">
                    <button
                      id="icon_bag_active"
                      class="button is-rounded"
                      @click="iconBlockIsActive()"
                    >
                      <i class="fa fa-ban fas fa-lg" aria-hidden="true"></i>
                    </button>
                    <p id="text_bag_active" class="help">บล็อกแล้ว</p>
                  </div>
                  <div id="icon_area" v-else>
                    <button
                      id="icon_bag"
                      class="button is-rounded"
                      @click="iconBlock()"
                    >
                      <i class="fa fa-ban fas fa-lg" aria-hidden="true"></i>
                    </button>
                    <p id="text_bag" class="help">บล็อก</p>
                  </div>
                </div>
              </div>

              <!-- ######## ส่วน Btn ซื้อ ########-->
              <div
                id="btn_buy"
                class="field has-addons mt-5"
                v-if="book.length > 0"
              >
                <div
                  class="button is-large is-primary is-rounded mr-3"
                  v-if="
                    !bookshelf.includes(String(book[0].book_id)) &&
                    !bookincart.includes(String(book[0].book_id))
                  "
                  @click="cardpush(book[0])"
                >
                  ซื้อ {{ book[0].price }} บาท
                </div>
                <div
                  v-else-if="bookincart.includes(String(book[0].book_id))"
                  class="button is-large is-primary is-rounded mr-3"
                >
                  หนังสืออยู่ในตะกร้า
                </div>
                <div v-else class="button is-large is-primary is-rounded mr-3">
                  มีหนังสือเล่มนี้แล้ว
                </div>
              </div>

              <br />
            </div>
          </div>
        </div>
        <div class="divider is-info is-size-6" style="color: #123c69">
          <router-link to="/" style="color: #123c69"
            >กลับไปเลือกซื้อหนังสือเพิ่ม</router-link
          >
        </div>
      </div>

      <!--######## ส่วน review ########-->
      <div class="container is-fullheight mb-5" v-if="user && user[0]">
        <div
          id="main_review"
          class="card"
          v-if="!checkuser.includes(String(user[0].id))"
        >
          <header id="head_review" class="card-header">
            <p class="card-header-title is-size-3 has-text-link-light">
              เขียนรีวิว
            </p>
          </header>
          <div
            id="content_review"
            class="card-content has-background-link-light"
          >
            <textarea
              class="textarea"
              placeholder="พิมพ์ความคิดเห็น..."
              v-model="reviewText"
            ></textarea>
            <div
              id="btn_review"
              class="button is-info is-rounded mt-5 is-size-5"
              @click="submit()"
            >
              ส่งรีวิว
            </div>
          </div>
        </div>

        <div id="main_review" class="card" v-else>
          <header id="head_review" class="card-header">
            <p class="card-header-title is-size-3 has-text-link-light">
              แก้ไข รีวิว
            </p>
          </header>
          <div
            id="content_review"
            class="card-content has-background-link-light"
          >
            <textarea
              class="textarea"
              placeholder="พิมพ์ความคิดเห็น..."
              v-model="reviewText"
            ></textarea>
            <div
              id="btn_review"
              class="button is-info is-rounded mt-5 is-size-5"
              @click="submitedit()"
            >
              ส่งรีวิว
            </div>
          </div>
        </div>
      </div>

      <!--######## ส่วน show review all #######-->
      <div class="container is-max-desktop px-5 mb-5" v-if="book.length > 0">
        <p class="is-size-3">รีวิวทั้งหมด</p>
        <!-- แสดง รีวิว -->
        <div
          class="box mt-4"
          v-for="(value, index) in this.reviewall"
          :key="index"
        >
          <article class="media" v-if="allcomments && allcomments[0]">
            <div class="media-left">
              <figure class="image is-64x64">
                <img class="is-rounded" :src="allcomments[index].profile" />
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong> {{ allcomments[index].username }} </strong><br />
                  <small id="date_review" class="help mb-3"></small>
                  {{ value }}
                </p>
              </div>
            </div>
            <div class="level-right" v-if="allcomments[index].id == id">
              <a class="level-item">
                <span class="icon is-small">
                  <i class="fa fa-user" style="color: #687864"></i>
                </span>
              </a>
            </div>
          </article>
        </div>

        <!--######### BTN NEXT && BACK #########-->
        <div id="field_back_next" class="field has-addons">
          <button class="button is-primary is-outlined" disabled>
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
          </button>
          <small class="mt-2 px-3">หน้าที่ 1</small>
          <button class="button is-primary is-outlined">
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import axios from "axios";

import NavBar from "@/components/NavBar";
export default defineComponent({
  name: "DetailsBook",
  components: {
    NavBar,
  },
  data() {
    return {
      book: [],
      cart: [],
      cart_item: [],
      pay: {},
      mybook: [],
      totalBook: [],
      checkadmin: [],
      checkBag: false,
      checkBlock: false,
      reviewText: "",
      bookshelf: [],
      bookincart: [],
      totalprice: 0,
      totalpoint: 0,
      alluser: [],
      allcomments: [],
      user: [],
      checkuser: [],
      rev_book: [],
      id: null,
      reviewall: [],
    };
  },
  mounted() {
    // ดึงค่า id จาก LocalStorage เมื่อ component ถูกโหลด
    this.id = localStorage.getItem("id");
    this.fetchData(this.$route.params.id);
    this.getcart();
    this.getuser();
  },

  methods: {
    async fetchData(id) {
      try {
        const response = await axios.get(
          `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/detailbook?book_id=${id}`
        );
        this.book = response.data;
        const responseuser = await axios.get(
          `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/alluser`
        );
        this.alluser = responseuser.data;
        this.checkuser = this.book[0].review_user.SS;
        this.reviewall = this.book[0].review.SS;
        this.reviewall = this.reviewall.filter((item) => item !== "");

        this.allcomments = this.alluser.filter((item) => {
          return this.checkuser.includes(String(item.id));
        });
        this.allcomments = this.allcomments.sort((a, b) => {
          return this.checkuser.indexOf(a.id) - this.checkuser.indexOf(b.id);
        });
      } catch (error) {
        console.log(error);
      }
    },

    async getuser() {
      if (this.id != null) {
        try {
          axios
            .get(
              `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/user?id=${this.id}`
            )
            .then((response) => {
              this.user = response.data;
              this.rev_book = this.user[0].rev_book.NS;
              this.fav_Book = this.user[0].fav_Book.NS;
              if (this.fav_Book.includes(String(this.book[0].book_id))) {
                this.checkBag = true;
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } catch (error) {
          console.log(error);
        }
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
    async submit() {
      this.reviewall.push(String(this.reviewText));
      this.checkuser.push(String(this.user[0].id));
      this.rev_book.push(String(this.book[0].book_id));
      this.allcomments = this.alluser.filter((item) => {
        return this.checkuser.includes(String(item.id));
      });
      this.allcomments = this.allcomments.sort((a, b) => {
        return this.checkuser.indexOf(a.id) - this.checkuser.indexOf(b.id);
      });
      this.reviewall = this.reviewall.filter((item) => item !== "");

      axios
        .put(
          "https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/detailbook",
          {
            id: String(this.id),
            review: this.reviewall,
            review_user: this.checkuser,
            rev_book: this.rev_book,
            book_id: this.book[0].book_id,
          }
        )
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
          console.log(111);
        });
    },
    async submitedit() {
      const index = this.allcomments.findIndex(
        (val) => val.id === String(this.id)
      );
      let oldVal = this.reviewall[index]; // ตัวแปรที่ต้องการเปลี่ยนค่า
      let newVal = this.reviewText; // ค่าใหม่ที่ต้องการเปลี่ยน
      this.reviewall = new Set(this.reviewall);

      if (this.reviewall.has(oldVal)) {
        let index = [...this.reviewall].indexOf(oldVal); // หาตำแหน่งของสมาชิกที่ต้องการเปลี่ยนค่า
        this.reviewall.delete(oldVal); // ลบสมาชิกที่ต้องการเปลี่ยนค่าออกจาก Set
        let newSet = new Set(
          [...this.reviewall]
            .slice(0, index)
            .concat(newVal, [...this.reviewall].slice(index))
        ); // เปลี่ยนค่าใน Set
        this.reviewall = newSet; // กำหนดค่า Set ใหม่
      }
      this.reviewall = [...this.reviewall];
      this.allcomments = this.alluser.filter((item) => {
        return this.checkuser.includes(String(item.id));
      });
      this.allcomments = this.allcomments.sort((a, b) => {
        return this.checkuser.indexOf(a.id) - this.checkuser.indexOf(b.id);
      });
      axios
        .put(
          "https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/detailbook",
          {
            id: String(this.id),
            review: this.reviewall,
            review_user: this.checkuser,
            rev_book: this.rev_book,
            book_id: this.book[0].book_id,
          }
        )
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    iconBagIsActive() {
      const check = String(this.book[0].book_id);
      this.checkBag = false;
      this.fav_Book = this.fav_Book.filter((item) => item !== check);
      console.log(this.fav_Book);
      axios
        .put(
          "https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/fav",
          {
            id: String(this.id),
            fav_Book: this.fav_Book,
          }
        )
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    iconBag() {
      if (this.id != null) {
        const check = String(this.book[0].book_id);
        this.checkBag = true;

        this.fav_Book.push(check);
        console.log(this.fav_Book);
        axios
          .put(
            "https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/fav",
            {
              id: String(this.id),
              fav_Book: this.fav_Book,
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
    iconBlockIsActive() {
      this.checkBlock = false;
    },
    iconBlock() {
      this.checkBlock = true;
    },
  },
});
</script>
<style>
/* .hero {
  background: #a56c6c;
} */
.line {
  border-bottom: 0.1px solid #3f638a36;
  padding-bottom: 10px;
}

#detail_card {
  background: #d1d6e8e6;
  width: 65%;
  border-radius: 50px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.351);
}

#image_detail_book {
  min-height: 500px;
  width: 90%;
}

#text_color {
  color: #418ba0ed;
}

#btn_buy {
  display: flex;
  justify-content: center;
}

#icon_area {
  text-align: center;
  margin-right: 10px;
}

#icon_bag_active {
  color: #ffeff3;
  background: #ff4974;
}

#text_bag_active {
  color: #ff3c3c;
}

#icon_bag {
  color: #003478;
  background: #0063ba2d;
}

#text_bag {
  color: #003478;
}

#text_plus {
  color: #003478;
}

#main_review {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  /* justify-content: center; */
}

#head_review {
  background: #0e5b7f;
}

#content_review {
  height: auto;
}

#btn_review {
  display: block;
}

#date_review {
  color: #4035a7b1;
}

#field_back_next {
  display: flex;
  justify-content: center;
}
</style>