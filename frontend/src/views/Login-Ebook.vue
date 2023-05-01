<template>
  <div>
    <NavBar />

    <div>
      <section class="section hero is-fullheight">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-three-quarters">
              <div class="card column" style="width: 700px">
                <div class="field has-text-centered">
                  <img style="height: 150px" alt="img" src="../img/book1.png" />
                  <p
                    class="label is-size-3"
                    style="
                      text-align: center;
                      border-bottom: 3px solid;
                      width: 300px;
                      margin: 0 auto;
                      color: #8fc1e3;
                    "
                  >
                    ล็อกอินเข้าสู่ระบบ
                  </p>
                </div>

                <div class="field">
                  <label class="label" style="color: #8fc1e3">ชื่อผู้ใช้</label>
                  <div class="control has-icons-left has-icons-right">
                    <input
                      class="input is-medium is-rounded"
                      type="text"
                      placeholder="กรอกชื่อผู้ใช้"
                      style="background-color: #f7f9fb"
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
                  <label class="label" style="color: #8fc1e3">รหัสผ่าน</label>
                  <div class="control has-icons-left has-icons-right">
                    <input
                      class="input is-medium is-rounded"
                      type="password"
                      placeholder="กรอกรหัสผ่าน"
                      v-model="state.password"
                      style="background-color: #f7f9fb"
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
                      style="color: #f7f9fb; background-color: #31708e"
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
import axios from "axios";

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
      axios
        .post(
          "https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/login",
          { username: this.state.username, password: this.state.password }
        )
        .then((response) => {
          // ถ้าเข้าสู่ระบบสำเร็จ
          // จะสามารถบันทึก token ไว้ใน localStorage เพื่อใช้ในการเรียก API อื่นๆ
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("id", response.data.id);
          console.log(localStorage);

          // ล้างข้อมูล username และ password

          if (response.data.message == "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง") {
            alert("ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง");
          } else {
            this.$router.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
