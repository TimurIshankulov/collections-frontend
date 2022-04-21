<template>
  <div class="row ms-4 mt-4 me-3">
    <h3 class="col-lg-4">Мои карточки</h3>
    <div class="col-lg-4"></div>
    <div class="col-lg-2 text-end">
      <template v-if="IsDailyCardAvailable">
        <button @click.prevent="getRandomCard" class="btn w-100 btn-outline-primary">Получить карточку</button>
      </template>
      <template v-else>
        <button class="btn w-100 btn-outline-dark disabled">Получить карточку {{ diffFormatted }}</button>
      </template>
    </div>
    <div class="col-lg-2 text-end">
      <button @click.prevent="getRandomCardAdmin" class="btn w-100 btn-outline-dark">Получить карточку (админ)</button>
    </div>
  </div>
  <div class="row ms-3 me-3 mt-3">
    <div v-for="card in cards" :key="card.card_entry_id" class="col-lg-2">
      <div class="card card-fixed-height border-dark shadow-sm mb-4">
        <img :src="card.card.image" alt="" class="card-img-top img-fluid rounded">
        <div class="card-body">
          <h5 class="card-title">{{ card.card.name }}</h5>
          <div v-html="card.card.short_description" class="p-small"></div>
        </div>
        <router-link :to="`/my/cards/${card.card_entry_id}`" class="stretched-link"></router-link>
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
      card_ids: [],
      cards: [],
      card_entries: [],
      isDailyCardAvailableResult: undefined,
      diff: undefined,
      timer: undefined,
    }
  },

  beforeMount() {
    this.timer = setInterval(this.getDiff, 1000)
    this.getIsDailyCardAvailable()
  },

  mounted() {
    this.getCardIds()
  },

  beforeUnmount() {
    clearInterval(this.timer);
  },

  methods: {
    async getCardIds() {
      this.card_ids = []
      await axios
          .get('api/my/cards/')
          .then(response => {
            console.log(response)
            this.card_entries = response.data.results
            for (let i = 0; i < this.card_entries.length; i++) {
              this.card_ids.push(this.card_entries[i].card)
            }
          })
          .catch(error => {
            console.log(error)
          })
      await this.getCards()
    },

    async getCards() {
      this.cards = []
      let body = {cards: this.card_ids}
      await axios
          .post('api/cards_bulk/', body)
          .then(response => {
            console.log(response)
            let results = response.data.results
            for (let i = 0; i < results.length; i++) {
              this.cards.push({card_entry_id: this.card_entries[i].id, card: results[i]})
            }
          })
          .catch(error => {
            console.log(error)
          })
    },

    async getRandomCard() {
      let params = {params: {source: 'daily'}}
      let card_entry_id
      let card

      await axios
          .post('api/add_card/', null, params)
          .then(response => {
            console.log(response)
            card_entry_id = response.data.card.id
            card = response.data.card.card
            this.isDailyCardAvailableResult = false
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data)
            }
            console.log(error)
          })

      await axios
          .get('api/cards/' + card)
          .then(response => {
            console.log(response)
            this.cards.push({card_entry_id: card_entry_id, card: response.data})
          })
          .catch(error => {
            console.log(error)
          })
    },

    async getRandomCardAdmin() {
      let params = {params: {source: 'admin'}}
      let card_entry_id
      let card

      await axios
          .post('api/add_card_admin/', null, params)
          .then(response => {
            console.log(response)
            card_entry_id = response.data.card.id
            card = response.data.card.card
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data)
            }
            console.log(error)
          })

      await axios
          .get('api/cards/' + card)
          .then(response => {
            console.log(response)
            this.cards.push({card_entry_id: card_entry_id, card: response.data})
          })
          .catch(error => {
            console.log(error)
          })
    },

    getIsDailyCardAvailable() {
      axios
          .get('api/is_daily_card_available/')
          .then(response => {
            console.log(response)
            this.isDailyCardAvailableResult = response.data.result === 'true'
          })
          .catch(error => {
            console.log(error)
          })
      return this.isDailyCardAvailableResult
    },

    convertDateToUTC(date) {
      return new Date(
          date.getUTCFullYear(),
          date.getUTCMonth(),
          date.getUTCDate(),
          date.getUTCHours(),
          date.getUTCMinutes(),
          date.getUTCSeconds()
      )
    },

    getDateDiff(date1, date2) {
      const diff = new Date(date2.getTime() - date1.getTime());
      return {
        year: diff.getUTCFullYear() - 1970,
        month: diff.getUTCMonth(),
        day: diff.getUTCDate() - 1,
        hour: diff.getUTCHours(),
        minute: diff.getUTCMinutes(),
        second: diff.getUTCSeconds(),
      }
    },

    getDiff() {
      const today = this.convertDateToUTC(new Date)
      const tomorrow = this.convertDateToUTC(new Date)
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)

      this.diff = this.getDateDiff(today, tomorrow)
      if (this.diff['hour'] === 0 && this.diff['minute'] === 0 && this.diff['second'] === 0) {
        this.isDailyCardAvailableResult = true
      }
    },

    formatDatetime(date) {
      if (date === undefined) return ''
      let hours = date['hour'].toString()
      let minutes = date['minute'].toString()
      let seconds = date['second'].toString()
      if (hours.length < 2) hours = "0" + hours
      if (minutes.length < 2) minutes = "0" + minutes
      if (seconds.length < 2) seconds = "0" + seconds
      return [hours, minutes, seconds].join(":")
    },
  },

  computed: {
    IsDailyCardAvailable() {
      return this.isDailyCardAvailableResult
    },
    diffFormatted() {
      return this.formatDatetime(this.diff)
    }
  }
}
</script>

<style scoped>

</style>
