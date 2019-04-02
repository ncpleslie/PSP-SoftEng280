// Iteration 1
// 1. Write a program to play a number guessing game. The program shall generate a random number
// between 0 and 99. The USER inputs his/her guess, and the program shall response with "Try
// higher", "Try lower" or "You got it in n trials" if the guess is correct

// eslint-disable-next-line no-unused-vars
class Main {
  main () {
    const controller = new Controller()
    controller.loadQuestion1()
  }
}

// MODEL
class Game {
  constructor (newGuess) {
    this.randomNum = Math.floor(Math.random() * 99)
    this.guess = newGuess
    this.count = 0
  }

  getRandomNum () {
    return this.randomNum
  }

  getCount () {
    return this.count
  }

  getGuess () {
    return this.guess
  }
}

class GameOne extends Game {
  calcGuess (event) {
    this.guess = parseInt(event.target.value)
    if (this.guess) {
      this.count++
      if (this.guess > 99) this.guess = 99
      if (this.guess < this.randomNum) return 'Try Higher'
      if (this.guess > this.randomNum) return 'Try Lower'
      if (this.guess === this.randomNum) return `You got it in ${this.count} trials`
    } else {
      return 'Please input a number'
    }
  }
}

// CONTROLLER
class Controller {
  loadQuestion1 () {
    // eslint-disable-next-line no-unused-vars, no-undef
    let vueInstance = new Vue({
      el: '#app1',
      data: {
        title: 'Guess a number',
        guess: null,
        currentStatement: '',
        game: {
          games: [
            new GameOne(this.guess)] },
        count: 0
      },
      methods: {
        // Using ES6+ syntax because browser support doesn't matter
        getCalcGuess (event) {
          console.log(this.game.games[0].getRandomNum())
          this.currentStatement = this.game.games[0].calcGuess(event)
          this.count = this.game.games[0].getCount()
          this.guess = this.game.games[0].getGuess()
        }
      }
    })
  }
}
