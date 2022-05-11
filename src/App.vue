<template>
  <NavigationBar/>
  <router-view/>
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
    this.getAccess()
    this.getUserProfile()
  },
  created() {

  },
  methods: {
    getAccess() {
      if (this.$store.state.refresh) {
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
              if (error.response.status === 401) {
                this.$store.dispatch('doSignOut')
              }
              console.log(error)
            })
      }
    },

    getUserProfile() {
      axios
          .get('api/profile/')
          .then(response => {
            const dust = response.data.user.dust
            this.$store.commit('setDust', dust)
          })
          .catch(error => {
            if (error.response.status === 401) {
              this.$store.dispatch('doSignOut')
              this.$router.push('/signin')
            }
            console.log(error)
          })
    }
  }
}
</script>

<style>

</style>
