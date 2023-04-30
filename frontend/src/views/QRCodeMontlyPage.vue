<template>
  <div>
    <div class="qrcode-container">
      <div class="qrcode-wrapper">
        <canvas ref="canvas"></canvas>
        <span class="qrcode-text">สแกน QR Code เพื่อชำระเงิน</span><br />
        <span class="qrcode-text2">ยอดชำระ 300 บาท </span>
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
  name: "QRCodeForMonthly",
  data() {
    return {
      qrCodeValue: "http://localhost:8080/",
      userlist: [],
      id: null,
    };
  },
  created() {
    this.$nextTick(() => {
      this.id = localStorage.getItem("id");
      this.getmonthly();
    });
  },
  methods: {
    async getmonthly() {
      try {
        const response = await axios.get(
          `https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/monthly`
        );
        this.userlist = response.data[0].userlist.NS;
        this.mothlyid = response.data[0].id;
        console.log(this.userlist);
        this.userlist.push(String(this.id));
        console.log(this.userlist);
        await this.$nextTick(); // รอให้ DOM ประกอบกันให้เสร็จก่อน
        const canvas = this.$refs.canvas;
        if (!canvas) return; // กรณีไม่มี element ที่ ref="canvas"
        QRCode.toCanvas(canvas, this.qrCodeValue, this.qrCodeOptions, () => {});
        canvas.style.width = "300px";
        canvas.style.height = "300px";

        axios
          .put(
            "https://5ixfubta0m.execute-api.us-east-1.amazonaws.com/ebook/monthly",
            {
              id: String(this.mothlyid),
              userlist: this.userlist,
            }
          )
          .then(function (response) {
            console.log(response.data);

            alert("ชำระเงินเสร็จสิ้น");
          })
          .catch(function (error) {
            console.log(error);
          });
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
