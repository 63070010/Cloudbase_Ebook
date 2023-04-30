<template>
  <div class="mt-6">
    <Carousel :items-to-show="3" :autoplay="3500" :wrap-around="true">
      <Slide v-for="(slide, index) in promotion" :key="index">
        <div class="carousel__item">
          <router-link :to="`/DetailPromotion/${slide.event_id}`">
            <img
              :src="slide.image"
              style="width: 95%; height: 280px; border-radius: 5%"
            />
          </router-link>
        </div>
      </Slide>

      <template #addons="{ slidesCount }">
        <Pagination v-if="slidesCount > 1" />
      </template>
    </Carousel>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import axios from "axios";
import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "MyCarosel",
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  created() {
    this.fetchData();
  },
  data() {
    return {
      promotion: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        axios
          .get(
            "https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/event"
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
});
</script>
