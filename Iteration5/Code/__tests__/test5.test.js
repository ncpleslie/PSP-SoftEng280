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
  const wrapper = mount(GameComponent, {
    propsData: {
      gameNum: 4,
      currentStatement: 'ForceStartGame'
    }
  })
  let buttons = wrapper.findAll('button')
  it('5 Buttons will be rendered', () => {
    expect(buttons.length).toBe(5)
  })
})

describe('App.vue', () => {
  const wrapper = mount(GameComponent, {
    propsData: {
      gameNum: 4
    }
  })
  let buttons = wrapper.findAll('button')
  it('1 Button will be rendered', () => {
    expect(buttons.length).toBe(1)
  })
})
