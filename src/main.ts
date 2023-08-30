/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Create a new store instance
import { createStore } from 'vuex'
const store = createStore({
    state () {
        return {
            sampleId: -1,
            name: ""
        }
    },
    getters: {
        getSample: state => { return state.sampleId },
        getName: state => { return state.name }
    },
    mutations: {
        setSample(state, id) {
            if (id >= 0) {
                state.sampleId = id
            }
        },
        setName(state, name) {
            state.name = name
        }
    }
})

const app = createApp(App)

registerPlugins(app)

app.use(store)
app.mount('#app')
