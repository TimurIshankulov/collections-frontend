<template>
  <div class="row ms-4 mt-4">
    <h3 class="col-lg-4">{{ collection.name }}</h3>
    <div class="col-lg-7"></div>
    <router-link :to="`/collections/`" class="col-lg-1 link-dark">Назад</router-link>
  </div>
  <div class="row ms-3 mt-3 me-3">
    <div class="col-lg-6">
      <img class="img-fluid rounded" :src="collection.image" alt="">
    </div>
    <div class="col-lg-6">
      <p v-html="collection.description"></p>
    </div>
  </div>
  <br>
  <div class="ms-4 mt-3 mb-3">
    <h4 class="col-lg-4">{{ collection.n_cards }} карточек в коллекции</h4>
  </div>
  <div class="row ms-3 me-3">
    <div v-for="card in cards" :key="card.id" class="col-md-3">
      <div class="card border-dark mb-4 shadow-sm">
        <img :src="card.image" alt="" class="card-img-top img-fluid rounded">
        <div class="card-body">
          <h5 class="card-title">{{ card.name }}</h5>
          <div v-html="card.short_description" class="truncate"></div>
        </div>
        <router-link :to="`/cards/${card.id}`" class="stretched-link"></router-link>
      </div>
    </div>
  </div>
</template>


<script>

import axios from "axios";

export default {
  name: 'CollectionView',
  data() {
    return {
      collection: {},
      card_ids: [],
      cards: []
    }
  },

  mounted() {
    this.getCollection()
  },

  methods: {
    async getCollection() {
      await axios
          .get('api/collections/' + this.$route.params.id)
          .then(response => {
            console.log(response)
            this.collection = response.data
          })
          .catch(error => {
            console.log(error)
          })
      for (let i = 0; i < this.collection.cards.length; i++) {
        await axios
            .get('api/cards/' + this.collection.cards[i])
            .then(response => {
              console.log(response)
              this.cards.push(response.data)
            })
            .catch(error => {
              console.log(error)
            })
      }
    },
  }
}
</script>
