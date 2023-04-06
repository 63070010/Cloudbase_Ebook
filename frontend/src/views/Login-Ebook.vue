<template>
  <div>
    <NavBar />

    <div>
      <section class="section hero is-fullheight">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-three-quarters">
              <div class="card column" style="width: 700px; margin-top: 120px">
                <div class="field has-text-centered">
                  <img style="height: 150px" alt="img" src="../img/book1.png" />
                  <p
                    class="label is-size-3"
                    style="
                      text-align: center;
                      border-bottom: 3px solid;
                      width: 300px;
                      margin: 0 auto;
                      color: #8FC1E3;
                    "
                  >
                    ล็อกอินเข้าสู่ระบบ
                  </p>
                  <p
                    class="label is-size-6"
                    style="color: #5085A5; text-align: center"
                  >
                    เข้าสู่ระบบผ่าน Social Network
                  </p>
                </div>

                <div class="field column">
                  <div class="control has-text-centered">
                    <button
                      class="button is-rounded is-medium"
                      style="color: #F7F9FB; background-color: #f16363"
                    >
                      เข้าสู่ระบบด้วย google account
                    </button>
                  </div>
                  <br />

                  <p
                    class="label is-size-6"
                    style="color: #5085A5; text-align: center"
                  >
                    หรือเข้าสู่ระบบผ่าน E-Book
                  </p>
                </div>

                <div class="field">
                  <label class="label" style="color: #8FC1E3">ชื่อผู้ใช้</label>
                  <div class="control has-icons-left has-icons-right">
                    <input
                      class="input is-medium is-rounded"
                      type="text"
                      placeholder="กรอกชื่อผู้ใช้"
                      style="background-color: #F7F9FB"
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
                  <label class="label" style="color: #8FC1E3">รหัสผ่าน</label>
                  <div class="control has-icons-left has-icons-right">
                    <input
                      class="input is-medium is-rounded"
                      type="password"
                      placeholder="กรอกรหัสผ่าน"
                      v-model="state.password"
                      style="background-color: #F7F9FB"
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

                <div class="field has-text-right">
                  <router-link to="/register">สมัครสมาชิก</router-link>
                </div>
                <router-view></router-view>

                <div class="field column">
                  <div class="control has-text-centered">
                    <button
                      class="button is-rounded is-medium"
                      style="color: #F7F9FB; background-color: #31708E"
                      @click="submit"
                    >
                      เข้าสู่ระบบ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar";
import useValidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  name: "Register-Ebook",
  components: {
    NavBar,
  },
  setup() {
    const state = reactive({
      username: "",
      password: "",
    });
    const rules = computed(() => {
      return {
        username: { required, minLength: minLength(4) },
        password: { required, minLength: minLength(6) },
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
