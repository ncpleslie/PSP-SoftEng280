import {mount, createLocalVue, shallowMount} from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import JumbotronComponent from '../src/components/JumbotronComponent'
import GameComponent from '../src/components/GameComponent'
import RulesComponent from '../src/components/RulesComponent'
import MainApp from '../src/App'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('App.vue', () => {
  it('tryLower, tryHigher, Correct should appear if currentStatement is True', () => {
    const wrapper = mount(GameComponent, {
      propsData: {
        gameNum: 3,
        currentStatement: 'This is a message'
      }
    })
    let buttons = wrapper.find('button.tryLower')
    expect(buttons.exists()).toBe(true)
    buttons = wrapper.find('button.tryHigher')
    expect(buttons.exists()).toBe(true)
    buttons = wrapper.find('button.correct')
    expect(buttons.exists()).toBe(true)
  })
})

describe('App.vue', () => {
  it('Start button should appear if currentStatement is False', () => {
    const wrapper = mount(GameComponent, {
      propsData: {
        gameNum: 3
      }
    })
    let buttons = wrapper.find('button.start')
    expect(buttons.exists()).toBe(true)
  })
})

describe('App.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(MainApp, {
      mocks: {
        GameComponent
      },
      title: 'Guess a number',
      guess: null,
      currentStatement: '',
      game: [new GameThree(null, 3)],
      count: 0,
      gameNum: 3
    })
  })
  it('checks the component exists', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('Checks buttons exists and changes if clicked', () => {
    wrapper.vm.$nextTick().then(() => {
      console.log('he1')
      let game = wrapper.find(GameComponent)
      expect(game.exists()).toBe(true)
      let button = game.find('button.start')
      expect(button.exists()).toBe(true)
      // buttons.trigger('click')
      console.log('he2')
    })
  })
})

describe('App.vue', () => {
  it('Start button should appear if currentStatement is False', () => {
    const wrapper = mount(GameComponent, {
      propsData: {
        gameNum: 3
      }
    })
    let buttons = wrapper.find('button.start')
    expect(buttons.exists()).toBe(true)
  })
})

describe('App.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(MainApp, {
      mocks: {
        GameComponent
      },
      title: 'Guess a number',
      guess: null,
      currentStatement: '',
      game: [
        new GameOne(null, 1),
        new GameTwo(null, 2),
        new GameThree(null, 3)
      ],
      count: 0,
      gameNum: 1
    })
  })
  it('checks the component exists', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('Checks if three components loaded', () => {
    wrapper.vm.$nextTick().then(() => {
      let game = wrapper.findAll(GameComponent)
      expect(game.length).toEqual(3)
    })
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
      if (this.guess < this.randomNum) return 'Try Higher'
      if (this.guess > this.randomNum) return 'Try Lower'
      if (this.guess === this.randomNum) {
        return `You got it in ${this.count} trials`
      }
    } else {
      return 'Please input a number'
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
      if (this.guess > this.highestNumber) this.guess = this.highestNumber
      if (this.guess < this.lowestNumber) this.guess = this.lowestNumber
      let difference = this.getDifference(this.guess, this.randomNum)
      if (difference >= 40) return 'COLD'
      if (difference >= 20 && difference <= 39) return 'COOL'
      if (difference >= 10 && difference <= 19) return 'WARM'
      if (difference >= 1 && difference <= 9) return 'HOT'
      if (this.guess === this.randomNum) {
        return `You got it in ${this.count} trials`
      }
    } else {
      return 'Please input a number'
    }
  }

  getRules() {
    return 'Write a program to play a number guessing game. The program shall generate a random number between 0 and 99. The USER inputs his/her guess, and the program shall response with "COLD" if the guess is more than 40 from the target number, "COOL" if the guess is within 20-39 of the target number, “WARM” if the guess is within 10-19 of the target number, “HOT” if the guess is within 1-9 of the target number or "You got it in n trials" if the guess is correct.'
  }
}

class GameThree extends Game {
  calcGuess(event) {
    this.count++
    if (this.guess == null) {
      this.guess = this.randomNum
      return this.getRandomNum().toString()
    }
  }

  tryHigher() {
    if (this.lowestNumber === this.highestNumber) return 'You lying?'
    this.count++
    this.lowestNumber = this.guess
    let returningNumber = Math.floor(
      Math.random() * (this.highestNumber - this.lowestNumber + 1) +
        this.lowestNumber
    )
    this.guess = returningNumber
    return returningNumber.toString()
  }

  tryLower() {
    if (this.lowestNumber === this.highestNumber) return 'You lying?'
    this.count++
    this.highestNumber = this.guess
    let returningNumber = Math.floor(
      Math.random() * (this.highestNumber - this.lowestNumber + 1) +
        this.lowestNumber
    )
    this.guess = returningNumber
    return returningNumber.toString()
  }

  getRules() {
    return 'String'
  }
}
