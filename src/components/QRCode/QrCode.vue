<template>
  <div class="camera-container">
    <div v-if="showPermissionPopup" class="permission-popup">
      <button @click="requestCameraPermission">Allow Camera Access</button>
    </div>
    <qr-stream v-else :camera="camera" @decode="onDecode" @init="onInit">
      <div
        class="bounding-box"
        :style="{ width: boxSize, height: boxSize }"
      ></div>
      <div v-show="showScanConfirmation" class="scan-confirmation">
        <span>Scan Successful</span>
      </div>
    </qr-stream>
  </div>
</template>
<script>
import { QrStream } from "vue3-qr-reader";

export default {
  components: { QrStream },

  data() {
    return {
      camera: "auto",
      result: null,
      showScanConfirmation: false,
      showPermissionPopup: true,
      boxSize: "50vh", // Adjust box size as needed as
    };
  },

  methods: {
    async onInit(promise) {
      try {
        await promise;
        this.showPermissionPopup = false; // Hide the permission popup once the camera is initialized
      } catch (e) {
        console.error(e);
      } finally {
        this.showScanConfirmation = this.camera === "off";
      }
    },

    async onDecode(content) {
      this.result = content;

      this.pause();
      await this.timeout(1000);
      this.unpause();

      // Show the scan confirmation message
      this.showScanConfirmation = true;
      await this.timeout(500); // Wait for 500ms
      this.showScanConfirmation = false;

      window.open(content);
    },

    unpause() {
      this.camera = "auto";
    },

    pause() {
      this.camera = "off";
    },

    timeout(ms) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms);
      });
    },
    resizeBox() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const minDimension = Math.min(width, height);
      this.boxSize = `${minDimension * 0.4}px`; // Adjust box size as needed
    },
    requestCameraPermission() {
      this.showPermissionPopup = false; // Hide the permission popup
      this.camera = "user"; // Set the camera option to "user" to use the front-facing camera
    },
  },
  mounted() {
    this.resizeBox();
    window.addEventListener("resize", this.resizeBox);
  },
  unmounted() {
    window.removeEventListener("resize", this.resizeBox);
  },
};
</script>
<style scoped>
.camera-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}

.bounding-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  border: 10px solid rgba(255, 255, 255, 0.5);
  border-radius: 25px;
  clip-path: polygon(
    0 0,
    20% 0,
    20% 20%,
    0 20%,
    0 80%,
    20% 80%,
    20% 100%,
    0 100%,
    80% 100%,
    80% 80%,
    100% 80%,
    100% 20%,
    80% 20%,
    80% 0,
    100% 0,
    100% 100%,
    0 100%
  );
  overflow: hidden;
}

.qrcode-stream {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.scan-confirmation {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.9);
}

.permission-popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.permission-popup button {
  margin-top: 10px;
}
</style>
