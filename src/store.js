import createPersistedState from "vuex-persistedstate"
import { createStore } from 'vuex'
import axios from "axios";

const store = createStore({
    state: {
        access: '',
        refresh: '',
        username: '',
        dust: ''
    },
    mutations: {
        initializeStore(state) {
            if (localStorage.getItem('access')) {
                state.access = localStorage.getItem('access')
                state.refresh = localStorage.getItem('refresh')
            } else {
                state.access = ''
                state.refresh = ''
            }
        },
        setAccess(state, access) {
            state.access = access
        },
        setRefresh(state, refresh) {
            state.refresh = refresh
        },
        setUserName(state, username) {
            state.username = username
        },
        setDust(state, dust) {
            state.dust = dust
        }
    },
    actions: {
        async doSignOut(context) {
            context.commit('setAccess', '')
            context.commit('setRefresh', '')
            context.commit('setUserName', '')
            context.commit('setDust', '')
            axios.defaults.headers.common['Authorization'] = ''
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
        }
    },
    modules: {

    },
    plugins: [createPersistedState()],
})
export default store;
