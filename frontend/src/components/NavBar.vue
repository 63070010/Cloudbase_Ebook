<template>
  <div>
    <nav class="navbar is-fixed-top" style="background-color: #5085a5">
      <div class="navbar-menu mt-1 mb-1">
        <div class="navbar-start ml-3">
          <div v-if="id == null" class="navbar-item">
            <a>
              <router-link to="/register" style="color: #f7f9fb"
                >ลงทะเบียน</router-link
              >
              <a class="ml-2 mr-1" style="color: #f7f9fb">/</a>
              <router-link to="/login" style="color: #f7f9fb">
                เข้าสู่ระบบ</router-link
              >
            </a>
          </div>

          <div v-else class="navbar-item">
            <div
              class="dropdown"
              :class="{ 'is-active': Open_dropdown }"
              v-if="showuser && showuser[0]"
            >
              <div class="dropdown-trigger" style="overflow: hidden">
                <button
                  class="button"
                  @click="Open_dropdown = !Open_dropdown"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                >
                  <br />

                  <img
                    v-if="showuser[0].profile != ''"
                    :src="showuser[0].profile"
                    alt="Image"
                    style="border-radius: 50%; width: 45px; max-height: 200%"
                  />

                  <span class="ml-3">{{ showuser[0].username }}</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content" v-if="showuser && showuser[0]">
                  <a class="dropdown-item" style="color: #8fc1e3"
                    ><img
                      src="../img/coins.png"
                      style="
                        line-height: 1.5;
                        display: inline-block;
                        vertical-align: middle;
                      "
                    />

                    <span> {{ showuser[0].point }} แต้ม </span>
                  </a>
                  <a class="dropdown-item">
                    <router-link :to="`/ItemsPoint`" style="color: #8fc1e3"
                      >Item แต้มคะแนน</router-link
                    >
                  </a>
                  <a class="dropdown-item">
                    <router-link
                      :to="`/Profile_user/${id}`"
                      style="color: #8fc1e3"
                      >จัดการบัญชี</router-link
                    >
                  </a>
                  <a class="dropdown-item">
                    <router-link :to="`/Bookshelf`" style="color: #8fc1e3"
                      >ชั้นหนังสือของฉัน</router-link
                    >
                  </a>
                  <a
                    class="dropdown-item"
                    @click="Logout"
                    style="color: #f16363"
                  >
                    ออกจากระบบ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="navbar-canter">
          <div class="navbar-item mt-2 ml-6">
            <span class="icon is-size-5 navbar-icon">
              <i
                class="fas fa fa-home"
                style="color: #f7f9fb; margin-right: 0.3em"
              ></i>
            </span>
            <router-link to="/">
              <span style="color: #f7f9fb; align-items: center">E-Book</span>
            </router-link>
          </div>
          <div class="navbar-center"></div>
          <div class="navbar-item"></div>
        </div>

        <div class="navbar-end">
          <p class="navbar-item">
            <router-link
              to="/Admin_AddEvent"
              style="color: #687864"
              v-if="id == '0'"
              ><button class="button mr-3">
                <span style="color: #687864">Event</span>
                <span class="icon is-size-5 ml-2">
                  <i class="fa fa-plus-circle" style="color: #687864"> </i>
                </span>
              </button>
            </router-link>
            <router-link
              to="/Admin_Monthly"
              style="color: #687864"
              v-if="id == '0'"
              ><button class="button mr-3">
                <span style="color: #687864">Monthly</span>
                <span class="icon is-size-5 ml-2">
                  <i class="fa fa-plus-circle" style="color: #687864"> </i>
                </span>
              </button>
            </router-link>
            <router-link
              to="/Admin_AddItem"
              style="color: #687864"
              v-if="id == '0'"
              ><button class="button mr-5">
                <span style="color: #687864">Item</span>
                <span class="icon is-size-5 ml-2">
                  <i class="fa fa-plus-square" style="color: #687864"></i>
                </span>
              </button>
            </router-link>
            <router-link
              v-if="id != null && id != '0'"
              to="/Cart_Book"
              style="color: #687864"
              ><button class="button mr-3">
                <span style="color: #687864">ตะกร้า</span>
                <span class="icon is-size-5 ml-2"
                  ><i class="fas fa-shopping-cart" style="color: #687864"> </i
                ></span>
              </button>
            </router-link>

            <button class="button mr-3" @click="check()" v-else-if="id != '0'">
              <span style="color: #687864">ตะกร้า</span>
              <span class="icon is-size-5 ml-2"
                ><i class="fas fa-shopping-cart" style="color: #687864"> </i
              ></span>
            </button>

            <router-link :to="`/SearchBook/${'all'}`" style="color: #687864">
              <button class="button mr-5">
                <span style="color: #687864">ค้นหาหนังสือ</span>
                <span class="icon is-size-5 ml-2"
                  ><i class="fas fa-search" style="color: #687864"> </i
                ></span>
              </button>
            </router-link>
          </p>
        </div>
      </div>
    </nav>
    <br />
    <br />
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "NavBar",
      Open_dropdown: false,
      id: null,
      showuser: [],
    };
  },
  mounted() {
    // ดึงค่า id จาก LocalStorage เมื่อ component ถูกโหลด
    this.id = localStorage.getItem("id");
    console.log(this.id);
    this.fetchData();
  },

  methods: {
    async fetchData() {
      console.log(this.id);
      try {
        const response2 = await axios.get(
          `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/user?id=${this.id}`
        );
        this.showuser = response2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async Logout() {
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    check() {
      alert("กรุณาเข้าสู่ระบบหรือสมัครสมาชิก");
    },
  },
};
</script>
<style >
</style>