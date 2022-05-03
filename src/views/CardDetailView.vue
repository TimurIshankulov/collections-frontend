<template>
  <div class="row mt-4 me-auto">
    <div class="col-lg-2"></div>
    <h3 class="col-lg-4">{{ card.name }}</h3>
    <div class="col-lg-3"></div>
    <div class="col-lg-1 text-end">
      <router-link :to="`/collections/${card.related_collection}`" class="link-dark">Назад</router-link>
    </div>
    <div class="col-lg-2"></div>
  </div>
  <div class="row me-auto">
    <div class="col-lg-2"></div>
    <div class="col-lg-4">
      <img class="img-fluid rounded" :src="card.image" alt="">
    </div>
    <div class="col-lg-2"></div>
    <div class="col-lg-2 me-auto">
      <template v-if="isCraftableResult === 'already_in_collection'">
        <button class="btn w-100 btn-outline-dark disabled">В коллекции!</button>
      </template>
      <template v-else-if="isCraftableResult === 'not_enough_dust'">
        <button class="btn w-100 btn-outline-dark disabled">Недостаточно пыли</button>
      </template>
      <template v-else-if="isCraftableResult === 'true'">
        <button @click.prevent="craftCard" class="btn w-100 btn-outline-primary">Создать</button>
      </template>
      <p>Для создания необходимо {{ card.craft_cost }} пыли</p>
      <div class="col-lg-2"></div>
    </div>
  </div>
  <br>
  <div class="row me-auto">
    <div class="col-lg-2"></div>
    <p class="col-lg-4" v-html="card.short_description"></p>
  </div>
  <div class="row me-auto">
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
      card: {},
      isCraftableResult: ''
    }
  },

  mounted() {
    this.getCard()
    this.isAddableToCollection()
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
            if (error.response.status === 401) {
              this.$store.dispatch('doSignOut')
              this.$router.push('/signin')
            }
          })
    },

    async craftCard() {
      await axios
          .post('api/craft_card/' + this.$route.params.id)
          .then(response => {
            console.log(response)
            this.$store.commit('setDust', response.data.remaining_dust)
          })
          .catch(error => {
            console.log(error)
            if (error.response.status === 401) {
              this.$store.dispatch('doSignOut')
              this.$router.push('/signin')
            }
          })
      await this.$router.push('/collections/' + this.card.related_collection)
    },

    isAddableToCollection() {
      axios
          .get('api/is_craftable/' + this.$route.params.id)
          .then(response => {
            console.log(response)
            this.isCraftableResult = response.data.result
          })
          .catch(error => {
            console.log(error)
          })
      return this.isAddableToCollectionResult
    },
  }
}
</script>
