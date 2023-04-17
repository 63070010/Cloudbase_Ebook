<template>
  <div>
    <NavBar />
    <br />
    <div id="webviewer" ref="viewer" s></div>
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
  setup() {
    const viewer = ref(null);
    onMounted(() => {
      const path = `https://firebasestorage.googleapis.com/v0/b/image-a4852.appspot.com/o/cloud-midterm.pdf?alt=media&token=22d57546-6295-4300-bbdb-7513479e0df4&v=${Date.now()}`;
      WebViewer(
        {
          path,
          disabledElements: [
            // ปิดการใช้งานปุ่มดาวโหลดและปริ้น
            "downloadButton",
            "printButton",
          ],
        },
        viewer.value
      );
    });

    return {
      viewer,
    };
  },
};
</script>
<style>
#webviewer {
  height: 100vh;
}
</style>