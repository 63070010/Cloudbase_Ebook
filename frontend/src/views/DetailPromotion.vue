<template>
  <div class="hero-body is-fullheight">
    <NavBar />
    <div class="columns is-centered hero-body">
      <div class="column is-half">
        <div class="column has-text-centered">
          <figure class="image">
            <img :src="promotion[0].image" />
          </figure>
          <br />

          <p class="title is-5">{{ promotion[0].title }}</p>
          <br />
          <p class="subtitle is-6">
            {{ promotion[0].desc }} <br />
            <br />
          </p>

          <p class="level-centere">
            <router-link to="/">
              <button
                class="button"
                style="color: #eee2dc; background-color: #ac3b61"
              >
                กลับไปหน้าเลือกซื้อหนังสือ
              </button></router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar";
import axios from "axios";
export default {
  name: "DetailPromotion",
  components: {
    NavBar,
  },
  data() {
    return {
      promotion: [],
    };
  },
  created() {
    this.fetchData(this.$route.params.id);
  },
  methods: {
    async fetchData(id) {
      try {
        axios
          .get(
            `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/event?event_id=${id}`
          )
          .then((response) => {
            this.promotion = response.data;
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