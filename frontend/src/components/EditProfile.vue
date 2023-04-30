<template>
  <!-- display: none; -->
  <div>
    <nav
      @click="Edit_profile = true"
      class="button is-rounded is-medium is-fullwidth"
      style="width: 350px; height: 55px; background-color: #31708e"
    >
      <span class="mt-2" style="color: #f7f9fb">แก้ไขโปรไฟล์</span>
    </nav>
    <div class="modal" :class="{ 'is-active': Edit_profile }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <button
          class="modal-close is-large"
          aria-label="close"
          @click="Edit_profile = false"
        ></button>

        <section class="modal-card-body">
          <div class="field">
            <span
              class="label is-size-4"
              style="color: #8fc1e3; text-align: center"
            >
              รายละเอียดโปรไฟล์
            </span>
          </div>
          <div class="field">
            <label class="label" style="color: #8fc1e3">รูปโปรไฟล์</label>
            <div class="file">
              <label class="file-label">
                <input class="file-input" type="file" name="comment_image" />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label"> Choose an image</span>
                </span>
              </label>
            </div>
          </div>

          <div class="field">
            <label class="label" style="color: #8fc1e3">อีเมล</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-medium is-rounded"
                type="text"
                v-model="Email"
                style="background-color: #f7f9fb"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>

          <div class="field-body">
            <div class="field">
              <label class="label" style="color: #8fc1e3">เบอร์โทรศัพท์</label>
              <input
                class="input is-medium is-rounded"
                type="text"
                v-model="PhoneNumber"
                style="background-color: #f7f9fb"
              />
            </div>

            <div class="field">
              <label class="label" style="color: #8fc1e3">เพศ</label>

              <div class="select is-fullwidth is-medium is-rounded">
                <select v-model="Sex" style="background-color: #f7f9fb">
                  <option value="Male">ชาย</option>
                  <option value="Famale">หญิง</option>
                  <option value="not_specified">ไม่ระบุ</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field-body">
            <div class="field">
              <label class="label" style="color: #8fc1e3"
                >ช่องทางการรับเงิน</label
              >
              <input
                class="input is-medium is-rounded"
                type="text"
                v-model="BankName"
                style="background-color: #f7f9fb"
              />
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <div
            class="control has-text-centered"
            style="width: 400px; height: 55px"
          >
            <button
              class="button is-rounded is-medium"
              style="color: #f7f9fb; background-color: #31708e"
              @click="submit"
            >
              บันทึกข้อมูล
            </button>
          </div>
          <div class="control has-text-centered">
            <button
              class="button is-rounded is-medium"
              style="color: #f7f9fb; background-color: #f16363"
              @click="Edit_profile = false"
            >
              ยกเลิก
            </button>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "EditProfile",
  data() {
    return {
      Edit_profile: false,
      PhoneNumber: "",
      BankName: "",
      Email: "",
      Sex: "",
    };
  },
  methods: {
    handleFileChange(event) {
      // ตรวจสอบว่ามีไฟล์ถูกเลือกหรือไม่
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        console.log("File name:", file.name);
        console.log("File type:", file.type);
        console.log("File size:", file.size);

        const formData = new FormData();
        formData.append("file", file);
        console.log(file);
      }
    },
  },
};
</script>