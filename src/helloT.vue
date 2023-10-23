<template>
  <div>
    {{  useUser.num }}
      测试内容
      <button @click="fn">11</button>
  </div>
</template>
<script >
import useUserStore from '@/store/modules/user';
export default { setup () {
  const useUser = useUserStore();
  function fn () {
    useUser.addNum();
  }
  return {
    useUser,
    fn
  };
} };
</script>
<style  scoped>

</style>
