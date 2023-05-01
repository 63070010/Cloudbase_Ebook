<template>
  <div>
    <NavBar />
    <!-- ### ส่วน add Event ### -->
    <div class="container is-max-widescreen px-6">
      <h2 class="subtitle">เพิ่มกิจกรรม</h2>
      <section class="card is-small is-narrow p-5">
        <div class="container p-5">
          <div class="file is-centered is-boxed has-name mb-5">
            <label class="file-label">
              <input
                type="file"
                ref="fileInput"
                class="is-hidden"
                @change="onFileChange"
              />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label"> Choose a file… </span>
              </span>
              <span class="file-name" v-if="file">
                {{ file.name }}
              </span>
            </label>
          </div>
          <div class="field mt-5">
            <label class="label">หัวข้อกิจกรรม</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="ชื่อกิจกรรม"
                v-model="title"
              />
            </div>
          </div>
          <div class="field mt-5">
            <label class="label">รายละเอียด</label>
            <div class="control">
              <textarea
                class="textarea"
                placeholder="รายละเอียด"
                v-model="desc"
              ></textarea>
            </div>
          </div>
          <button
            class="button is-primary is-fullwidth mt-6"
            @click="submitFile"
          >
            Add Event
          </button>
        </div>
      </section>
    </div>

    <!-- ### ส่วน search ### -->
    <div class="container is-max-widescreen">
      <h2 class="subtitle">ค้นหาหนังสือ</h2>
      <!--######### tab ค้นหา #########-->
      <div class="tabs is-boxed">
        <ul>
          <li
            :class="[number == 1 ? 'is-active' : '']"
            @click="changeTab('ชื่อหนังสือ', 1)"
          >
            <a>
              <span>ชื่อหนังสือ</span>
            </a>
          </li>
          <li
            :class="[number == 2 ? 'is-active' : '']"
            @click="changeTab('ประเภท', 2)"
          >
            <a>
              <span>ประเภท</span>
            </a>
          </li>
          <li
            :class="[number == 3 ? 'is-active' : '']"
            @click="changeTab('นักเขียน', 3)"
          >
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
            <input
              v-model="search"
              class="input is-rounded"
              type="text"
              :placeholder="typeTab"
            />
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
        <section class="card is-small is-narrow p-5">
          <div class="columns">
            <div
              class="column is-one-fifth"
              v-for="(value, index) in paginatedBooks"
              :key="index"
            >
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
                          By {{ value.penname }}
                        </p>
                        <p class="is-size-7" style="color: #bab2b5">
                          Date {{ value.Date }}
                        </p>
                      </div>
                    </div>
                  </div>
                </router-link>
                <br />
                <div
                  class="level ml-2 mt-6"
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <div
                    id="icon_area"
                    v-if="!eventbook.includes(String(value.book_id))"
                  >
                    <button
                      id="icon_bag"
                      class="button is-rounded"
                      @click="iconAddIsActive(value)"
                    >
                      <i class="fa fa-plus" aria-hidden="true"></i>
                    </button>
                    <p id="text_bag" class="help">เพิ่มหนังสือลงกิจกรรมแล้ว</p>
                  </div>
                  <div id="icon_area" v-else>
                    <button
                      id="icon_bag_active"
                      class="button is-rounded"
                      @click="iconAdd(value)"
                    >
                      <i class="fa fa-plus" aria-hidden="true"></i>
                    </button>
                    <p id="text_bag_active" class="help">
                      เพิ่มหนังสือลงกิจกรรม
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--######### BTN NEXT && BACK #########-->
          <div
            class="field next_or_back has-addons"
            style="display: flex; justify-content: center; align-items: center"
          >
            <button
              v-if="this.currentPage == 1"
              disabled
              class="button is-primary is-outlined"
            >
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </button>
            <button
              v-else
              class="button is-primary is-outlined"
              v-on:click="backPage"
            >
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </button>
            <h2 class="textPage mt-2 mx-2">หน้าที่ {{ this.currentPage }}</h2>
            <button
              v-if="this.lastpage > this.currentPage"
              v-on:click="nextPage"
              class="button is-primary is-outlined"
            >
              <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
            <button v-else disabled class="button is-primary is-outlined">
              <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
        </section>
      </div>
      <br />
    </div>

    <br />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import axios from "axios";
