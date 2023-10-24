<template>
  <div>
      hello
  </div>
</template>
<script>
// import a from '../../toyar.config.js';
import totyar from '/toyar.config.js';
export default {
  name: 'hello',
  data () {
    return {};
  },
  created () {
    // console.log(a);
    console.log(totyar.a);
  }
};
</script>
<style  scoped>

</style>
