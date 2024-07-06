import { defineStore } from 'pinia';

export const useShopStore = defineStore('shop', {
  state: () => ({
    pageCategory: 'default',
  }),
  
  actions: {
    setPageCategory(category) {
      this.pageCategory = category;
    }
  }
});
