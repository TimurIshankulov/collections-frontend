<template>
  <div class="row me-auto">
    <p class="text-end">{{ amountOfDust }} Пыли</p>
  </div>
</template>

<script>
export default {
  name: 'StatusBar',
  data() {
    return {
      dust: 0
    }
  },
  computed: {
    amountOfDust() {
      return this.$store.state.dust
    }
  }
}
</script>
