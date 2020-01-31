import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faPlay, faPause, faFastBackward, faFastForward, faHome, faSearch, faMusic } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHotjar } from '@fortawesome/free-brands-svg-icons'

const icons = [faUserSecret, faPlay, faPause, faFastBackward, faFastForward, faHome, faSearch, faMusic, faHotjar]

export default () => {
  icons.forEach(icon => library.add(icon))

  Vue.component('font-awesome-icon', FontAwesomeIcon)
}

