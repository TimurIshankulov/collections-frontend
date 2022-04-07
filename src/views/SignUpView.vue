<template>
  <div class="row">
    <div class="col-lg-5"></div>
    <div class="col-lg-2 text-center">
      <form class="form-signup" @submit.prevent="userSignUp">
        <h1 class="h3 mb-3 mt-3 font-weight-normal">Регистрация</h1>
        <input id="inputUsername" class="form-control" placeholder="Имя пользователя" required=""
               v-model="username">
        <input type="password" id="inputPassword" class="form-control mt-2" placeholder="Пароль" required=""
               v-model="password">
        <input type="password" id="ReInputPassword" class="form-control mt-2" placeholder="Повторите пароль" required=""
               v-model="password2">
        <button class="btn mt-2 btn-lg btn-primary btn-block" type="submit">Зарегистрироваться</button>
      </form>
    </div>
  </div>
  <div class="col-lg-5"></div>

</template>

<script>
import axios from 'axios'

export default {
  name: "SignUpView",
  data() {
    return {
      username: '',
      password: '',
      password2: '',
    }
  },
  methods: {
    userSignUp() {
      console.log('here')
      const signUpFormData = {
        username: this.username,
        password: this.password,
        password2: this.password2
      }
      axios
          .post('/api/signup/', signUpFormData)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      this.userLogin()
    },
    async userLogin() {
      axios.defaults.headers.common['Authorization'] = ''
      localStorage.removeItem('access')

      const signInFormData = {
        username: this.username,
        password: this.password
      }

      await axios
          .post('/api/token/', signInFormData)
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

    }
  }
}
</script>
