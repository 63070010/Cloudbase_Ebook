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
import axios from "axios";

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
        const formData = new FormData();
        formData.append("file", this.file);

        // Upload file to S3
        const response = await axios.post("YOUR_UPLOAD_URL", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const { data } = response;
        const fileLocation = data.fileLocation;

        // Save file location to DynamoDB
        const params = {
          id: "USER_ID",
          profile: fileLocation,
        };
        await axios.post("YOUR_DYNAMODB_API_URL", params);

        // Clear the file input
        this.file = null;
        this.$refs.fileInput.value = null;

        alert("Upload success!");
      } catch (err) {
        console.error(err);
        alert("Upload failed!");
      }
    },
  },
};
</script>