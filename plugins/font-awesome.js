import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHome,
  faInfoCircle,
  faListUl,
  faQuestionCircle,
  faTimes,
  faChevronCircleLeft,
  faChevronCircleRight
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faHome,
  faInfoCircle,
  faListUl,
  faQuestionCircle,
  faTimes,
  faChevronCircleLeft,
  faChevronCircleRight
)
Vue.component('font-awesome-icon', FontAwesomeIcon)
