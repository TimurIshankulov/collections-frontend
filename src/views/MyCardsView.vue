<template>
  <div class="row ms-4 mt-4 me-3">
    <h3 class="col-lg-4">Мои карточки</h3>
    <div class="col-lg-6"></div>
    <div class="col-lg-2 text-end">
      <button @click.prevent="getRandomCard" class="btn btn-outline-dark">Получить карточку</button>
    </div>
  </div>
  <div class="row ms-3 me-3">
    <div v-for="card_entry in card_entries" :key="card_entry.card_entry_id" class="col-lg-2">
      <div class="card border-dark mb-4 shadow-sm">
        <img :src="card_entry.card.image" alt="" class="card-img-top img-fluid rounded">
        <div class="card-body">
          <h5 class="card-title">{{ card_entry.card.name }}</h5>
          <div v-html="card_entry.card.short_description" class="truncate"></div>
        </div>
        <router-link :to="`/my/cards/${card_entry.card_entry_id}`" class="stretched-link"></router-link>
      </div>
    </div>
  </div>
</template>


<script>

import axios from "axios";

export default {
  name: 'MyCardsView',
  data() {
    return {
      card_entry_ids: [],
      cards: [],
      card_entries: [{
        card_entry_id: Number,
        card: {}
      }]
    }
  },

  mounted() {
    this.getCardIds()
  },

  methods: {
    async getCardIds() {
      await axios
          .get('api/my/cards/')
          .then(response => {
            console.log(response)
            this.card_entry_ids = response.data.results
          })
          .catch(error => {
            console.log(error)
          })
      await this.getCards()
    },

    async getCards() {
      this.cards = []
      this.card_entries = []
      for (let i = 0; i < this.card_entry_ids.length; i++) {
        await axios
            .get('api/cards/' + this.card_entry_ids[i].card)
            .then(response => {
              console.log(response)
              this.card_entries.push({card_entry_id: this.card_entry_ids[i].id, card: response.data})
            })
            .catch(error => {
              console.log(error)
            })
      }
    },

    async getRandomCard() {
      await axios
          .post('api/add_card/')
          .then(response => {
            console.log(response)
            this.card_ids = response.data
          })
          .catch(error => {
            console.log(error)
          })
      await this.getCardIds()
      await this.getCards()
    }
  }
}
</script>
