<template >
  <div>
    <NavBar />
    <br />
    <div class="container is-fullheight">
      <h2 class="mb-4 is-size-1 has-text-centered has-text-weight-bold">
        จัดการบัญชี
      </h2>

      <div class="columns">
        <div class="column is-12">
          <section class="card is-small">
            <div class="card-content">
              <div class="container">
                <div class="columns">
                  <div class="column is-2">
                    <figure class="image is-128x128">
                      <img
                        class="is-rounded"
                        src="../img/book1.png"
                        alt="Image"
                        style="object-fit: cover"
                      />
                    </figure>
                  </div>
                  <div class="column">
                    <br />
                    <br />
                    <h1 class="title">{{ user.username }}</h1>
                  </div>
                  <div>
                    <br>
                    <br>
                    <EditProfile/>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="hero">
            <div class="card has-background-white-ter">
              <div class="card-content">
                <div class="columns">
                  <div class="column is-1"></div>
                  <div class="column is-2">
                    <p class="title is-4">Username</p>
                  </div>
                  <div class="column">
                    <p class="subtitle is-4">{{ user.username }}</p>
                  </div>

                  <div class="column is-2">
                    <p class="title is-4">Gender</p>
                  </div>
                  <div class="column is-3">
                    <p class="subtitle is-4">{{ user.gender }}</p>
                  </div>
                </div>
                <div class="columns">
                  <div class="column is-1"></div>
                  <div class="column is-2">
                    <p class="title is-4">Email</p>
                  </div>
                  <div class="column">
                    <p class="subtitle is-4">{{ user.email }}</p>
                  </div>

                  <div class="column is-2">
                    <p class="title is-4">Phone</p>
                  </div>
                  <div class="column is-3">
                    <p class="subtitle is-4">{{ user.phonenumber }}</p>
                  </div>
                </div>
                <div class="columns">
                  <div class="column is-1"></div>
                  <div class="column is-2">
                    <p class="title is-4">Password</p>
                  </div>
                  <div class="column">
                    <p
                      class="subtitle is-4"
                      style="-webkit-text-security: disc"
                    >
                      {{ user.password }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <br />
          <section class="info-tiles">
            <div class="tile is-ancestor has-text-centered">
              <div class="tile is-parent">
                <router-link to="/register">
                  <article class="tile is-child box color_use">
                    <p class="title" style="color: #8FC1E3">รายการที่ชอบ</p>
                    <p class="subtitle has-text-left">
                      รายการหนังสือที่คุณสนใจที่จะอ่าน หรือ สนใจหนังสือเล่มนั้นๆ
                    </p>
                  </article>
                </router-link>
              </div>
              <div class="tile is-parent">
                <router-link to="/register">
                  <article class="tile is-child box color_use">
                    <p class="title" style="color: #8FC1E3">ชั้นหนังสือของฉัน</p>
                    <p class="subtitle has-text-left">
                      รายการหนังสือทั้งหมดของคุณที่คุณได้สั่งซื้อมา
                      จะถูกเก็บไว้รวบรวมที่ชั้นหนังสือ
                    </p>
                  </article></router-link
                >
              </div>
              <div class="tile is-parent">
                <router-link to="/register">
                  <article class="tile is-child box color_use">
                    <p class="title" style="color: #8FC1E3">แต้มคะแนน</p>
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
                <router-link to="/register">
                  <article class="tile is-child box color_use">
                    <p class="title" style="color: #8FC1E3">หนังสือที่ลงขาย</p>
                    <p class="subtitle has-text-left">
                      รายการหนังสือทั้งหมดที่คุณได้ลงขายภายในเว็บไซต์
                    </p>
                  </article>
                </router-link>
              </div>

              <div class="tile is-parent is-4">
                <router-link to="/register">
                  <article class="tile is-child box color_use">
                    <p class="title" style="color: #8FC1E3">อัปโหลดหนังสือ</p>
                    <p class="subtitle has-text-left">
                      คุณสามารถอัปโหลดหนังสือของคุณได้
                      และจะแสดงหนังสือทั้งหมดที่คุณได้อัปโหลดในเว็บไซต์
                    </p>
                  </article></router-link
                >
              </div>
              <div class="tile is-parent is-4">
                <router-link to="/register">
                  <article class="tile is-child box color_use">
                    <p class="title" style="color: #8FC1E3">
                      รีวิวหนังสือของฉัน
                    </p>
                    <p class="subtitle has-text-left">
                      รายการรีวิว และ เรทติ้งของหนังสือที่คุณเคยให้คะแนนไว้
                    </p>
                  </article></router-link
                >
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
      user: {
        username: "TestName",
        email: "Test@hotmail.com",
        phonenumber: "0812345678",
        gender: "ชาย",
        password: "123456789",
      },
      images: [],
      types: [],
      isActive: "MYbook",
      Book_list: [],
      mysell_book: [],
      num_book: 0,
      Add_Book: false,
      Book_name: "",
      price: "",
      bookType: "",
    };
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
  border: 5px solid #8FC1E3;
  transition: transform 1000ms ease-out;
  transform: scale(1.1);
}
</style>