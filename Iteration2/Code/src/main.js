// Iteration 2

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
// 1. Write a program to play a number guessing game. The program shall generate a random number
// between 0 and 99. The USER inputs his/her guess, and the program shall response with "Try
// higher", "Try lower" or "You got it in n trials" if the guess is correct
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

// 2. Write a program to play a number guessing game. The program shall generate a random number
// between 0 and 99. The USER inputs his/her guess, and the program shall response with "COLD"
// if the guess is more than 40 from the target number, "COOL" if the guess is within 20-39 of the
// target number, “WARM” if the guess is within 10-19 of the target number, “HOT” if the guess is
// within 1-9 of the target number or "You got it in n trials" if the guess is correct.
class GameTwo extends Game {
  calcGuess (event) {
    this.guess = parseInt(event.target.value)
    if (this.guess) {
      this.count++
      // TODO: New Logic
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
        game: [new GameOne(this.guess), new GameTwo(this.guess)],
        count: 0,
        gameNum: 1
      },
      methods: {
        // Using ES6+ syntax because browser support doesn't matter
        getCalcGuess (event) {
          console.log(this.game[this.gameNum - 1].getRandomNum())
          this.currentStatement = this.game[this.gameNum - 1].calcGuess(event)
          this.count = this.game[this.gameNum - 1].getCount()
          this.guess = this.game[this.gameNum - 1].getGuess()
        },
        pickGameNumber (event) {
          this.resetElements()
          let elementName = event.path[0].hash
          let elementNumber = elementName[elementName.length - 1]
          this.gameNum = elementNumber
        },
        resetElements () {
          this.guess = null
          this.currentStatement = ''
          this.count = 0
        }
      }
    })
  }
}
