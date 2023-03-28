<template >
  <div>
    <NavBar />
    <EditProfile />

    <section>
      <div class="container hero is-fullheight">
        <div class="section">
          <div class="columns is-mobile is-multiline">
            <!-- ข้อมูล user-->
            <div class="column is-2">
              <figure class="image is-1by1">
                <img
                  class="is-rounded"
                  :src="'http://localhost:3000/' + user.imageProfile"
                  alt="Image"
                  style="object-fit: cover"
                  v-if="user.imageProfile != null"
                />
              </figure>
            </div>
            <div class="column is-4-tablet is-10-mobile name">
              <p>
                <span class="title is-bold">{{ user.username }}</span>
              </p>
              <br />
              <div class="tagline">
                <p>Email: {{ user.email }}</p>

                <p>
                  ชื่อจริง: {{ user.first_name }}
                  <span class="ml-4">นามสกุล: {{ user.last_name }} </span>
                </p>

                <p v-if="user.penname != null">
                  นามปากกา: {{ user.penname }}
                  <span class="ml-1" v-if="user.Phonenumber != null">
                    เบอร์โทรสับ: {{ user.Phonenumber }}
                  </span>
                  <span class="ml-1" v-else>เบอร์โทรศัพท์: ยังไม่มีข้อมูล</span>
                </p>
                <p v-else>
                  นามปากกา: ยังไม่มีข้อมูล
                  <span class="ml-1" v-if="user.Phonenumber != null">
                    เบอร์โทรสับ: {{ user.Phonenumber }}
                  </span>
                  <span class="ml-1" v-else>เบอร์โทรสับ: ยังไม่มีข้อมูล</span>
                </p>
                <p v-if="user.bank_name != null">
                  ชื่อธนาคาร: {{ user.bank_name }}
                </p>
                <p v-else>ชื่อธนาคาร: ยังไม่มีข้อมูล</p>
                <p v-if="user.bank_number != null">
                  เลขที่บัญชี: {{ user.bank_number }}
                </p>
                <p v-else>เลขที่บัญชี: ยังไม่มีข้อมูล</p>
              </div>
            </div>

            <div class="column is-3-tablet is-4-mobile has-text-centered ml-6">
              <p class="stat-val">{{ Book_list.length }}</p>
              <p class="stat-key">หนังสือในชั้นหนังสือ</p>
            </div>
            <div
              class="column is-2-tablet is-4-mobile has-text-centered ml-3"
              style="border-left: 2px dotted rgba(0, 0, 0, 0.2)"
            >
              <p class="stat-val">{{ mysell_book.length }}</p>
              <p class="stat-key">หนังสือที่ลงขาย</p>
            </div>
          </div>
        </div>

        <!-- ข้อมูล user-->

        <div class="tabs is-fullwidth is-medium">
          <ul>
            <li
              class="link"
              v-bind:class="{ 'is-active': isActive == 'MYbook' }"
            >
              <a v-on:click="isActive = 'MYbook'">
                <span class="icon"> <i class="fa fa-list"></i> </span
                >ชั้นหนังสือ</a
              >
            </li>
            <li v-bind:class="{ 'is-active': isActive == 'MYbooksell' }">
              <a v-on:click="isActive = 'MYbooksell'"
                ><span class="icon"> <i class="fa fa-address-book"></i> </span
                >หนังสือที่ลงขาย/เขียนหนังสือ</a
              >
            </li>
          </ul>
        </div>

        <div class="tab-contents">
          <!--หนังสือที่มี-->
          <div
            class="content mt-6 mb-6"
            v-bind:class="{ 'is-active': isActive == 'MYbook' }"
          >
            <div class="container is-max-widescreen">
              <div class="columns is-multiline" v-if="Book_list.length > 0">
                <div
                  v-for="card in Book_list"
                  v-bind:key="card.id"
                  class="column is-3"
                >
                  <div class="card large">
                    <router-link :to="`/DetailsBook/${card.Bookid}`">
                      <div class="card-image image is-4by5">
                        <img
                          class="is-rounded"
                          :src="'http://localhost:3000/' + card.image"
                          style="object-fit: cover"
                          v-if="card.image != null"
                        />
                      </div>

                      <div class="card-content" style="height: 170px">
                        <div class="media">
                          <div class="media-content">
                            <p class="title is-5 no-padding">
                              {{ card.title }}
                            </p>
                            by
                            <span class="title is-6" style="color: #bab2b5">
                              {{ card.penname }}</span
                            >
                            <br />
                            type:
                            <span
                              class="is-size-7 text-right"
                              style="color: #bab2b5"
                              v-for="(value, index) in card.type"
                              :key="index"
                            >
                              {{ value }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </router-link>
                    <footer class="card-footer">
                      <router-link :to="`/ReadBook/${card.id}/1`"
                        ><a class="card-footer-item">อ่าน</a></router-link
                      >
                    </footer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--หนังสือที่มี-->

        <div class="tab-contents">
          <!--หนังสือที่ขาย-->
          <div
            class="content mb-6"
            v-bind:class="{ 'is-active': isActive == 'MYbooksell' }"
          >
            <br />
            <div class="columns is-multiline">
              <div
                v-for="card in mysell_book"
                v-bind:key="card.id"
                class="column is-3"
              >
                <div class="card large">
                  <router-link :to="`/DetailsBook/${card.id}`">
                    <div class="card-image image is-4by5">
                      <img
                        :src="'http://localhost:3000/' + card.image"
                        alt="Image"
                        style="object-fit: cover"
                      />
                    </div>
                  </router-link>
                  <div class="card-content" style="height: 250px">
                    <div class="media">
                      <div class="media-content">
                        <p class="title is-5 no-padding">
                          {{ card.title }}
                        </p>
                        ชื่อนามปากของคุณ:
                        <span class="title is-6" style="color: #bab2b5">
                          {{ card.penname }}</span
                        >
                        <br />
                        ปรเภทหนังสือที่เลือกไว้:
                        <span
                          class="is-size-6 text-right"
                          style="color: #bab2b5"
                          v-for="(value, index) in card.type"
                          :key="index"
                        >
                          {{ value }}
                        </span>

                        <!-- คือ มันจะต้องมี 5 stage เพื่อเช็ค แบบ เขียนเสรจแล้วต่อไปก้ลงทะเบียน ลงทะเบียนเสรจแล้วก้ ไป รอ พอ อนุมัติ แล้วก้ลงขาย และถ้าหาก ไม่อนุมัติก้กลับมาเป็นอันแรก"-->

                        <br />ราคาที่เลือก:
                        <span style="color: #bab2b5">{{ card.price }}</span>
                        <br />
                        สถานะหนังสือ:
                        <span
                          style="color: #bab2b5"
                          v-if="card.status == 'unready'"
                          >ยังเขียนไม่เสร็จ</span
                        >
                        <span
                          style="color: #bab2b5"
                          v-if="card.status == 'ready'"
                          >เขียนเสร็จแล้ว</span
                        >
                        <span
                          style="color: #bab2b5"
                          v-if="card.status == 'wait'"
                          >รออนุมัติ</span
                        >
                        <span
                          style="color: #bab2b5"
                          v-if="card.status == 'succeed'"
                          >อนุมัติสำเร็จแล้ว</span
                        >
                        <span
                          style="color: #bab2b5"
                          v-if="card.status == 'not_succeed'"
                          >ไม่อนุมัติ</span
                        >
                      </div>
                    </div>
                  </div>

                  <footer
                    class="card-footer"
                    v-if="
                      card.status == 'unready' || card.status == 'not_succeed'
                    "
                  >
                    <router-link :to="`/WriteBook/${card.id}/1`"
                      ><a class="card-footer-item"
                        >เขียนหนังสือต่อ
                      </a></router-link
                    >
                    <a class="card-footer-item" @click="setReady(card.id)"
                      >บันทึกหนังสือ
                    </a>
                  </footer>
                  <footer class="card-footer" v-if="card.status == 'ready'">
                    <a class="card-footer-item" @click="setWait(card.id)"
                      >ลงทะเบียนขาย</a
                    >
                    <a class="card-footer-item" @click="setReady(card.id)"
                      >ลบหนังสือที่เขียน</a
                    >
                  </footer>
                  <footer class="card-footer" v-if="card.status == 'wait'">
                    <a class="card-footer-item">ยกเลิกการลงทะเบียน</a>
                  </footer>
                  <footer class="card-footer" v-if="card.status == 'succeed'">
                    <a class="card-footer-item" @click="setWaitDelete(card.id)"
                      >ลบหนังสือที่เขียน</a
                    >
                  </footer>
                </div>
              </div>
            </div>
            <!--ตรงเพิ่มหนังสือ-->
            <div class="box has-text-centered">
              <a class="button" @click="Add_Book = true">
                เขียนหนังสือ เล่มใหม่
                <span class="material-icons">
                  <i class="fas fa-pencil-alt ml-3"></i> </span
              ></a>
            </div>
            <!--ตรงเพิ่มหนังสือ-->
          </div>
        </div>
      </div>

      <div class="modal" :class="{ 'is-active': Add_Book }">
        <div class="modal-background"></div>
        <div class="modal-card">
          <button
            class="modal-close is-large"
            aria-label="close"
            @click="Add_Book = false"
          ></button>

          <section class="modal-card-body">
            <div class="field">
              <span
                class="label is-size-4"
                style="color: #123c69; text-align: center"
              >
                รายละเอียดหนังสือ
              </span>
            </div>

            <div class="field">
              <label class="label" style="color: #ac3b61">ชื่อหนังสือ</label>
              <div class="control">
                <input
                  class="input is-medium is-rounded"
                  type="text"
                  style="background-color: #eee2dc"
                  v-model="Book_name"
                />
              </div>
            </div>
            <div class="field-body">
              <div class="field">
                <label class="label" style="color: #ac3b61"
                  >ประเภทหนังสือ</label
                >
                <div class="select is-fullwidth is-medium is-rounded">
                  <select v-model="bookType" style="background-color: #eee2dc">
                    <option value="Romance">Romance</option>
                    <option value="Action">Action</option>
                    <option value="Drama">Drama</option>
                  </select>
                </div>
              </div>
              <div class="field" style="margin-top: 35px">
                <button class="button is-success" @click="addType">
                  เพิ่มประเภท
                </button>
              </div>
              <div class="field">
                <label class="label" style="color: #ac3b61">ราคาหนังสือ</label>
                <input
                  class="input is-fullwidth is-medium is-rounded"
                  type="number"
                  v-model="price"
                />
              </div>
            </div>
            <br />
            <div class="field">
              <label class="label" style="color: #ac3b61"
                >เพิ่มรูปภาพปกหนังสือ</label
              >
              <div class="file">
                <label class="file-label">
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        @change="selectImages"
                      />
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <div class="field">
              <label class="label" style="color: #ac3b61">เรื่องย่อ</label>
              <div class="control">
                <textarea
                  class="textarea is-medium is-rounded"
                  style="background-color: #eee2dc"
                  v-model="detail_book"
                ></textarea>
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" @click="submitBook">
              บันทึก
            </button>
            <button class="button" @click="Add_Book = false">ยกเลิก</button>
          </footer>
        </div>
      </div>
    </section>
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
      user: [],
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
</style>