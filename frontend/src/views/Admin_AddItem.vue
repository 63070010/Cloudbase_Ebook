<template>
  <div>
    <NavBar />
    <!-- ### ส่วน add item ### -->
    <div class="container is-max-widescreen px-6">
      <h2 class="subtitle">เพิ่มของแลกคะแนนแต้มสะสม</h2>
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
            <label class="label">ชื่อของแลกแต้มสะม</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="ชื่อของแลกแต้มสะม"
                v-model="title"
              />
            </div>
          </div>
          <div class="field mt-5">
            <label class="label">ใช้แต้มคะแนน</label>
            <input
              class="input"
              type="number"
              placeholder="คะแนน"
              v-model="point"
            />
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
import { storage } from "../firebase/firebaseDB";

export default {
  name: "Admin_AddItem",
  components: {
    NavBar,
  },
  data() {
    return {
      title: "",
      desc: "",
      point: 0,
      file: null,
    };
  },
  methods: {
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

        axios
          .post(
            "https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/item",
            {
              title: this.title,
              desc: this.desc,
              point: this.point,
              image: downloadURL,
            }
          )
          .then(() => {
            // แสดงข้อความแจ้งเตือนและล้างข้อมูลทั้งหมด
            this.title = "";
            this.desc = "";
            this.point = 0;
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