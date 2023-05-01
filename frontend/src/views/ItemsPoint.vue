<template>
  <div>
    <NavBar />
    <div class="container is-max-widescreen">
      <!--######### ส่วนแสดงผล #########-->
      <div class="container">
        <section class="card is-small is-narrow p-5">
          <div
            class="content"
            style="
              font-size: 36px;
              font-weight: bold;
              color: #5085a5;
              text-align: center;
            "
          >
            หน้าแลก ITEM
          </div>
          <div
            class="content"
            v-for="value in user"
            :key="value.id"
            style="font-size: 22px; color: #8fc1e3"
          >
            &ensp; คุณ {{ value.username }}
            <img
              src="../img/coins.png"
              style="
                line-height: 1.5;
                display: inline-block;
                vertical-align: middle;
                width: auto;
                height: 100px;
              "
            />
            ของคุณมี {{ value.point }} แต้ม
          </div>
          <div class="columns">
            <div
              class="column is-one-fifth"
              v-for="(value, index) in item"
              :key="index"
            >
              <div class="card">
                <div class="card-image">
                  <figure class="image is-square">
                    <img :src="value.image" />
                  </figure>
                </div>
                <div class="card-content" style="text-align: center">
                  <div class="media">
                    <div class="media-content">
                      <p
                        class="is-size-6 has-text-centered subtitle"
                        style="color: #5085a5; font-weight: bold"
                      >
                        {{ value.title }}
                      </p>
                      <p class="is-size-6" style="color: #8fc1e3">
                        ใช้คะแนน {{ value.point }} แต้ม
                      </p>
                      <p class="is-size-9" style="color: #8fc1e3">
                        จำนวนที่มี {{ countitems[index] }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="level mt-6">
                  <button
                    class="button is-ghost"
                    @click="ShowPopup[index] = true"
                  >
                    <i
                      class="fa fa-info-circle fas fa-lg"
                      style="color: #5085a5"
                      aria-hidden="true"
                    ></i>
                  </button>

                  <button
                    class="button is-ghost level-right"
                    @click="buyitems[index] = true"
                    :disabled="
                      countitems[index] <= 0 || user[0].point < value.point
                    "
                  >
                    <i
                      class="fa fa-shopping-bag fas fa-lg"
                      style="color: #5085a5"
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
              </div>
              <div class="modal" :class="{ 'is-active': ShowPopup[index] }">
                <div class="modal-background"></div>
                <div class="modal-card">
                  <div class="modal-content">
                    <p class="image is-4by3">
                      <img :src="value.image" />
                    </p>
                  </div>
                  <section class="modal-card-body">
                    <div class="field">
                      <span
                        class="label is-size-4"
                        style="color: #5085a5; text-align: center"
                      >
                        รายละเอียดเพิ่มเติม
                      </span>
                      <span
                        class="label is-size-4"
                        style="color: #8fc1e3; text-align: center"
                      >
                        {{ value.desc }}
                      </span>
                      <span
                        class="label is-size-6"
                        style="color: #f16363; text-align: center"
                      >
                        หากคุณต้องการใช้แต้มคะแนนในการแลกของให้คลิกได้ที่
                        <i
                          class="fa fa-shopping-bag fas fa-lg"
                          style="color: #5085a5"
                          aria-hidden="true"
                        ></i
                        ><br />
                        แต่แต้มของคุณที่จะแลกของต้องเพียงพอกับแต้มที่กำหนด
                      </span>
                    </div>
                  </section>
                  <footer class="modal-card-foot">
                    <div class="control has-text-centered" style="margin: auto">
                      <button
                        class="button is-rounded is-medium"
                        style="color: #f7f9fb; background-color: #5085a5"
                        @click="ShowPopup[index] = false"
                      >
                        กลับไปแลก ITEM
                      </button>
                    </div>
                  </footer>
                </div>
              </div>

              <div class="modal" :class="{ 'is-active': buyitems[index] }">
                <div class="modal-background"></div>
                <div class="modal-card">
                  <section class="modal-card-body">
                    <div class="field">
                      <span
                        class="label is-size-4"
                        style="color: #8fc1e3; text-align: center"
                      >
                        กรอกรายละเอียดสำหรับจัดส่งของ
                      </span>
                    </div>
                    <div class="field-body">
                      <div class="field">
                        <label class="label" style="color: #8fc1e3"
                          >บ้านเลขที่</label
                        >
                        <div class="control has-icons-left has-icons-right">
                          <input
                            class="input is-medium is-rounded"
                            type="text"
                            size="5"
                            v-model="state.house_number"
                            style="background-color: #f7f9fb"
                          />
                          <span class="icon is-small is-left">
                            <i class="fas fa fa-home"></i>
                          </span>
                          <span
                            v-for="error in v$.house_number.$errors"
                            :key="error.$uid"
                            class="has-text-danger"
                          >
                            {{ error.$message }}
                          </span>
                        </div>
                      </div>

                      <div class="field">
                        <label class="label" style="color: #8fc1e3"
                          >หมู่ที่</label
                        >
                        <input
                          class="input is-medium is-rounded"
                          type="text"
                          size="5"
                          v-model="state.group_number"
                          style="background-color: #f7f9fb"
                        />
                        <span
                          v-for="error in v$.group_number.$errors"
                          :key="error.$uid"
                          class="has-text-danger"
                        >
                          {{ error.$message }}
                        </span>
                      </div>

                      <div class="field">
                        <label class="label" style="color: #8fc1e3"
                          >หมู่บ้าน</label
                        >
                        <input
                          class="input is-fullwidth is-medium is-rounded"
                          type="text"
                          v-model="state.village_name"
                          style="background-color: #f7f9fb"
                        />
                        <span
                          v-for="error in v$.village_name.$errors"
                          :key="error.$uid"
                          class="has-text-danger"
                        >
                          {{ error.$message }}
                        </span>
                      </div>
                    </div>

                    <div class="field-body">
                      <div class="field">
                        <label class="label" style="color: #8fc1e3">ตำบล</label>
                        <input
                          class="input is-medium is-rounded"
                          type="text"
                          v-model="state.district"
                          style="background-color: #f7f9fb"
                        />
                        <span
                          v-for="error in v$.district.$errors"
                          :key="error.$uid"
                          class="has-text-danger"
                        >
                          {{ error.$message }}
                        </span>
                      </div>

                      <div class="field">
                        <label class="label" style="color: #8fc1e3"
                          >อำเภอ</label
                        >
                        <input
                          class="input is-fullwidth is-medium is-rounded"
                          type="text"
                          v-model="state.prefecture"
                          style="background-color: #f7f9fb"
                        />
                        <span
                          v-for="error in v$.prefecture.$errors"
                          :key="error.$uid"
                          class="has-text-danger"
                        >
                          {{ error.$message }}
                        </span>
                      </div>
                    </div>

                    <div class="field-body">
                      <div class="field">
                        <label class="label" style="color: #8fc1e3"
                          >จังหวัด</label
                        >
                        <input
                          class="input is-medium is-rounded"
                          type="text"
                          v-model="state.province"
                          style="background-color: #f7f9fb"
                        />
                        <span
                          v-for="error in v$.province.$errors"
                          :key="error.$uid"
                          class="has-text-danger"
                        >
                          {{ error.$message }}
                        </span>
                      </div>

                      <div class="field">
                        <label class="label" style="color: #8fc1e3"
                          >รหัสไปรษณีย์</label
                        >
                        <input
                          class="input is-fullwidth is-medium is-rounded"
                          type="text"
                          v-model="state.zip_code"
                          style="background-color: #f7f9fb"
                        />
                        <span
                          v-for="error in v$.zip_code.$errors"
                          :key="error.$uid"
                          class="has-text-danger"
                        >
                          {{ error.$message }}
                        </span>
                      </div>
                    </div>

                    <div class="field">
                      <label class="label" style="color: #8fc1e3"
                        >เบอร์โทรศัพท์</label
                      >
                      <div class="control has-icons-left has-icons-right">
                        <input
                          class="input is-medium is-rounded"
                          type="text"
                          maxlength="10"
                          v-model="state.phone_number"
                          style="background-color: #f7f9fb"
                        />
                        <span class="icon is-small is-left">
                          <i class="fas fa-phone"></i>
                        </span>
                        <span
                          v-for="error in v$.phone_number.$errors"
                          :key="error.$uid"
                          class="has-text-danger"
                        >
                          {{ error.$message }}
                        </span>
                      </div>
                    </div>
                  </section>
                  <footer class="modal-card-foot">
                    <div class="control has-text-centered" style="margin: auto">
                      <button
                        class="button is-rounded is-medium"
                        style="color: #f7f9fb; background-color: #5085a5"
                        @click="submit(index)"
                      >
                        ยืนยันข้อมูล
                      </button>
                      <button
                        class="button is-rounded is-medium"
                        style="color: #f7f9fb; background-color: #5085a5"
                        @click="drop(index)"
                      >
                        กลับไปแลก ITEM
                      </button>
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          </div>

          <!--######### BTN NEXT && BACK #########-->
          <div
            class="field next_or_back has-addons"
            style="display: flex; justify-content: center; align-items: center"
          >
            <button
              v-if="this.currentPage == 1"
              disabled
              class="button is-primary is-outlined"
            >
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </button>
            <button
              v-else
              class="button is-primary is-outlined"
              v-on:click="backPage"
            >
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </button>
            <h2 class="textPage mt-2 mx-2">หน้าที่ {{ this.currentPage }}</h2>
            <button
              v-if="this.lastpage > this.currentPage"
              v-on:click="nextPage"
              class="button is-primary is-outlined"
            >
              <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
            <button v-else disabled class="button is-primary is-outlined">
              <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
        </section>
      </div>
      <br />
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
  name: "ItemsPoint",
  components: {
    NavBar,
  },
  mounted() {
    // ดึงค่า id จาก LocalStorage เมื่อ component ถูกโหลด
    this.id = localStorage.getItem("id");
    this.fetchData();
  },
  data() {
    return {
      search: "",
      number: 1,
      typeTab: "ค้นหา ทั้งหมด",
      user: [],
      currentPage: 1,
      lastpage: 1,
      cart: [],
      totalprice: 0,
      bookincart: [],
      bookshelf: [],
      id: null,
      item: [],
      countitems: [],
      ShowPopup: [],
      buyitems: [],
    };
  },
  setup() {
    const state = reactive({
      house_number: "",
      group_number: "",
      village_name: "",
      district: "",
      prefecture: "",
      province: "",
      zip_code: "",
      phone_number: "",
    });
    const rules = computed(() => {
      return {
        house_number: { required },
        group_number: { required },
        village_name: { required },
        district: { required },
        prefecture: { required },
        province: { required },
        zip_code: { required },
        phone_number: { required, minLength: minLength(10) },
      };
    });

    const v$ = useValidate(rules, state);

    return {
      state,
      v$,
    };
  },
  computed: {
    paginatedBooks() {
      const startIndex = (this.currentPage - 1) * 3;
      const endIndex = startIndex + 3;
      return this.books.slice(startIndex, endIndex);
    },
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/user?id=${this.id}`
        );
        this.user = response.data;
        const response2 = await axios.get(
          "https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/item"
        );
        this.item = response2.data;
      } catch (error) {
        console.log(error);
      }
    },
    submit(index) {
      this.v$.$validate();
      if (this.v$.$error) {
        alert("คุณกรอกรายละเอียดไม่ครบถ้วน");
      } else {
        alert("สำเร็จ \u2705 รอรับของได้เลย.");
        this.buyitems[index] = false;
      }
    },
    drop(index) {
      this.buyitems[index] = false;
    },
    nextPage() {
      this.currentPage++;
    },
    backPage() {
      this.currentPage--;
    },
    getProducts() {},
    changeTab(text, num) {
      this.typeTab = "ค้นหา " + text;
      this.number = num;
    },
  },
};
</script>
<style>
body {
  background: #f7f9fb;
  font-family: "Itim", cursive;
  width: 100vw;
  min-height: 100vh;
}

.container {
  margin-top: 3%;
}

.search {
  margin-top: 3%;
  width: 100%;
  position: relative;
}

.search_field {
  margin: auto;
  width: 40%;
}

.search_input {
  width: 100%;
}

.next_or_back {
  display: block;
  margin: auto;
  width: 15%;
  text-align: center;
}

.columns {
  display: flex;
  flex-wrap: wrap;
  max-height: 1000px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 20px;
}

.column {
  margin-top: 20px;
}

.card-content {
  height: 100px;
}
</style>