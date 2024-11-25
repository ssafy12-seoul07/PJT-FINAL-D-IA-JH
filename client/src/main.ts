import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './modules/shell/router'
import './assets/styles/reset.css'
import './assets/styles/global.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

import Antd from 'ant-design-vue'
import ColorPicker from '@elonmuscle/antdv-color-picker'
import '@elonmuscle/antdv-color-picker/dist/style.css'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(Antd)
app.use(router)
app.use(ColorPicker)

app.mount('#app')
