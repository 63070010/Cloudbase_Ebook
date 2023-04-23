<template>
  <div>
    <div class="qrcode-container">
      <div class="qrcode-wrapper">
        <canvas ref="canvas"></canvas>
        <span class="qrcode-text">สแกน QR Code เพื่อชำระเงิน</span><br />
        <span class="qrcode-text2">ยอดชำระ {{ totalprice }} บาท </span>
      </div>
      <router-link to="/" style="margin-bottom: -600px; position: absolute"
        ><button class="button is-info is-rounded">
          กลับไปหน้าแรก
        </button></router-link
      >
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";

export default {
  name: "QRCodeForMonthly",
  data() {
    return {
      qrCodeValue: "http://localhost:8080/",
      cart: [],
    };
  },
  created() {
    this.getmonthly();
  },

  methods: {
    async getmonthly() {
      const canvas = this.$refs.canvas;
      QRCode.toCanvas(canvas, this.qrCodeValue, this.qrCodeOptions, () => {});
      canvas.style.width = "300px";
      canvas.style.height = "300px";
    },
  },
};
</script>

<style>
.qrcode-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
}

.qrcode-wrapper {
  width: 80vw;
  max-width: 400px;
  height: 80vw;
  max-height: 400px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.qrcode-text {
  position: absolute;
  margin-bottom: -300px;
  left: 0;
  width: 100%;
  text-align: center;
}
.qrcode-text2 {
  position: absolute;
  margin-bottom: -350px;
  left: 0;
  width: 100%;
  text-align: center;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
