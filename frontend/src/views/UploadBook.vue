<template>
  <div>
    <NavBar />

    <div class="container is-max-widescreen px-6">
      <section class="card is-small is-narrow p-5">
        <span class="title"> อัปโหลดหนังสือ </span>

        <div class="container p-5">
          <label class="label">เนื้อหาหนังสือ pdf file</label>

          <div class="file is-boxed mb-5">
            <label class="file-label is-boxed">
              <input
                type="file"
                ref="filestoryInput"
                class="is-hidden"
                @change="onFileChangestory"
              />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label"> Choose a book Story </span>
              </span>
              <span class="file-name" v-if="filestory">
                {{ filestory.name }}
              </span>
            </label>
          </div>
          <div>
            <label class="label">ปกหนังสือ</label>
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
                <span class="file-label"> Choose a book cover </span>
              </span>
              <span class="file-name" v-if="file">
                {{ file.name }}
              </span>
            </label>
          </div>
          <div class="field mt-5">
            <label class="label">ชื่อหนังสือ</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="ชื่อหนังสือ"
                v-model="title"
              />
            </div>
          </div>
          <div class="field mt-5">
            <label class="label">รายละเอียดหนังสือ</label>
            <div class="control">
              <textarea
                class="textarea"
                placeholder="รายละเอียดหนังสือ"
                v-model="desc"
              ></textarea>
            </div>
          </div>

          <div class="field mt-5">
            <label class="label">ราคา</label>
            <div class="control">
              <input
                class="input"
                type="number"
                placeholder="ราคา"
                v-model.number="price"
              />
            </div>
          </div>

          <div class="field mt-5">
            <label class="label">เลือกประเภท</label>
            <div class="control">
              <div class="select">
                <select v-model="type">
                  <option
                    v-for="(type, index) in types"
                    :key="index"
                    :value="type"
                  >
                    <span v-if="!typechocie.includes(String(type))">{{
                      type
                    }}</span>
                  </option>
                </select>
              </div>
              <button class="button is-link is-outlined ml-2" @click="addType">
                <span class="icon is-small">
                  <i class="fas fa-plus"></i>
                </span>
              </button>
              <button
                class="button is-link is-outlined ml-2"
                v-for="(type, index) in typechocie"
                :key="index"
                @click="removeType(index)"
              >
                {{ type }}
                <span class="icon is-small ml-1">
                  <i class="fas fa-times"></i>
                </span>
              </button>
            </div>
          </div>
          <button class="button is-primary is-fullwidth mt-6" @click="submit">
            Submit
          </button>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar";
import { storage } from "../firebase/firebaseDB";
import axios from "axios";

export default {
  name: "UploadBook",
  components: {
    NavBar,
  },

  data() {
    return {
      filestory: null,
      file: null,
      title: "",
      desc: "",
      price: 0,
      point: 0,
      type: "fantasy",
      types: ["action", "fantasy", "si-fi", "comedy", "drama", "romance"],
      typechocie: [],
      id: null,
      userdata: [],
      mybook: [],
    };
  },

  mounted() {
    // ดึงค่า id จาก LocalStorage เมื่อ component ถูกโหลด
    this.id = localStorage.getItem("id");
    this.getuser();
  },

  methods: {
    async getuser() {
      try {
        axios
          .get(
            `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/user?id=${String(
              this.id
            )}`
          )
          .then((response) => {
            this.userdata = response.data;
            this.penname = this.userdata[0].username;
            console.log(this.userdata);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    addType() {
      this.typechocie.push(this.type);
    },
    removeType(index) {
      this.typechocie.splice(index, 1);
    },
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    onFileChangestory(event) {
      this.filestory = event.target.files[0];
    },
    async submit() {
      if (
        (this.filestory == null || this.file == null || this.title == "",
        this.desc == "" || this.typechocie == [])
      ) {
        alert("กรุณากรอกข้อมูลให้ครบ");
      } else {
        try {
          alert("Upload wait!");

          // สร้าง reference ของไฟล์ที่จะอัปโหลด
          const storageRef = storage.ref();
          const fileRef = storageRef.child(this.file.name);
          await fileRef.put(this.file);

          const downloadURL = await fileRef.getDownloadURL();

          const storageRef2 = storage.ref();
          const fileRef2 = storageRef2.child(this.filestory.name);
          await fileRef2.put(this.filestory);

          const downloadURL2 = await fileRef2.getDownloadURL();

          const currentDate = new Date().toISOString().slice(0, 10);
          const point = this.price / 2;

          axios
            .post(
              "https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/book",
              {
                title: this.title,
                type: this.typechocie,
                price: this.price,
                point: point,
                penname: this.penname,
                Date: currentDate,
                desc: this.desc,
                image: downloadURL,
                story: downloadURL2,
                id: String(this.id),
              }
            )
            .then(() => {
              // แสดงข้อความแจ้งเตือนและล้างข้อมูลทั้งหมด
              this.title = "";
              this.desc = "";
              this.price = 0;
              this.penname = "";
              this.typechocie = "";
              this.$refs.fileInput.value = null;
              this.$refs.filestoryInput.value = null;
              this.filestory = null;
              this.file = null;
              alert("Upload success!");
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (err) {
          console.error(err);
          alert("Upload failed!");
        }
      }
    },
  },
};
</script>