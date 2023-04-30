<template>
  <div>
    <NavBar />
    <br />
    <div id="webviewer" ref="viewer">
      <div class="rectangle" v-if="isLoaded == true"></div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";

import { reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { watch } from "vue";
import WebViewer from "@pdftron/webviewer";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      isLoaded: false,
    };
  },
  setup() {
    const viewer = ref(null);
    const state = reactive({
      book: "",
    });

    onMounted(async () => {
      await watch(
        () => state.book,
        async (newVal) => {
          if (newVal !== "") {
            const path = newVal;
            setTimeout(() => {
              WebViewer(
                {
                  path,
                },
                viewer.value
              );
            }, 1000);
          }
        }
      );
    });

    return {
      viewer,
      state,
    };
  },
  async created() {
    const route = useRoute();
    const bookId = route.params.book_id;
    console.log(bookId);
    const response = await axios.get(
      `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/detailbook?book_id=${bookId}`
    );
    this.state.book = response.data[0].story;

    setTimeout(() => {
      this.isLoaded = true;
    }, 1400);
  },
};
</script>

<style>
#webviewer {
  height: 100vh;
  position: relative;
}
.rectangle {
  width: 120px;
  height: 40px;
  background-color: #333333;
  position: absolute;
  top: 0px;
  right: 10px;
  z-index: 2;
}
</style>