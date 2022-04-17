<template>
  <div class="row mt-4">
    <div class="col-lg-2"></div>
    <h3 class="col-lg-4">{{ card.name }}</h3>
    <div class="col-lg-5"></div>
    <div class="col-lg-1">
      <router-link :to="`/my/cards/`" class="col-lg-2 link-dark">Назад</router-link>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-2"></div>
    <div class="col-lg-4">
      <img class="img-fluid rounded" :src="card.image" alt="">
    </div>
    <div class="col-lg-2"></div>
    <div class="col-lg-2">
      <template v-if="isAddableToCollection()">
        <button @click.prevent="addCardToCollection" class="btn btn-outline-success">Добавить в коллекцию</button>
      </template>
      <template v-else>
        <button class="btn btn-outline-dark disabled">Добавить в коллекцию</button>
      </template>
    </div>
    <div class="col-lg-2">
      <button class="btn btn-outline-danger">Распылить</button>
    </div>
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
  name: 'MyCardView',
  data() {
    return {
      card: {},
      card_entry: {},
      isAddableToCollectionResult: {}
    }
  },

  mounted() {
    this.getCardEntry()
  },

  methods: {
    async getCardEntry() {
      await axios
          .get('api/my/cards/' + this.$route.params.id)
          .then(response => {
            console.log(response)
            this.card_entry = response.data
          })
          .catch(error => {
            console.log(error)
          })
      await this.getCard()
    },

    async getCard() {
      await axios
          .get('api/cards/' + this.card_entry.card)
          .then(response => {
            console.log(response)
            this.card = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },

    async addCardToCollection() {
      await axios
          .post('api/add_card_to_collection/' + this.$route.params.id)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      await this.$router.push('/my/cards')
    },

    isAddableToCollection() {
      axios
          .get('api/is_addable/' + this.$route.params.id)
          .then(response => {
            console.log(response)
            this.isAddableToCollectionResult = response.data.result === 'true'
          })
          .catch(error => {
            console.log(error)
          })
      return this.isAddableToCollectionResult
    }
  }
}
</script>
