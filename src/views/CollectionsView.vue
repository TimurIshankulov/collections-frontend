<template>
  <div class="row mt-3 me-auto">
    <div class="col-lg-2"></div>
    <div class="col-lg-2">
      <h3>Коллекции</h3>
    </div>
    <div class="col-lg-3 text-end">
      <p>Коллекций собрано: {{ n_user_collections }} / {{ n_collections }}</p>
    </div>
    <div class="col-lg-3 text-end">
      <p>Уникальных карточек в коллекциях: {{ n_user_cards }} / {{ n_cards }}</p>
    </div>
    <div class="col-lg-2"></div>
  </div>
  <div class="row mt-3 me-auto">

  </div>
  <div v-for="collection in collections" :key="collection.id">
    <div class="row mt-3 me-auto">
      <div class="col-lg-2"></div>
      <div class="col-lg-2">
        <img class="img-fluid rounded" :src="collection.image1" alt="">
      </div>
      <div class="col-lg-6">
        <div class="row">
          <div class="col-lg-8">
            <router-link class="link-dark" :to="`/collections/${collection.id}`">
              <h4>{{ collection.name }}</h4>
            </router-link>
          </div>
          <div class="col-lg-4 text-end">
            <template v-if="completed_collections.includes(collection.id)">
              <p class="text-success">Коллекция собрана!</p>
            </template>
          </div>
        </div>
        <p v-html="collection.short_description"></p>
      </div>
    </div>
  </div>
</template>


<script>

import axios from "axios";

export default {
  name: 'CollectionsView',
  data() {
    return {
      collections: [],
      completed_collections: [],
      n_user_cards: Number,
      n_user_collections: Number,
      n_cards: Number,
      n_collections: Number
    }
  },

  mounted() {
    this.getCollections()
    this.getUserProfile()
    this.getUserStatistics()
  },

  methods: {
    async getCollections() {
      await axios
          .get('api/collections/')
          .then(response => {
            console.log(response)
            this.collections = response.data.results
          })
          .catch(error => {
            console.log(error)
            if (error.response.status === 401) {
              this.$store.dispatch('doSignOut')
              this.$router.push('/signin')
            }
          })
    },

    async getUserProfile() {
      await axios
          .get('api/profile/')
          .then(response => {
            console.log(response)
            this.completed_collections = response.data.user.collections
          })
          .catch(error => {
            if (error.response.status === 401) {
              this.$store.dispatch('doSignOut')
              this.$router.push('/signin')
            }
            console.log(error)
          })
    },

    async getUserStatistics() {
      await axios
          .get('api/get_user_statistics/')
          .then(response => {
            console.log(response)
            this.n_user_cards = response.data.n_user_cards
            this.n_user_collections = response.data.n_user_collections
            this.n_cards = response.data.n_cards
            this.n_collections = response.data.n_collections
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
