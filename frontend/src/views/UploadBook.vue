<template>
  <div>
    <NavBar />
    <div class="hero is-fullheight">
      <div class="hero is-fullheight">
        <div class="container mb-4">
          <input
            type="file"
            @change="onFileChange"
            ref="fileInput"
            class="is-hidden"
          />
          <div class="file is-centered is-boxed has-name">
            <label class="file-label">
              <input
                class="file-input"
                type="button"
                @click="$refs.fileInput.click()"
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
          <button
            class="button is-primary is-fullwidth mt-4"
            :disabled="!file"
            @click="submitFile"
          >
            Upload and Submit
          </button>
        </div>
      </div>
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