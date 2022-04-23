<template>
  <NavigationBar />
  <StatusBar />
  <router-view />
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue'
import axios from "axios";
import StatusBar from "@/components/StatusBar";

axios.defaults.baseURL = 'http://localhost:8000';

export default {
  name: 'App',
  components: {
    StatusBar,
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
              console.log(error)
              this.$router.push('/signout')
            })
      } else {
        this.$router.push('/signout')
        this.$router.push('/signin')
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
            console.log(error)
          })
    }
  }
}
</script>

<style>

</style>
