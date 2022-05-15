<template>
  <div class="row ms-4 mt-4 me-auto">
    <div class="col-lg-1"></div>
    <h3 class="col-lg-4">{{ collection.name }}</h3>
    <div class="col-lg-6"></div>
    <div class="col-lg-1">
      <router-link :to="`/collections/`" class="link-dark">Назад</router-link>
    </div>
  </div>

  <div class="row ms-3 mt-3 me-3">
    <div class="col-lg-1"></div>
    <div class="col-lg-5">
      <img class="img-fluid img-shadow rounded" :src="collection.image1" alt="">
      <img class="img-fluid img-shadow rounded mt-3 " :src="collection.image2" alt="">
      <img class="img-fluid img-shadow rounded mt-3 " :src="collection.image3" alt="">
    </div>
    <div class="col-lg-5">
      <p v-html="collection.long_description"></p>
    </div>
    <div class="col-lg-1"></div>
  </div>

  <br>

  <div class="row ms-3 mt-3 mb-3 me-auto">
    <div class="col-lg-1"></div>
    <h4 class="col-lg-4">
      Собрано {{ this.acquired.length }} из {{ this.cards.length }} карточек в коллекции
    </h4>
  </div>
  <div class="row ms-3 me-3">
    <div class="col-lg-1"></div>
    <div class="col-lg-10">
      <div class="row">
        <div v-for="card in cards" :key="card.id" class="col-lg-2">
          <div class="card card-fixed-height mb-4" :class="getRarityCardClass(card.rarity)">

            <div class="card-header">
              <div class="row">
                <div class="col-10">
                  <h6 class="card-title">
                    {{ card.name }}
                  </h6>
                </div>
                <div class="col-2 text-end">
                  <span :class="getRarityDotClass(card.rarity)"></span>
                </div>
              </div>
            </div>

            <template v-if="this.acquired.includes(card.id)">
              <img :src="card.image" alt="" class="card-img-top img-fluid rounded">
            </template>
            <template v-else>
              <img :src="card.image_grayscaled" alt="" class="card-img-top img-fluid rounded">
            </template>

            <div class="card-body">
              <div v-html="card.short_description" class="p-small"></div>
            </div>

            <div class="card-footer">
              <template v-if="this.acquired.includes(card.id)">
                <p class="mb-auto p-small">В коллекции</p>
              </template>
              <template v-else>
                <p class="mb-auto p-small">Не получено</p>
              </template>
            </div>

            <router-link :to="`/cards/${card.id}`" class="stretched-link"></router-link>
          </div>  <!-- end card -->
        </div>  <!-- end cycle -->
      </div>  <!-- end row -->
    </div>  <!-- end col-lg-10 -->
    <div class="col-lg-1"></div>
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
            if (error.response.status === 401) {
              this.$store.dispatch('doSignOut')
              this.$router.push('/signin')
            }
            console.log(error)
          })

      let body = {
        cards: this.collection.cards,
        ordering: 'rarity'
      }
      this.cards = []
      await axios
          .post('api/cards_bulk/', body)
          .then(response => {
            console.log(response)
            for (let i = 0; i < response.data.results.length; i++) {
              this.cards.push(response.data.results[i].card)
            }
          })
          .catch(error => {
            if (error.response.status === 401) {
              this.$store.dispatch('doSignOut')
              this.$router.push('/signin')
            }
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

    getRarityCardClass(rarity) {
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

    getRarityDotClass(rarity) {
      let rarityClass = ''
      if (rarity === 'common') {
        rarityClass = 'dot-common'
      }
      if (rarity === 'rare') {
        rarityClass = 'dot-rare'
      }
      if (rarity === 'epic') {
        rarityClass = 'dot-epic'
      }
      return rarityClass
    },
  },
  computed: {}
}
</script>
