<template>
  <a-layout-content class="content">
    <div
      :style="{
        fontSize: '20px',
        padding: '24px',
        background: '#fff',
        minHeight: '360px',
      }"
    >
      Quét Mã QR
      <template>
        <QrCode></QrCode>
      </template>
    </div>
  </a-layout-content>
</template>
<script>
import QrCode from "../components/QRCode/QrCode.vue";

export default {
  components: { QrCode },

  data() {
    return {
      user: null,
    };
  },
};
</script>
<style>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.site-layout-sub-header-background {
  background: #fff;
}

.site-layout-background {
  background: #fff;
}
</style>
