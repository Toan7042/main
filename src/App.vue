<template>
  <div id="app">
    <h1>Age Calculator</h1>
    <b-m-i-calculator />
  </div>
</template>

<script>
import BMICalculator from './components/BMICalculator.vue';



export default {
  components: {
    BMICalculator
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