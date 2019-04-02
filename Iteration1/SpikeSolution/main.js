// eslint-disable-next-line no-unused-vars
class Controller {
  main () {
    const model = new Model()
    model.loadQuestion1()
  }
}

class Model {
  loadQuestion1 () {
    // eslint-disable-next-line no-unused-vars, no-undef
    let vueInstance = new Vue({
      el: '#app1',
      methods: {
        // Using ES6+ syntax because browser support doesn't matter
        generateNum () {
          let randomNum = Math.floor(Math.random() * 99)
          console.log(randomNum)
        }
      }
    })
  }
}
