import {shallowMount} from "@vue/test-utils"
import JumbotronComponent from "../src/components/JumbotronComponent"
import GameComponent from "../src/components/GameComponent"
import RulesComponent from "../src/components/RulesComponent"
import MainApp from "../src/App"

describe("JumbotronComponent.vue", () => {
  it("Renders props.leadString when passed", () => {
    const leadString = "This is a message"
    const wrapper = shallowMount(JumbotronComponent, {
      propsData: {leadString}
    })
    expect(wrapper.vm.leadString).toMatch(leadString)
  })
})

describe("GameComponent.vue", () => {
  it("Renders props.title when passed", () => {
    const msg = "This is a message"
    const num = 1
    const wrapper = shallowMount(GameComponent, {
      propsData: {
        title: msg,
        guess: num,
        currentStatement: msg,
        count: num,
        gameNum: num
      }
    })
    expect(wrapper.vm.title).toMatch(msg)
    expect(wrapper.vm.currentStatement).toMatch(msg)
    expect(wrapper.vm.guess).toBe(num)
    expect(wrapper.vm.count).toBe(num)
    expect(wrapper.vm.gameNum).toBe(num)
  })
})

describe("RulesComponent.vue", () => {
  it("Renders props.leadString when passed", () => {
    const msg = "This is a message"
    const wrapper = shallowMount(RulesComponent, {
      propsData: {rule: msg}
    })
    expect(wrapper.vm.rule).toMatch(msg)
  })
})

describe("App.vue", () => {
  it("Two games loaded", () => {
    const wrapper = shallowMount(MainApp, {
      propsData: {
        game: [new GameOne(null, 1), new GameTwo(null, 2)]
      }
    })
    expect(wrapper.findAll(GameComponent).length).toBe(2)
  })
})

class Game {
  constructor(newGuess, gameNumber) {
    this.randomNum = Math.floor(Math.random() * 99)
    this.guess = newGuess
    this.count = 0
    this.gameNumber = gameNumber
  }

  getDifference(a, b) {
    return Math.abs(a - b)
  }

  getRandomNum() {
    return this.randomNum
  }

  getCount() {
    return this.count
  }

  getGuess() {
    return this.guess
  }

  getGameNumber() {
    return this.gameNumber
  }

  resetRandNum() {
    this.randomNum = Math.floor(Math.random() * 99)
  }
}

class GameOne extends Game {
  calcGuess(event) {
    this.guess = parseInt(event.target.value)
    if (this.guess) {
      this.count++
      if (this.guess > 99) this.guess = 99
      if (this.guess < this.randomNum) return "Try Higher"
      if (this.guess > this.randomNum) return "Try Lower"
      if (this.guess === this.randomNum) {
        return `You got it in ${this.count} trials`
      }
    } else {
      return "Please input a number"
    }
  }

  getRules() {
    return 'Write a program to play a number guessing game. The program shall generate a random number between 0 and 99. The USER inputs his/her guess, and the program shall response with "Try higher", "Try lower" or "You got it in n trials" if the guess is correct'
  }
}

class GameTwo extends Game {
  calcGuess(event) {
    this.guess = parseInt(event.target.value)
    if (this.guess) {
      this.count++
      if (this.guess > 99) this.guess = 99
      if (this.guess < 1) this.guess = 1
      let difference = this.getDifference(this.guess, this.randomNum)
      if (difference >= 40) return "COLD"
      if (difference >= 20 && difference <= 39) return "COOL"
      if (difference >= 10 && difference <= 19) return "WARM"
      if (difference >= 1 && difference <= 9) return "HOT"
      if (this.guess === this.randomNum) {
        return `You got it in ${this.count} trials`
      }
    } else {
      return "Please input a number"
    }
  }

  getRules() {
    return 'Write a program to play a number guessing game. The program shall generate a random number between 0 and 99. The USER inputs his/her guess, and the program shall response with "COLD" if the guess is more than 40 from the target number, "COOL" if the guess is within 20-39 of the target number, “WARM” if the guess is within 10-19 of the target number, “HOT” if the guess is within 1-9 of the target number or "You got it in n trials" if the guess is correct.'
  }
}
