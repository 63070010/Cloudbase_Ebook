<template>
  <div>
    <NavBar />

    <div class="container is-max-widescreen px-6">
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
                placeholder="ชื่อกิจกรรม"
                v-model="title"
              />
            </div>
          </div>
          <div class="field mt-5">
            <label class="label">รายละเอียดหนังสือ</label>
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
            Add MyBooks
          </button>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar";
import { storage } from "../firebase/firebaseDB";

export default {
  name: "UploadBook",
  components: {
    NavBar,
  },

  data() {
    return {
      file: null,
    };
  },

  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
    },

    async submitFile() {
      try {
        // สร้าง reference ของไฟล์ที่จะอัปโหลด
        const storageRef = storage.ref();
        const fileRef = storageRef.child(this.file.name);
        await fileRef.put(this.file);

        const downloadURL = await fileRef.getDownloadURL();
        console.log(downloadURL);

        // แสดงข้อความแจ้งเตือนและล้างข้อมูลทั้งหมด
        alert("Upload success!");
        this.file = null;
        this.$refs.fileInput.value = null;
      } catch (err) {
        console.error(err);
        alert("Upload failed!");
      }
    },
  },
};
</script>