// Iteration 1
// 1. Write a program to play a number guessing game. The program shall generate a random number
// between 0 and 99. The USER inputs his/her guess, and the program shall response with "Try
// higher", "Try lower" or "You got it in n trials" if the guess is correct

class Main {
    main() {
        this.loadQuestion1()
    }

    loadQuestion1() {
        let randomNum = Math.floor(Math.random() * 99)
        new Vue({
            el: '#app1',
            data: {
                title: 'Guess a number',
                guess: null,
                count: 0,
                currentStatement: ''
            },
            methods: {
                // Using ES6+ syntax because browser support doesn't matter
                calcGuess(event) {
                    this.count++
                    this.guess = event.target.value
                    if (this.guess < randomNum) this.currentStatement = 'Try Higher'
                    if (this.guess > randomNum) this.currentStatement = 'Try Lower'
                    if (this.guess == randomNum) this.currentStatement = `You got it in ${this.count} trials`
                }
            },
        })
    }
}