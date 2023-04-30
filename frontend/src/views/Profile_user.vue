<template >
  <div>
    <NavBar />
    <br />
    <div class="container" v-if="showprofileuser.length > 0">
      <h2 class="mb-5 is-size-1 has-text-centered has-text-weight-bold">
        จัดการบัญชี
      </h2>

      <div class="card">
        <div class="columns">
          <div class="columns">
            <figure class="image is-128x128 ml-5">
              <br />

              <img
                class="is-rounded"
                v-if="showprofileuser[0].profile != ''"
                :src="showprofileuser[0].profile"
                alt="Image"
                style="object-fit: cover"
              />
            </figure>
          </div>
          <div class="column">
            <br />

            <h1 class="title">{{ showprofileuser[0].username }}</h1>
          </div>
          <div class="mr-4">
            <br />
            <br />

            <EditProfile />
          </div>
        </div>
      </div>

      <section class="hero">
        <div class="card has-background-white-ter">
          <div class="columns">
            <div class="column is-1"></div>
            <div class="column is-2">
              <p class="title is-4">Username</p>
            </div>
            <div class="column">
              <p class="subtitle is-4">{{ showprofileuser[0].username }}</p>
            </div>

            <div class="column is-2">
              <p class="title is-4">Gender</p>
            </div>
            <div class="column is-3">
              <p class="subtitle is-4">{{ showprofileuser[0].gender }}</p>
            </div>
          </div>
          <div class="columns">
            <div class="column is-1"></div>
            <div class="column is-2">
              <p class="title is-4">Email</p>
            </div>
            <div class="column">
              <p class="subtitle is-4">{{ showprofileuser[0].email }}</p>
            </div>

            <div class="column is-2">
              <p class="title is-4">Phone</p>
            </div>
            <div class="column is-3">
              <p class="subtitle is-4">{{ showprofileuser[0].phone }}</p>
            </div>
          </div>
          <div class="columns">
            <div class="column is-1"></div>
            <div class="column is-2">
              <p class="title is-4">Password</p>
            </div>
            <div class="column is-3">
              <p class="subtitle is-4" style="-webkit-text-security: disc">
                {{ showprofileuser[0].password }}
              </p>
            </div>
            <nav
              @click="Change_password = true"
              class="button is-rounded is-medium is-align-self-center"
              style="
                width: 150px;
                height: 45px;
                margin-left: -200px;
                background-color: #31708e;
              "
            >
              <span class="" style="color: #f7f9fb">เปลี่ยนรหัสผ่าน</span>
            </nav>
          </div>
        </div>
      </section>

      <br />
      <section class="info-tiles">
        <div class="tile is-ancestor has-text-centered">
          <div class="tile is-parent">
            <router-link to="/FavoriteBook">
              <article class="tile is-child box color_use">
                <p class="title" style="color: #8fc1e3">รายการที่ชอบ</p>
                <p class="subtitle has-text-left">
                  รายการหนังสือที่คุณสนใจที่จะอ่าน หรือ สนใจหนังสือเล่มนั้นๆ
                </p>
              </article>
            </router-link>
          </div>
          <div class="tile is-parent">
            <router-link to="/Bookshelf">
              <article class="tile is-child box color_use">
                <p class="title" style="color: #8fc1e3">ชั้นหนังสือของฉัน</p>
                <p class="subtitle has-text-left">
                  รายการหนังสือทั้งหมดของคุณที่คุณได้สั่งซื้อมา
                  จะถูกเก็บไว้รวบรวมที่ชั้นหนังสือ
                </p>
              </article></router-link
            >
          </div>
          <div class="tile is-parent">
            <router-link to="/ItemsPoint">
              <article class="tile is-child box color_use">
                <p class="title" style="color: #8fc1e3">Item แต้มคะแนน</p>
                <p class="subtitle has-text-left">
                  ได้แต้มคะแนนมาจากการสั่งซื้อหนังสือที่คุณสนใจ
                  สามารถนำแต้มเพื่อไปแลกของได้
                </p>
              </article></router-link
            >
          </div>
        </div>
      </section>
      <br />
      <br />
      <section class="info-tiles">
        <div class="tile is-ancestor has-text-centered">
          <div class="tile is-parent">
            <router-link to="/Mybook">
              <article class="tile is-child box color_use">
                <p class="title" style="color: #8fc1e3">หนังสือที่ลงขาย</p>
                <p class="subtitle has-text-left">
                  รายการหนังสือทั้งหมดที่คุณได้ลงขายภายในเว็บไซต์
                </p>
              </article>
            </router-link>
          </div>

          <div class="tile is-parent is-4">
            <router-link to="/UploadBook">
              <article class="tile is-child box color_use">
                <p class="title" style="color: #8fc1e3">อัปโหลดหนังสือ</p>
                <p class="subtitle has-text-left">
                  คุณสามารถอัปโหลดหนังสือของคุณได้
                  และจะแสดงหนังสือทั้งหมดที่คุณได้อัปโหลดในเว็บไซต์
                </p>
              </article></router-link
            >
          </div>
          <div class="tile is-parent is-4">
            <router-link to="/MyCommendinBook">
              <article class="tile is-child box color_use">
                <p class="title" style="color: #8fc1e3">รีวิวหนังสือของฉัน</p>
                <p class="subtitle has-text-left">
                  รายการรีวิว และ เรทติ้งของหนังสือที่คุณเคยให้คะแนนไว้
                </p>
              </article></router-link
            >
          </div>
        </div>
      </section>

      <div class="modal" :class="{ 'is-active': Change_password }">
        <div class="modal-background"></div>
        <div class="modal-card">
          <button
            class="modal-close is-large"
            aria-label="close"
            @click="Change_password = false"
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
              <label class="label" style="color: #8fc1e3">รหัสผ่าน</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input is-medium is-rounded"
                  type="password"
                  v-model="Password"
                  style="background-color: #f7f9fb"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-key"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <label class="label" style="color: #8fc1e3"
                >ยืนยัน รหัสผ่าน</label
              >
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input is-medium is-rounded"
                  type="password"
                  v-model="Retype_Password"
                  style="background-color: #f7f9fb"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-key"></i>
                </span>
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
                @click="Change_password = false"
              >
                ยกเลิก
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import NavBar from "@/components/NavBar";
import EditProfile from "@/components/EditProfile";
export default {
  name: "Profile_user",
  components: {
    NavBar,
    EditProfile,
  },
  data() {
    return {
      Change_password: false,
      showprofileuser: [],
      Password: "",
      Retype_Password: "",
    };
  },

  mounted() {
    // ดึงค่า id จาก LocalStorage เมื่อ component ถูกโหลด
    this.id = localStorage.getItem("id");
    this.getprofileuser(this.$route.params.id);
  },
  methods: {
    async getprofileuser(path) {
      console.log(path);

      try {
        axios
          .get(
            `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/user?id=${this.id}`
          )
          .then((response) => {
            this.showprofileuser = response.data;
            console.log(this.showprofileuser);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style >
.stat-val {
  font-size: 3em;
  padding-top: 20px;
  font-weight: bold;
}
.stat-key {
  font-size: 1.4em;
  font-weight: 200;
}
.tab-contents .content {
  display: none;
}
.tab-contents .content.is-active {
  display: block;
}
.color_use:hover {
  border: 5px solid #8fc1e3;
  transition: transform 1000ms ease-out;
  transform: scale(1.1);
}
</style>