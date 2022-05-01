<template>
  <div>
    <div class="row">
      <div class="col-lg-5"></div>
      <div class="col-lg-2 text-center">
        <form class="form-signin" @submit.prevent="userLogin">
          <h1 class="h3 mb-3 mt-3 font-weight-normal">Вход</h1>

          <input id="inputUsername" class="form-control" placeholder="Имя пользователя" required=""
                 v-model="username">

          <input type="password" id="inputPassword" class="form-control mt-2" placeholder="Пароль" required=""
                 v-model="password">
          <button class="btn mt-2 btn-lg btn-primary btn-block" type="submit">Войти</button>
        </form>
      </div>
      <div class="col-lg-5"></div>
    </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "SignInView",
  data() {
    return {
      username: '',
      password: ''
    }
  },

  mounted() {

  },

  methods: {
    async userLogin() {
      axios.defaults.headers.common['Authorization'] = ''
      localStorage.removeItem('access')

      const formData = {
        username: this.username,
        password: this.password
      }

      await axios
          .post('/api/token/', formData)
          .then(response => {
            console.log(response)
            const access = response.data.access
            const refresh = response.data.refresh

            this.$store.commit('setAccess', access)
            this.$store.commit('setRefresh', refresh)

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access
            localStorage.setItem('access', access)
            localStorage.setItem('refresh', refresh)
            this.$router.back()
          })
          .catch(error => {
            console.log(error)
          })
      await axios
          .get('api/user/')
          .then(response => {
            console.log(response)
            const username = response.data.user.username
            this.$store.commit('setUserName', username)
          })
          .catch(error => {
            console.log(error)
          })
      this.getUserProfile()
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
