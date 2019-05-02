<template>
  <div>
    <JumbotronComponent :leadString="leadString"></JumbotronComponent>
    <b-container>
      <b-card no-body>
        <b-tabs card>
          <b-tab
            v-for="aGame in game"
            :title="gameTitle(aGame.getGameNumber().toString())"
            :key="aGame.getGameNumber()"
            @click="pickGameNumber(aGame.getGameNumber())"
          >
            <b-card-text>
              <GameComponent
                :title="title"
                :guess="guess"
                :currentStatement="currentStatement"
                :count="count"
                :gameNum="gameNum"
                :getCalcGuess="getCalcGuess"
              ></GameComponent>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-container>
    <RulesComponent :rule="getGameRules()"></RulesComponent>
  </div>
</template>

<script>
import JumbotronComponent from './components/JumbotronComponent'
import GameComponent from './components/GameComponent'
import RulesComponent from './components/RulesComponent'
import {GameOne, GameTwo, GameThree, GameFour} from '@/model.js'

export default {
  data: function() {
    return {
      title: 'Guess a number',
      guess: null,
      currentStatement: '',
      game: [new GameOne(this.guess, 1), new GameTwo(this.guess, 2), new GameThree(this.guess, 3), new GameFour(this.guess, 4)],
      count: 0,
      gameNum: 1
    }
  },
  computed: {
    leadString: function() {
      return `Game Number ${this.gameNum}`
    }
  },
  methods: {
    getGameRules() {
      return this.game[this.gameNum - 1].getRules()
    },
    gameTitle(number) {
      return `Guessing Game ${number}`
    },
    getCalcGuess(state) {
      //  console.log(this.game[this.gameNum - 1].getRandomNum())
      this.currentStatement = this.game[this.gameNum - 1].calcGuess(state)
      this.count = this.game[this.gameNum - 1].getCount()
      this.guess = this.game[this.gameNum - 1].getGuess()
    },
    pickGameNumber(gameNumber) {
      this.gameNum = gameNumber
      this.resetElements()
    },
    resetElements() {
      this.guess = null
      this.currentStatement = ''
      this.count = 0
      this.game[this.gameNum - 1].resetStatus()
    }
  },
  components: {
    JumbotronComponent,
    GameComponent,
    RulesComponent
  }
}
</script>

<style>
</style>
