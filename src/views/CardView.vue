<template>
  <div class="row mt-4">
    <div class="col-lg-2"></div>
    <h3 class="col-lg-4">{{ card.name }}</h3>
    <div class="col-lg-5"></div>
    <div class="col-lg-1">
      <router-link :to="`/collections/${card.related_collection}`" class="col-lg-2 link-dark">Назад</router-link>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-2"></div>
    <div class="col-lg-4">
      <img class="img-fluid rounded" :src="card.image" alt="">
    </div>
    <div class="col-lg-6"></div>
  </div>
  <br>
  <div class="row">
    <div class="col-lg-2"></div>
    <p class="col-lg-4" v-html="card.short_description"></p>
  </div>
  <div class="row">
    <div class="col-lg-2"></div>
    <p class="col-lg-6" v-html="card.long_description"></p>
  </div>
</template>


<script>

import axios from "axios";

export default {
  name: 'CardView',
  data() {
    return {
      card: {}
    }
  },

  mounted() {
    this.getCard()
  },

  methods: {
    async getCard() {
      await axios
          .get('api/cards/' + this.$route.params.id)
          .then(response => {
            console.log(response)
            this.card = response.data
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}
</script>
