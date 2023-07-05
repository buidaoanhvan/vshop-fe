<template>
  <a-layout-content class="content">
    <div
      :style="{
        position: 'relative',
        fontSize: '20px',
        padding: '24px',
        background: '#fff',
        minHeight: '700px',
      }"
    >
      <QrCode ref="qrCode"></QrCode>
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
  methods: {
    requestCameraPermission() {
      this.$refs.qrCode.requestCameraPermission();
    },
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
