<template>
  <div>
  </div>
</template>

<script>

export default {
  name: "SignOutView",
  mounted() {
    this.$store.dispatch('doSignOut')
    this.$router.push('/')
  }
}

</script>
