<template>
  <NavigationBar />
  <router-view />
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue'
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000';

export default {
  name: 'App',
  components: {
    NavigationBar,
  },
  beforeCreate() {
    this.$store.commit('initializeStore')
    const access = this.$store.state.access
    if (access) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access
    } else {
      axios.defaults.headers.common['Authorization'] = ''
    }
  },
  mounted() {
    setInterval(() => {
      this.getAccess()
    }, 60000)
  },
  methods: {
    getAccess() {
      const accessData = {
        refresh: this.$store.state.refresh
      }

      axios
          .post('api/refresh_token/', accessData)
          .then(response => {
            const access = response.data.access

            localStorage.setItem('access', access)
            this.$store.commit('setAccess', access)
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}
</script>

<style>

</style>
