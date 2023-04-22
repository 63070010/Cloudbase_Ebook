<template>
  <div>
    <vue-qrcode :value="test()"></vue-qrcode>
  </div>
</template>

<script>
import VueQrcode from 'vue-qrcode';

export default {
  name: 'QrCodeWithCheck',
  components: {
    VueQrcode,
  },
  data() {
    return {
    };
  },
  methods: {
    test() {
      console.log(1);
      return "https://fengyuanchen.github.io/vue-qrcode";
    },
  },
};
</script>