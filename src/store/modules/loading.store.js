import { defineStore } from "pinia";

export const loadingStore = defineStore({
  id: "loading",
  state: () => ({
    loading: false,
  }),
  actions: {
    loadingTrue() {
      this.loading = true;
    },
    loadingFalse() {
      this.loading = false;
    },
  },
});
