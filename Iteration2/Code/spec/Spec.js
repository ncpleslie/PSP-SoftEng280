describe('Game Setup', function () {
  var game = new Game('This is a guess')

  // Check if it returns a number
  it('should return a random number', function () {
    expect(game.getRandomNum()).toMatch(/\d{1,}/)
  })

  // Should return 0
  it('Should return initial 0', function () {
    expect(game.getCount()).toBe(0)
  })

  // Should return 'This is a guess'
  it("Should return 'This is a guess'", function () {
    expect(game.getGuess()).toBe('This is a guess')
  })
})

describe('GameOne Exact Guess', function () {
  const game = new GameOne('This is a guess')
  game.randomNum = 50

  // Check if it returns a number
  it('should return a random number', function () {
    expect(game.getRandomNum()).toEqual(jasmine.any(Number))
  })

  // Should return 0
  it('Should return initial 0', function () {
    expect(game.getCount()).toBe(0)
  })

  // Should return 'This is a guess'
  it("Should return 'This is a guess'", function () {
    expect(game.getGuess()).toBe('This is a guess')
  })

  const event = { target: { value: 50 } }

  // Should return 'You got it in 1 trials'
  it("Should return 'You got it in 1 trials'", function () {
    expect(game.calcGuess(event)).toBe('You got it in 1 trials')
  })
})

describe('GameOne Low Guess', function () {
  const game = new GameOne('This is a guess')
  game.randomNum = 70
  const event = { target: { value: 50 } }

  // Should return 'Try Higher'
  it("Should return 'Try Higher", function () {
    expect(game.calcGuess(event)).toBe('Try Higher')
  })
})

describe('GameOne High Guess', function () {
  const game = new GameOne('This is a guess')
  game.randomNum = 30
  const event = { target: { value: 50 } }

  // Should return 'Try Lower'
  it("Should return 'Try Lower'", function () {
    expect(game.calcGuess(event)).toBe('Try Lower')
  })
})
