// eslint-disable-next-line no-unused-vars
class Game {
  constructor(newGuess, gameNumber) {
    this.highestNumber = 99
    this.lowestNumber = 1
    this.randomNum = Math.floor(Math.random() * (this.highestNumber - this.lowestNumber + 1)) + this.lowestNumber
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

  resetStatus() {
    this.randomNum = Math.floor(Math.random() * (this.highestNumber - this.lowestNumber + 1)) + this.lowestNumber
    this.count = 0
    this.highestNumber = 99
    this.lowestNumber = 1
    this.guess = null
    this.storedNumState = {
      hotNum: null,
      warmNum: null,
      coolNum: null,
      coldNum: null
    }
    this.usedNum = []
    this.loopPrevention = 0
  }

  isString(value) {
    return typeof value === 'string' || value instanceof String
  }
}

export class GameOne extends Game {
  calcGuess(event) {
    this.guess = parseInt(event.target.value, 10)
    if (this.guess) {
      this.count++
      if (this.guess > this.highestNumber) this.guess = this.highestNumber
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

export class GameTwo extends Game {
  calcGuess(event) {
    this.guess = parseInt(event.target.value, 10)
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

export class GameThree extends Game {
  calcGuess(state) {
    this.count++
    if (this.guess == null) {
      this.guess = this.randomNum
      return this.getRandomNum().toString()
    }
    if (state === 'Higher') return this.tryHigher()
    if (state === 'Lower') return this.tryLower()
  }

  tryHigher() {
    if (this.lowestNumber === this.highestNumber) return 'You lying?'
    this.lowestNumber = this.guess
    let returningNumber = Math.floor(Math.random() * (this.highestNumber - this.lowestNumber + 1)) + this.lowestNumber
    this.guess = returningNumber
    return returningNumber.toString()
  }

  tryLower() {
    if (this.lowestNumber === this.highestNumber) return 'You lying?'
    this.highestNumber = this.guess
    let returningNumber = Math.floor(Math.random() * (this.highestNumber - this.lowestNumber + 1)) + this.lowestNumber
    this.guess = returningNumber
    return returningNumber.toString()
  }

  getRules() {
    return 'Write a program to play a number guessing game. The USER mentally selects a number between 0 and 99 and the computer ties to guess it. The computer outputs its guess, and the User response with "Try higher", "Try lower" or “correct”. The computer should keep count of the number of guesses. The computer should complain if the USER has lied.'
  }
}

export class GameFour extends Game {
  constructor(newGuess, gameNumber) {
    super(newGuess, gameNumber)
    this.storedNumState = {
      hotNum: null,
      warmNum: null,
      coolNum: null,
      coldNum: null
    }
    this.usedNum = []
    this.loopPrevention = 0
  }
  calcGuess(state) {
    this.count++
    if (this.guess == null) {
      this.guess = this.randomNum
      return this.getRandomNum().toString()
    }
    if (state === 'COLD') return this.getCold()
    if (state === 'COOL') return this.getCool()
    if (state === 'WARM') return this.getWarm()
    if (state === 'HOT') return this.getHot()
  }

  getCold() {
    if (this.storedNumState.hotNum) return this.getHot()
    if (this.storedNumState.warmNum) return this.getWarm()
    if (this.storedNumState.coolNum) return this.getCool()

    if (!this.storedNumState.coldNum) this.storedNumState.coldNum = this.guess

    let differenceAmount = 99
    let randNumInRange = this.getRandNumWithinRange(this.storedNumState.coldNum, differenceAmount)
    if (!this.isString(randNumInRange)) this.guess = randNumInRange
    console.log(`Cold Function: Min: ${this.storedNumState.coldNum - differenceAmount} Max: ${this.storedNumState.coldNum + differenceAmount} Base Number: ${this.storedNumState.coldNum} Chosen Number: ${randNumInRange}`)
    console.log(this.storedNumState)
    return randNumInRange.toString()
  }

  getCool() {
    if (this.storedNumState.hotNum) return this.getHot()
    if (this.storedNumState.warmNum) return this.getWarm()

    if (!this.storedNumState.coolNum) this.storedNumState.coolNum = this.guess

    let differenceAmount = 39
    let randNumInRange = this.getRandNumWithinRange(this.storedNumState.coolNum, differenceAmount)
    if (!this.isString(randNumInRange)) this.guess = randNumInRange
    console.log(`Cool Function: Min: ${this.storedNumState.coolNum - differenceAmount} Max: ${this.storedNumState.coolNum + differenceAmount} Base Number: ${this.storedNumState.coolNum} Chosen Number: ${randNumInRange}`)
    console.log(this.storedNumState)

    return randNumInRange.toString()
  }

  getWarm() {
    if (this.storedNumState.hotNum) return this.getHot()
    if (!this.storedNumState.warmNum) this.storedNumState.warmNum = this.guess

    let differenceAmount = 19
    let randNumInRange = this.getRandNumWithinRange(this.storedNumState.warmNum, differenceAmount)
    if (!this.isString(randNumInRange)) this.guess = randNumInRange
    console.log(`Warm Function: Min: ${this.storedNumState.warmNum - differenceAmount} Max: ${this.storedNumState.warmNum + differenceAmount} Base Number: ${this.storedNumState.warmNum} Chosen Number: ${randNumInRange}`)
    console.log(this.storedNumState)

    return randNumInRange.toString()
  }

  getHot() {
    if (!this.storedNumState.hotNum) this.storedNumState.hotNum = this.guess

    let differenceAmount = 9
    let randNumInRange = this.getRandNumWithinRange(this.storedNumState.hotNum, differenceAmount)
    if (!this.isString(randNumInRange)) this.guess = randNumInRange
    console.log(`Hot Function: Min: ${this.storedNumState.hotNum - differenceAmount} Max: ${this.storedNumState.hotNum + differenceAmount} Base Number: ${this.storedNumState.hotNum} Chosen Number: ${randNumInRange}`)
    console.log(this.storedNumState)

    return randNumInRange.toString()
  }

  getRandNumWithinRange(num, range) {
    let maxNum = num + range
    let minNum = num - range
    maxNum = this.numberChecker(maxNum)
    minNum = this.numberChecker(minNum)
    console.log(`Min: ${minNum} Max: ${maxNum}`)
    let randNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
    randNum = this.numberUsedChecker(randNum, num, range)
    return randNum
  }

  // Prevent the system from generating the same number multiple times
  numberUsedChecker(randNum, num, range) {
    if (this.usedNum.includes(randNum) && this.loopPrevention <= 99) {
      this.loopPrevention++
      if (this.loopPrevention === 99) return 'Cheating?'
      return this.getRandNumWithinRange(num, range)
    } else if (!this.usedNum.includes(randNum) && this.loopPrevention <= 99) {
      this.usedNum.push(randNum)
      console.log(this.usedNum.sort())
      return randNum
    } else {
      return "You're probably cheating"
    }
  }

  // Check numbers are within range (0 to 99)
  numberChecker(num) {
    if (num < this.lowestNumber) num = this.lowestNumber
    if (num > this.highestNumber) num = this.highestNumber
    return num
  }

  getRules() {
    return 'Write a program to play a number guessing game. The USER mentally selects a number between 0 and 99 and the computer ties to guess it. The computer outputs its guess, and the User response with "COLD" if the guess is more than 40 from the target number, "COOL" if the guess is within 20-39 of the target number, “WARM” if the guess is within 10-19 of the target number, “HOT” if the guess is within 1-9 of the target number or “correct”. The computer should keep count of the number of guesses. The computer should complain if the USER has lied.'
  }
}
