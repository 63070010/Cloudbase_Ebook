<template>
  <div>
    <section class="section hero is-fullheight">
      <div
        class="tile is-vertical is-4"
        style="margin-left: auto; margin-right: auto"
      >
        <div class="card column mt-6">
          <div class="field">
            <p
              class="label is-size-4"
              style="
                color: #123c69;
                text-align: center;
                border-bottom: 3px solid;
                width: 300px;
                margin: 0 auto;
              "
            >
              <br />
              สมัครสมาชิก E-Book
            </p>
          </div>

          <div class="field">
            <label class="label" style="color: #ac3b61">ชื่อผู้ใช้</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-medium is-rounded"
                type="text"
                style="background-color: #eee2dc"
                v-model="username"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label" style="color: #ac3b61">รหัสผ่าน</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-medium is-rounded"
                type="text"
                v-model="password"
                style="background-color: #eee2dc"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-key"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label" style="color: #ac3b61">ยืนยัน รหัสผ่าน</label>
            <input
              class="input is-medium is-rounded"
              type="text"
              v-model="confirm_password"
              style="background-color: #eee2dc"
            />
          </div>

          <div class="field">
            <label class="label" style="color: #ac3b61">อีเมล</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-medium is-rounded"
                type="email"
                v-model="email"
                style="background-color: #eee2dc"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>

          <div class="field-body">
            <div class="field">
                <label class="label" style="color: #ac3b61"
                  >เบอร์โทรศัพท์</label
                >
                <div class="control has-icons-left has-icons-right">
                <input
                  :disabled="disabled"
                  class="input is-medium is-rounded"
                  type="text"
                  v-model="mobile"
                  style="background-color: #eee2dc"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-phone"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <label class="label" style="color: #ac3b61">เพศ</label>

              <div class="select is-fullwidth is-medium is-rounded">
                <select v-model="sex" style="background-color: #eee2dc">
                  <option value="Male">ชาย</option>
                  <option value="Famale">หญิง</option>
                  <option value="not_specified">ไม่ระบุ</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field column">
            <div class="control has-text-centered">
              <button
                class="button is-rounded is-medium"
                style="color: #eee2dc; background-color: #ac3b61;"
                @click="submit()"
              >
                สมัครสมาชิก
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      confirm_password: "",
      email: "",
      mobile: "",
      first_name: "",
      last_name: "",
      sex: "",
      birthday: "",
    };
  },
};
</script>
<style>
</style>

