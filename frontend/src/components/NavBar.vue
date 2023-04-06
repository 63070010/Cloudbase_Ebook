<template>
  <div>
    <nav class="navbar is-fixed-top" style="background-color: #5085A5">
      <div class="navbar-menu mt-1 mb-1">
        <div class="navbar-start ml-3">
          <div v-if="!user" class="navbar-item">
            <a>
              <router-link to="/register" style="color: #F7F9FB"
                >ลงทะเบียน</router-link
              >
              <a class="ml-2 mr-1" style="color: #F7F9FB">/</a>
              <router-link to="/login" style="color: #F7F9FB">
                เข้าสู่ระบบ</router-link
              >
            </a>
          </div>
          <div v-else class="navbar-item">
            <a>
              <router-link
                :to="`/Profile_user/${user.id}`"
                style="color: #F7F9FB"
                >โปรไฟล์</router-link
              >
              <a class="ml-2 mr-1" style="color: #F7F9FB">/</a>
              <a @click="Logout" style="color: #F7F9FB"> ออกจากระบบ</a>
            </a>
          </div>
        </div>

        <div class="navbar-canter">
          <div class="navbar-item mt-2" style="margin-right: 100px">
            <span class="icon is-size-5 mr-2"
              ><i class="fas fa fa-home" style="color: #F7F9FB"></i>
            </span>
            <router-link to="/" style="color: #F7F9FB">E5-book</router-link>
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
      user: null,
      name: "NavBar",
    };
  },
};
</script>
<style >
</style>