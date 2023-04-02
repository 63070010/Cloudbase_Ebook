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
                placeholder="กรอกชื่อผู้ใช้"
                style="background-color: #eee2dc"
                v-model="state.username"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              <span
                v-for="error in v$.username.$errors"
                :key="error.$uid"
                class="has-text-danger"
              >
                {{ error.$message }}
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label" style="color: #ac3b61">รหัสผ่าน</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-medium is-rounded"
                type="text"
                placeholder="กรอกรหัสผ่าน"
                v-model="state.password"
                style="background-color: #eee2dc"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-key"></i>
              </span>
              <span
                v-for="error in v$.password.$errors"
                :key="error.$uid"
                class="has-text-danger"
              >
                {{ error.$message }}
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label" style="color: #ac3b61">ยืนยัน รหัสผ่าน</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-medium is-rounded"
                type="text"
                placeholder="กรอกรหัสผ่านอีกครั้ง"
                v-model="state.confirm_password"
                style="background-color: #eee2dc"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-key"></i>
              </span>
              <span
                v-for="error in v$.confirm_password.$errors"
                :key="error.$uid"
                class="has-text-danger"
              >
                {{ error.$message }}
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label" style="color: #ac3b61">อีเมล</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-medium is-rounded"
                type="email"
                placeholder="กรอกอีเมล"
                v-model="state.email"
                style="background-color: #eee2dc"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span
                v-for="error in v$.email.$errors"
                :key="error.$uid"
                class="has-text-danger"
              >
                {{ error.$message }}
              </span>
            </div>
          </div>

          <div class="field-body">
            <div class="field">
              <label class="label" style="color: #ac3b61">เบอร์โทรศัพท์</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  :disabled="disabled"
                  class="input is-medium is-rounded"
                  type="text"
                  placeholder="กรอกเบอร์โทรศัพท์"
                  v-model="state.mobile"
                  style="background-color: #eee2dc"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-phone"></i>
                </span>
                <span
                  v-for="error in v$.mobile.$errors"
                  :key="error.$uid"
                  class="has-text-danger"
                >
                  {{ error.$message }}
                </span>
              </div>
            </div>

            <div class="field">
              <label class="label" style="color: #ac3b61">เพศ</label>

              <div class="select is-fullwidth is-medium is-rounded">
                <select v-model="state.sex" style="background-color: #eee2dc">
                  <option value="Male">ชาย</option>
                  <option value="Famale">หญิง</option>
                  <option value="not_specified">ไม่ระบุ</option>
                </select>
              </div>

              <span
                v-for="error in v$.sex.$errors"
                :key="error.$uid"
                class="has-text-danger"
              >
                {{ error.$message }}
              </span>
            </div>
          </div>
          <div class="field column">
            <div class="control has-text-centered">
              <button
                class="button is-rounded is-medium"
                style="color: #eee2dc; background-color: #ac3b61"
                @click="submit"
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
import useValidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  setup() {
    const state = reactive({
      username: "",
      password: "",
      confirm_password: "",
      email: "",
      mobile: "",
      sex: "",
    });
    const rules = computed(() => {
      return {
        username: { required, minLength: minLength(4) },
        password: { required, minLength: minLength(6) },
        confirm_password: { required, sameAs: sameAs(state.password) },
        email: { required, email },
        mobile: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(10),
        },
        sex: { required },
      };
    });

    const v$ = useValidate(rules, state);

    return {
      state,
      v$,
    };
  },
  methods: {
    submit() {
      this.v$.$validate();
      if (this.v$.$error) {
        alert("Form failed validation");
      } else {
        alert("Form successfully submitted.");
      }
    },
  },
};
</script>
<style>
</style>