import { storage } from "../firebase/firebaseDB";

export default {
  name: "Admin_AddEvent",
  components: {
    NavBar,
  },
  created() {
    this.fetchData();
  },
  data() {
    return {
      search: "",
      number: 1,
      typeTab: "ค้นหา ทั้งหมด",
      books: [],
      currentPage: 1,
      lastpage: 1,
      cart: [],
      totalprice: 0,
      bookincart: [],
      bookshelf: [],
      id: 1,
      type: "ชื่อหนังสือ",
      keepbook: [],
      title: "",
      desc: "",
      book_id: [],
      eventbook: [],
      file: null,
    };
  },
  computed: {
    paginatedBooks() {
      const startIndex = (this.currentPage - 1) * 5;
      const endIndex = startIndex + 5;
      return this.books.slice(startIndex, endIndex);
    },
  },
  methods: {
    async fetchData() {
      try {
        axios
          .get(
            "https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/book"
          )
          .then((response) => {
            this.books = response.data;
            this.keepbook = response.data;
            this.lastpage = response.data.length / 5;
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    nextPage() {
      this.currentPage++;
    },
    backPage() {
      this.currentPage--;
    },
    getProducts() {
      if (this.search == "") {
        this.books = this.keepbook;
      } else if (this.type == "ชื่อหนังสือ") {
        try {
          axios
            .get(
              `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/search?title=${this.search}`
            )
            .then((response) => {
              this.books = response.data;
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        } catch (error) {
          console.log(error);
        }
      } else if (this.type == "ประเภท") {
        try {
          axios
            .get(
              `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/search?type=${this.search}`
            )
            .then((response) => {
              this.books = response.data;
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        } catch (error) {
          console.log(error);
        }
      } else if (this.type == "นักเขียน") {
        try {
          axios
            .get(
              `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/search?penname=${this.search}`
            )
            .then((response) => {
              this.books = response.data;
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
    changeTab(text, num) {
      this.type = text;
      this.typeTab = "ค้นหา " + text;
      this.number = num;
    },

    iconAddIsActive(event) {
      this.eventbook.push(String(event.book_id));
      console.log(this.eventbook);
    },
    iconAdd(event) {
      this.eventbook = this.eventbook.filter(
        (item) => item !== String(event.book_id)
      );

      console.log(this.eventbook);
    },
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    async submitFile() {
      if (this.title == "" || this.desc == "" || this.file == null) {
        alert("กรุณากรอกข้อมูล");
      } else {
        const storageRef = storage.ref();
        const fileRef = storageRef.child(this.file.name);
        await fileRef.put(this.file);

        const downloadURL = await fileRef.getDownloadURL();
        console.log(downloadURL);

        if (this.eventbook.length == 0) {
          this.eventbook = ["0"];
        }
        console.log(this.eventbook);
        axios
          .post(
            "https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/getevent",
            {
              title: this.title,
              desc: this.desc,
              book_id: this.eventbook,
              image: downloadURL,
            }
          )
          .then(() => {
            // แสดงข้อความแจ้งเตือนและล้างข้อมูลทั้งหมด
            this.title = "";
            this.desc = "";
            this.eventbook = [];
            this.file = null;
            this.$refs.fileInput.value = null;
            alert("Upload success!");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
<style>
body {
  background: #f7f9fb;
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
  /* position: relative; */
}

.search_field {
  width: 100%;
}

.search_input {
  width: 100%;
}

#taball {
  position: relative;
  padding-top: 5px;
}
#tab-search {
  position: absolute;
  right: 0;
  bottom: 5px;
}

.next_or_back {
  width: 100%;
  padding-left: 82%;
}

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
</style>