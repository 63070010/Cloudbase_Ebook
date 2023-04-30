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
import axios from "axios";

export default {
  name: "QrCodeWithCheck",
  data() {
    return {
      qrCodeValue: "http://localhost:8080/",
      id: null,
      cart: [],
      totalprice: 0,
    };
  },
  mounted() {
    // ดึงค่า id จาก LocalStorage เมื่อ component ถูกโหลด
    this.id = localStorage.getItem("id");
    this.getcartitem();
  },

  methods: {
    async getcartitem() {
      try {
        const response = await axios.get(
          `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/cart?id=${this.id}`
        );
        this.cart = response.data;
        this.totalprice = this.cart[0].price;

        const canvas = this.$refs.canvas;
        this.cartitem = this.cart[0].cart_item.NS;
        this.bookshelf = this.cart[0].bookshelf.NS;

        QRCode.toCanvas(canvas, this.qrCodeValue, this.qrCodeOptions, () => {
          const combined = Array.from(
            new Set([...this.bookshelf, ...this.cartitem])
          );
          this.cart_item = ["0"];
          const point = parseInt(this.totalprice) / 2;
          console.log(1);
          axios
            .put(
              "https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/checkout",
              {
                id: String(this.id),
                price: "0",
                point: point,
                cart_item: this.cart_item,
                bookshelf: combined,
              }
            )
            .then(function (response) {
              console.log(response.data);

              alert("ชำระเงินเสร็จสิ้น");
            })
            .catch(function (error) {
              console.log(error);
            });
        });
        canvas.style.width = "300px";
        canvas.style.height = "300px";
      } catch (error) {
        console.log(error);
      }
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
