<template>
  <div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "SignOutView",
  mounted() {
    this.$store.commit('setAccess', '')
    this.$store.commit('setRefresh', '')
    this.$store.commit('setUserName', '')

    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    this.$router.push('/')
  }
}

</script>
