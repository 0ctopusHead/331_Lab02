<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import type { EventItem } from '@/type'
import { watchEffect, ref, computed  } from 'vue'
import type { Ref } from 'vue'
import EventService from '@/services/EventService'
import type { AxiosResponse } from 'axios'

const events: Ref<Array<EventItem>> = ref([])
const totalEvent = ref<number>(0)
const perPage = ref<number>(2)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
watchEffect(() => {
  console.log('watchEffect triggered')
  EventService.getEvent(perPage.value, props.page).then((response: AxiosResponse<EventItem[]>) => {
    events.value = response.data
    totalEvent.value = response.headers['x-total-count']
  })
})
const hasNextPage = computed(() =>{
  //first calculate the total page
  const totalPages = Math.ceil(totalEvent.value / perPage.value)
  return props.page.valueOf() < totalPages
})
</script>

<template>
  <h1>Events For Good</h1>
  <main class="events">
    <div class="per-page-select">
     <label for="per-page">Event/Pages</label>
     <select id="perpage" v-model="perPage">
      <option value="2">2</option>
      <option value="4">4</option>
      <option value="6">6</option>
     </select>
    </div>
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
    <div class="pagination">
      <RouterLink :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev" v-if="page != 1" id="page-prev"
      >Prev Page</RouterLink
    >
    <RouterLink :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next" v-if="hasNextPage" id="page-next"
      >Next Page</RouterLink
    >
    </div>

  </main>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  float: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left; 
}

#page-next {
  text-align: right;
}
</style>
