<template>
  <div>
    <NavBar />
    <div class="container is-max-desktop">
      <textarea
        class="hero textarea mt-6 mb-6 has-background-light is-fullheight"
        v-model="content"
        disabled
      ></textarea>
      <nav
        class="pagination is-centered"
        role="navigation"
        aria-label="pagination"
      >
        <a
          :href="`/ReadBook/${this.$route.params.bookId}/${
            parseInt(this.$route.params.pageId) - 1
          }`"
          class="pagination-previous"
          >Previous</a
        >
        <a
          :href="`/ReadBook/${this.$route.params.bookId}/${
            parseInt(this.$route.params.pageId) + 1
          }`"
          class="pagination-next"
          @click="getContent"
          >Next page</a
        >
      </nav>
    </div>

    <br />
  </div>
</template>


<script>
import NavBar from "@/components/NavBar";
export default {
  name: "ReadBook",
  components: {
    NavBar,
  },
  data() {
    return {
      bookContent: {
        0: { image: "" },
      },
      content: "",
    };
  },
};
</script>
<style lang="">
</style>