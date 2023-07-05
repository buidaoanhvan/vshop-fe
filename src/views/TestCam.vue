<template>
  <div>
    <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded" />
  </div>
</template>

<script>
import { StreamBarcodeReader } from "vue-barcode-reader";

export default {
  components: { StreamBarcodeReader },

  // data() {
  //   return {
  //     result: "",
  //     error: "",
  //   };
  // },

  methods: {
    onDecode(result) {
      console.log(result);
    },
  },
};
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>
