<template>
  <div>
    <NavBar />
    <div class="container is-max-widescreen">
      <h2 class="subtitle">ค้นหาหนังสือ</h2>
      <!--######### tab ค้นหา #########-->
      <div class="tabs is-boxed">
        <ul>
          <li :class="[number == 1 ? 'is-active' : '']" @click="changeTab('ทั้งหมด', 1)">
            <a>
              <span>ทั้งหมด</span>

            </a>
          </li>
          <li :class="[number == 2 ? 'is-active' : '']" @click="changeTab('ประเภท', 2)">
            <a>
              <span>ประเภท</span>
            </a>
          </li>
          <li :class="[number == 3 ? 'is-active' : '']" @click="changeTab('ชื่อหนังสือ', 3)">
            <a>
              <span>ชื่อหนังสือ</span>
            </a>
          </li>
          <li :class="[number == 4 ? 'is-active' : '']" @click="changeTab('นักเขียน', 4)">
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
            <input v-model="search" class="input is-rounded" type="text" :placeholder="typeTab" />
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
        <!--######### BTN NEXT && BACK #########-->
        <div class="field next_or_back has-addons">
          <button class="button is-primary is-outlined" disabled>
            <i
              class="fa fa-arrow-left"
              aria-hidden="true"
            ></i>
          </button>
          <h2 class="textPage mt-2 mx-2">หน้าที่ 1</h2>
          <button class="button is-primary is-outlined">
            <i
              class="fa fa-arrow-right"
              aria-hidden="true"
            ></i>
          </button>

        </div>
        <section class="card is-small is-narrow p-5">
          <div class="columns">
            <div class="column is-one-fifth" v-for="(value, index) in books" :key="index">
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
                        By {{ value.authorName }}
                      </p>
                      <p class="is-size-7" style="color: #bab2b5">
                        Date {{ value.Date }}
                      </p>
                    </div>
                  </div>
                </div>
                </router-link>
                <div class="level ml-2">
                  ฿ {{ value.price }}
                  <button class="button is-ghost level-right">
                    <i class="fa fa-cart-plus is-size-4" style="color: #edc7b7" aria-hidden="true"></i>
                  </button>
                  <!-- <span style="color: #edc7b7">มีแล้ว</span> -->
                </div>
              </div>
            </div>
          </div>

          <!--######### BTN NEXT && BACK #########-->
          <div class="field next_or_back has-addons">
              <button class="button is-primary is-outlined" disabled>
                <i
                  class="fa fa-arrow-left"
                  aria-hidden="true"
                ></i>
              </button>
              <h2 class="textPage mt-2 mx-2">หน้าที่ 1</h2>
              <button class="button is-primary is-outlined">
                <i
                  class="fa fa-arrow-right"
                  aria-hidden="true"
                ></i>
              </button>

            </div>
        </section>

      </div>

      <!-- <div class="container" v-for="(valueallbooks, indexallbooks) in books" :key="indexallbooks">
        <div>{{ valueallbooks.book_id }}</div>
      </div> -->
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";


export default {
  name: "SearchBook",
  components: {
    NavBar,
  },
  data() {
    return {
      search: "",
      number: 1,
      typeTab: "ค้นหา ทั้งหมด",
      books: [
        {
          book_id: 1,
          title: "มุมมองนักอ่าน",
          authorName: "ฉันเอง",
          type: {
            SS: ["fantasy", "horror", "action", "comedy"],
          },
          image: "https://bulma.io/images/placeholders/128x128.png",
          price: 10,
        },
        {
          book_id: 2,
          title: "มุมมองนักอ่าน2",
          authorName: "ฉันเอง",
          type: {
            SS: ["fantasy", "horror", "action", "comedy"],
          },
          image: "https://bulma.io/images/placeholders/128x128.png",
          price: 10,
        },
        {
          book_id: 3,
          title: "มุมมองนักอ่าน3",
          authorName: "ฉันเอง",
          type: {
            SS: ["fantasy", "horror", "action", "comedy"],
          },
          image: "https://bulma.io/images/placeholders/128x128.png",
          price: 10,
        },
        {
          book_id: 4,
          title: "มุมมองนักอ่าน4",
          authorName: "ฉันเอง",
          type: {
            SS: ["fantasy", "horror", "action", "comedy"],
          },
          image: "https://bulma.io/images/placeholders/128x128.png",
          price: 10,
        },
        {
          book_id: 5,
          title: "มุมมองนักอ่าน5",
          authorName: "ฉันเอง",
          type: {
            SS: ["fantasy", "horror", "action", "comedy"],
          },
          image: "https://bulma.io/images/placeholders/128x128.png",
          price: 10,
        },
        {
          book_id: 6,
          title: "มุมมองนักอ่าน6",
          authorName: "ฉันเอง",
          type: {
            SS: ["fantasy", "horror", "action", "comedy"],
          },
          image: "https://bulma.io/images/placeholders/128x128.png",
          price: 10,
        },
        {
          book_id: 7,
          title: "มุมมองนักอ่าน7",
          authorName: "ฉันเอง",
          type: {
            SS: ["fantasy", "horror", "action", "comedy"],
          },
          image: "https://bulma.io/images/placeholders/128x128.png",
          price: 10,
        },
        {
          book_id: 8,
          title: "มุมมองนักอ่าน8",
          authorName: "ฉันเอง",
          type: {
            SS: ["fantasy", "horror", "action", "comedy"],
          },
          image: "https://bulma.io/images/placeholders/128x128.png",
          price: 10,
        },
        {
          book_id: 9,
          title: "มุมมองนักอ่าน9",
          authorName: "ฉันเอง",
          type: {
            SS: ["fantasy", "horror", "action", "comedy"],
          },
          image: "https://bulma.io/images/placeholders/128x128.png",
          price: 10,
        },
        {
          book_id: 10,
          title: "มุมมองนักอ่าน10",
          authorName: "ฉันเอง",
          type: {
            SS: ["fantasy", "horror", "action", "comedy"],
          },
          image: "https://bulma.io/images/placeholders/128x128.png",
          price: 10,
        },
      ],
    };
  },
  methods: {
    getProducts() {

    },
    changeTab(text, num) {
      this.typeTab = "ค้นหา " + text;
      this.number = num;
    }
  },
};
</script>
<style>
body {
  background: #F7F9FB;
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