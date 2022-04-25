<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <router-link class="navbar-brand ms-2" to="/">
      <img src="@/assets/logo.png" width="40" height="30" alt="logo">
    </router-link>
    <ul class="navbar-nav me-auto">
      <li class="nav-item active">
        <router-link class="nav-link" to="/">Главная</router-link>
      </li>
      <li class="nav-item ">
        <router-link class="nav-link" to="/contact">Контакты</router-link>
      </li>
    </ul>
    <span class="navbar-text me-3" v-if="isLoggedIn">{{ userName }}</span>
    <template v-if="isLoggedIn">
      <router-link class="btn btn-outline-light me-2" to="/collections">Коллекции</router-link>
      <router-link class="btn btn-outline-light me-2" to="/my/cards">Мои карточки</router-link>
      <router-link class="btn btn-outline-light me-2" to="/signout">Выход</router-link>
    </template>
    <template v-else>
      <router-link class="btn btn-outline-light me-2" to="/signin">Вход</router-link>
      <router-link class="btn btn-outline-light me-2" to="/signup">Регистрация</router-link>
    </template>
  </nav>
</template>

<script>

export default {
  name: 'NavigationBar',
  props: {},
  data() {
    return {

    }
  },
  methods: {

  },
  computed: {
    isLoggedIn() {
      return !!this.$store.state.access;
    },
    userName() {
      return this.$store.state.username
    }
  }
}

</script>
