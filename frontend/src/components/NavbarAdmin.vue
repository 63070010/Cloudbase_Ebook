<template>
  <div>
    <nav
      class="navbar is-fixed-top"
      style="background: linear-gradient(221deg, #edc7b7, #eee2dc 73%)"
    >
      <div class="navbar-menu mt-1 mb-1">
        <div class="navbar-start ml-3">
          <div class="navbar-item">
            <a href="#section_one" style="color: #ac3b61">ยืนยืนหนังสือ</a>

            <span class="ml-2 mr-1" style="color: #ac3b61">/</span>
            <a href="#section_two" style="color: #ac3b61">ยืนยืนการลบ</a>

            <span class="ml-2 mr-1" style="color: #ac3b61">/</span>
            <a href="#section_three" style="color: #ac3b61"
              >รายละเอียดการเงิน</a
            >
          </div>
        </div>

        <div class="navbar-canter">
          <div class="navbar-item mt-2" style="margin-right: 120px">
            <span class="icon is-size-5 mr-2"
              ><i class="fas fa fa-home" style="color: #ac3b61"></i>
            </span>
            <router-link to="/" style="color: #ac3b61">E5-book </router-link>
          </div>
        </div>

        <div class="navbar-end">
          <p class="navbar-item">
            <button
              class="button"
              style="background: linear-gradient(221deg, #edc7b7, #eee2dc 73%)"
            >
              <span style="color: #ac3b61">ออกจากระบบ</span>
              <span class="icon is-size-5 ml-2"
                ><i class="fas fa-sign-out-alt" style="color: #ac3b61"></i>
              </span>
            </button>
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
  name: "NavbarAdmin",
};
</script>
<style >
</style>