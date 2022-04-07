<template>
  <div class="row mt-3">
    <div class="col-lg-2"></div>
    <h3 class="col-lg-4">Коллекции</h3>
    <div class="col-lg-6"></div>
  </div>
  <div v-for="collection in collections" :key="collection.id">
    <div class="row mt-3">
      <div class="col-lg-2"></div>
      <div class="col-lg-2">
        <img class="img-fluid rounded" :src="collection.image" alt="">
      </div>
      <div class="col-lg-6">
        <router-link class="link-dark" :to="`/collections/${collection.id}`">
          <h4>{{ collection.name }}</h4>
        </router-link>
        <p v-html="collection.description"></p>
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
      collections: []
    }
  },

  mounted() {
    this.getCollections()
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
          })
    }
  }
}
</script>
