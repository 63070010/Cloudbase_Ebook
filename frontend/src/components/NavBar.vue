<template>
  <div>
    <nav class="navbar is-fixed-top" style="background-color: #5085a5">
      <div class="navbar-menu mt-1 mb-1">
        <div class="navbar-start ml-3">
          <div v-if="!user" class="navbar-item">
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
            <div class="dropdown" :class="{ 'is-active': Open_dropdown }">
              <div class="dropdown-trigger" style="overflow: hidden">
                <button
                  class="button"
                  @click="Open_dropdown = !Open_dropdown"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                >
                  <br />

                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/image-a4852.appspot.com/o/93278eaa12fd253a4fe3cc08a0b219bc.jpg?alt=media&token=c6a41519-b914-4753-967c-4ef506d54565"
                    alt="Image"
                    style="border-radius: 50%; width: 45px; max-height: 200%"
                  />

                  <span class="ml-3">Test</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a class="dropdown-item" style="color: #8fc1e3"
                    ><img
                      src="../img/coins.png"
                      style="
                        line-height: 1.5;
                        display: inline-block;
                        vertical-align: middle;
                      "
                    />
                    0 Points
                  </a>
                  <a class="dropdown-item">
                    <router-link
                      :to="`/Profile_user/${user.id}`"
                      style="color: #8fc1e3"
                      >Item แต้มคะแนน</router-link
                    >
                  </a>
                  <a class="dropdown-item">
                    <router-link
                      :to="`/Profile_user/${user.id}`"
                      style="color: #8fc1e3"
                      >จัดการบัญชี</router-link
                    >
                  </a>
                  <a class="dropdown-item">
                    <router-link
                      :to="`/Profile_user/${user.id}`"
                      style="color: #8fc1e3"
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
          <div class="navbar-item mt-2" style="margin-right: 100px">
            <span class="icon is-size-5 mr-2"
              ><i class="fas fa fa-home" style="color: #f7f9fb"></i>
            </span>
            <router-link to="/" style="color: #f7f9fb">E5-book</router-link>
          </div>
        </div>

        <div class="navbar-end">
          <p class="navbar-item">
            <router-link to="/Cart_Book" style="color: #687864"
              ><button class="button">
                <span style="color: #687864">ไปหน้ารถเข็น</span>
                <span class="icon is-size-5 ml-2"
                  ><i class="fas fa-shopping-cart" style="color: #687864"> </i
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
export default {
  data() {
    return {
      user: 1,
      name: "NavBar",
      Open_dropdown: false,
    };
  },
};
</script>
<style >
</style>