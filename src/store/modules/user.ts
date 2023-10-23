import { defineStore } from 'pinia';

const useUserStore = defineStore('user', {
  state: ()=>({ num: 0 }),
  actions: { addNum () {
    this.num++;
  } }
});
export default useUserStore;