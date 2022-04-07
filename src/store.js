import createPersistedState from "vuex-persistedstate"
import { createStore } from 'vuex'

const store = createStore({
    state: {
        access: '',
        refresh: ''
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
        }
    },
    actions: {

    },
    modules: {

    },
    plugins: [createPersistedState()],
})
export default store;
