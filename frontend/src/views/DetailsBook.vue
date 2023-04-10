<template>
  <div>
    <NavBar />
    <div>
      <div class="hero is-fullheight">
        <div id="detail_card" class="container p-6">
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
                <span id="text_color">12/03/2566</span>
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
                    <i
                      class="fa fa-shopping-bag fas fa-lg"
                      aria-hidden="true"
                    ></i>
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

                <!-- ส่วน icon ติดตาม -->
                <div id="icon_area" v-if="checkfollow">
                  <button
                    id="icon_plus_active"
                    class="button is-rounded"
                    @click="iconFollIsActive()"
                  >
                    <i
                      class="fa fa-plus-circle fas fa-lg"
                      aria-hidden="true"
                    ></i>
                  </button>
                  <p id="text_plus_active" class="help">ติดตาม</p>
                </div>
                <div id="icon_area" v-else>
                  <button
                    id="icon_plus"
                    class="button is-rounded"
                    @click="iconFoll()"
                  >
                    <i
                      class="fa fa-plus-circle fas fa-lg"
                      aria-hidden="true"
                    ></i>
                  </button>
                  <p id="text_plus" class="help">ติดตาม</p>
                </div>
              </div>

              <!-- ######## ส่วน Btn ซื้อ ########-->
              <div id="btn_buy" class="field has-addons mt-5">
                <div class="button is-large is-primary is-rounded mr-3">
                  ซื้อ {{ book[0].price }} บาท
                </div>
              </div>

              <br />
              <!-- <div v-show="
                this.checkadmin.length == 0 &&
                this.book[0].status == 'succeed'
              ">
                <div class="level-centere" v-if="
                  this.totalBook.find((x) => x.book_id == book[0].id) ===
                  undefined
                ">
                  <a class="button is-medium is-info is-outlined" @click="cardpush(book[0])">
                    เพิ่มลงในตะกร้า
                  </a>
                </div>
                <div class="level-centere" v-else>
                  <a class="button is-medium is-info is-outlined" disabled>
                    มีหนังสือเล่มนี้แล้ว
                  </a>
                </div>
              </div> -->
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
      <div class="container is-fullheight mb-5">
        <div id="main_review" class="card">
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
            >
              ส่งรีวิว
            </div>
          </div>
        </div>
      </div>

      <!--######## ส่วน show review all #######-->
      <div class="container is-max-desktop px-5 mb-5">
        <p class="is-size-3">รีวิวทั้งหมด</p>
        <!-- แสดง รีวิว -->
        <div class="box mt-4">
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img
                  class="is-rounded"
                  src="https://bulma.io/images/placeholders/128x128.png"
                  alt="Image"
                />
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>John Smith</strong><br />
                  <small id="date_review" class="help mb-3"
                    >วันที่ 9/4/66 : 19.45 น.</small
                  >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean efficitur sit amet massa fringilla egestas. Nullam
                  condimentum luctus turpis. Lorem, ipsum dolor sit amet
                  consectetur adipisicing elit. Esse incidunt ipsum iusto
                  assumenda ad molestiae aliquam, doloremque inventore minus
                  natus nesciunt! Neque porro cum eligendi ullam aliquam,
                  veritatis culpa ab?
                </p>
              </div>
            </div>
          </article>
        </div>
        <div class="box mt-4">
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img
                  class="is-rounded"
                  src="https://bulma.io/images/placeholders/128x128.png"
                  alt="Image"
                />
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>John Smith</strong><br />
                  <small id="date_review" class="help mb-3"
                    >วันที่ 9/4/66 : 19.45 น.</small
                  >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean efficitur sit amet massa fringilla egestas. Nullam
                  condimentum luctus turpis. Lorem, ipsum dolor sit amet
                  consectetur adipisicing elit. Esse incidunt ipsum iusto
                  assumenda ad molestiae aliquam, doloremque inventore minus
                  natus nesciunt! Neque porro cum eligendi ullam aliquam,
                  veritatis culpa ab?
                </p>
              </div>
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
      checkfollow: false,
      reviewText: "",
      book_id: 1,
    };
  },
  created() {
    this.fetchData(this.$route.params.id);
  },
  methods: {
    async fetchData(id) {
      try {
        axios
          .get(
            `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/detailbook?book_id=${id}`
          )
          .then((response) => {
            this.book = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    iconBagIsActive() {
      this.checkBag = false;
      this.book[0].want_have = false;
    },
    iconBag() {
      this.checkBag = true;
      this.book[0].want_have = true;
    },
    iconFoll() {
      this.checkfollow = true;
      this.book[0].follow = true;
    },
    iconFollIsActive() {
      this.checkfollow = false;
      this.book[0].follow = false;
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
  width: 70%;
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

#icon_plus_active {
  color: #ffeff3;
  background: #ff4974;
}

#text_plus_active {
  color: #ff3c3c;
}

#icon_plus {
  color: #003478;
  background: #0063ba2d;
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