<template>
  <div class="gameContent">
    <b-container v-if="gameNum === 1 || gameNum === 2">
      <h1>Game {{ gameNum }}</h1>
      <h2>{{ title }}</h2>
      <b-form-input @keypress.enter="getCalcGuess" :value="guess" type="number" min="0" max="99"></b-form-input>
      <p>Total Guesses: {{ count }}</p>
      <b-alert
        v-if="currentStatement && !currentStatement.includes('You got it in')"
        show
      >{{ currentStatement }}</b-alert>
      <b-alert
        v-else-if="currentStatement.includes('You got it in')"
        variant="success"
        show
      >{{ currentStatement }}</b-alert>
    </b-container>
    <b-container v-else-if="gameNum === 3 || gameNum === 4">
      <h1>Game {{ gameNum }}</h1>
      <b-button
        variant="outline-primary"
        class="start"
        v-if="!currentStatement"
        @click="getCalcGuess"
      >START</b-button>
      <div v-if="currentStatement">
        <h1>Was this your number?</h1>
        <b-alert :variant="correctStatus" show>{{ currentStatement }}</b-alert>
        <p>Total Guesses: {{ count }}</p>
        <b-button-group>
          <b-button variant="info" class="tryLower" @click="getCalcGuess('Lower')">Try Lower</b-button>
          <b-button variant="success" class="correct" @click="alterCorrect">Correct</b-button>
          <b-button variant="info" class="tryHigher" @click="getCalcGuess('Higher')">Try Higher</b-button>
        </b-button-group>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "GameComponent",
  data: function() {
    return {
      correctStatus: "info"
    }
  },
  methods: {
    alterCorrect() {
      !this.currentStatement
        ? (this.correctStatus = "info")
        : (this.correctStatus = "success")
      setTimeout(() => {
        if ((this.correctStatus = "success")) this.correctStatus = "info"
      }, 5000)
    }
  },
  props: {
    title: String,
    guess: Number,
    currentStatement: String,
    count: Number,
    gameNum: Number,
    getCalcGuess: Function
  }
}
</script>

<style scoped>
.gameContent {
  text-align: center;
  margin: 0 auto;
}
</style>
