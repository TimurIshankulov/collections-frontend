<template>
  <div class="row ms-4 mt-4 me-auto">
    <h3 class="col-lg-4">{{ collection.name }}</h3>
    <div class="col-lg-7"></div>
    <router-link :to="`/collections/`" class="col-lg-1 link-dark">Назад</router-link>
  </div>
  <div class="row ms-3 mt-3 me-3">
    <div class="col-lg-6">
      <img class="img-fluid img-shadow rounded" :src="collection.image1" alt="">
      <img class="img-fluid img-shadow rounded mt-3 " :src="collection.image2" alt="">
      <img class="img-fluid img-shadow rounded mt-3 " :src="collection.image3" alt="">
    </div>
    <div class="col-lg-6">
      <p v-html="collection.long_description"></p>
    </div>
  </div>
  <br>
  <div class="ms-4 mt-3 mb-3">
    <h4 class="col-lg-4">
      Собрано {{ this.acquired.length }} из {{ this.cards.length }} карточек в коллекции
    </h4>
  </div>
  <div class="row ms-3 me-3">
    <div v-for="card in cards" :key="card.id" class="col-md-2">
      <div class="card card-fixed-height mb-4" :class="getRarityClass(card.rarity)">
        <template v-if="this.acquired.includes(card.id)">
          <img :src="card.image" alt="" class="card-img-top img-fluid rounded">
        </template>
        <template v-else>
          <img :src="card.image_grayscaled" alt="" class="card-img-top img-fluid rounded">
        </template>
        <div class="card-body">
          <h5 class="card-title">{{ card.name }}</h5>
          <div v-html="card.short_description" class="p-small"></div>
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
      cards: [],
      acquired: [],
      not_acquired: []
    }
  },

  mounted() {
    this.getCollection()
    this.getCollectionProgress()
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

      let body = {cards: this.collection.cards}
      await axios
          .post('api/cards_bulk/', body)
          .then(response => {
            console.log(response)
            this.cards = response.data.results
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data)
              console.log(error.response.status)
              console.log(error.response.headers)
              if (error.response.status === 401) {
                this.$router.push('/signout')
                this.$router.push('/signin')
              }
            }
            alert('Not OK (getCollection)')
            console.log(error)
          })
    },

    async getCollectionProgress() {
      await axios
          .get('api/collection_progress/' + this.$route.params.id)
          .then(response => {
            console.log(response)
            this.acquired = response.data.acquired
            this.not_acquired = response.data.not_acquired
          })
          .catch(error => {
            console.log(error)
          })
    },

    getRarityClass(rarity) {
      let rarityClass = ''
      if (rarity === 'common') {
        rarityClass = 'card-common'
      }
      if (rarity === 'rare') {
        rarityClass = 'card-rare'
      }
      if (rarity === 'epic') {
        rarityClass = 'card-epic'
      }
      return rarityClass
    },
  },
  computed: {}
}
</script>
