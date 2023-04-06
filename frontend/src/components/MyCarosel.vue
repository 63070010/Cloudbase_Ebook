<template >
  <div class="mt-6">
    <Carousel :items-to-show="1" :autoplay="3500" :wrap-around="true">
      <Slide v-for="slide in promotion" :key="slide">
        <div class="carousel__item">
          <router-link :to="`/DetailPromotion/${slide.promotion_id}`">
            <img
              :src="slide.promotionimage"
              style="width: 500px; height: 250px"
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
import { Carousel, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default {
  name: "CaroUse",
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  data() {
    return {
      promotion: [
        {
          promotionimage:
            "https://los40.com/los40/imagenes/2021/12/31/comics/1640967978_115363_1640969474_gigante_normal.jpg",
        },
        {
          promotionimage:
            "https://los40.com/los40/imagenes/2021/12/31/comics/1640967978_115363_1640969474_gigante_normal.jpg",
        },
      ],
    };
  },
};
</script>