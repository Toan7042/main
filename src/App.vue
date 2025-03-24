<template>
  <div id="app">
    <h1>Chuyển đổi nhiệt độ</h1>
    <age-calculator />
  </div>
</template>

<script>
import AgeCalculator from './components/Temperaturetransfer.vue';

export default {
  components: {
    AgeCalculator
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  padding: 20px;
}
</style>