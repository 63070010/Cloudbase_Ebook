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
import { ref, onMounted } from "vue";
import WebViewer from "@pdftron/webviewer";

export default {
  name: "ReadBook",
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
    onMounted(() => {
      const path =
        "https://firebasestorage.googleapis.com/v0/b/image-a4852.appspot.com/o/cloud-midterm.pdf?alt=media&token=22d57546-6295-4300-bbdb-7513479e0df4&v";

     setTimeout(() => {
        WebViewer(
          {
            path,
          },
          viewer.value
        );
      }, 1000);
    });

    return {
      viewer,
    };
  },
  created() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 1600);
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