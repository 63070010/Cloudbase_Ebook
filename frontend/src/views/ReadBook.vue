<template>
  <div>
    <div ref="pdfViewer"></div>
    <button @click="printLicense">Print License</button>
  </div>
</template>

<script>
import WebViewer from "@pdftron/webviewer";

export default {
  name: "PdfViewer",
  data() {
    return {
      licenseKey: "your_license_key_here",
      instance: null,
    };
  },
  methods: {
    async printLicense() {
      // Make sure the instance is loaded and not null
      if (!this.instance) {
        console.error("WebViewer instance is not loaded yet!");
        return;
      }

      // Check if the license is valid
      if (!this.instance.isFullPDFEnabled()) {
        console.error("Invalid license key!");
        return;
      }

      // Print the license text into the PDF
      await this.instance.print();
    },
  },
  mounted() {
    // Load PDFTron WebViewer
    WebViewer(
      {
        path: "path/to/webviewer",
        initialDoc: "path/to/my/pdf",
        licenseKey: this.licenseKey,
      },
      this.$refs.pdfViewer
    ).then((instance) => {
      this.instance = instance;
    });
  },
  unmounted() {
    // Cleanup WebViewer instance
    this.instance && this.instance.closeDocument();
    this.instance && this.instance.delete();
  },
};
</script>
