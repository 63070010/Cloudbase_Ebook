<template>
  <div>
    <NavBar />
    <!-- ### ส่วน add item ### -->
    <div class="container is-max-widescreen px-6">
      <h2 class="subtitle">เพิ่ม item</h2>
      <section class="card is-small is-narrow p-5">
        <div class="container p-5">
          <div class="file is-centered is-boxed has-name mb-5">
            <label class="file-label">
              <input
                class="file-input"
                type="button"
                value="Choose a file"
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
              <input class="input" type="text" placeholder="ชื่อกิจกรรม" v-model="title">
            </div>
          </div>
          <div class="field mt-5">
            <label class="label">รายละเอียด</label>
            <div class="control">
              <textarea class="textarea" placeholder="รายละเอียด" v-model="desc"></textarea>
            </div>
          </div>
          <button
            class="button is-primary is-fullwidth mt-6"
            @click="submitFile"
          >
            Add Item
          </button>
        </div>
      </section>
    </div>

    <br />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import axios from "axios";

export default {
  name: "Admin_AddItem",
  components: {
    NavBar,
  },
  created() {
    this.fetchData();
  },
  data() {
    return {
      title: '',
      desc: '',
    };
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

</style>