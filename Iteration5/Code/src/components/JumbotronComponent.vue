<template>
  <div>
    <b-jumbotron header="Software Engineering 2 Assignment 1" :lead="leadString">
      <p>PSP Assignment - Nick Leslie</p>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  props: {
    leadString: String
  }
};
</script>

<style scoped>
</style>