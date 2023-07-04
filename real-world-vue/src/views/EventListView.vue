<template>
  <h1>Events for Good</h1>
  <main class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
    <!-- <EventOrganize v-for="event in events" :key="event.id" :event="event"></EventOrganize> -->
    <!-- <EventDetailView></EventDetailView> -->
  </main>
</template>

<script lang="ts" setup>
// import EventDetailView from './EventDetailView.vue'
import EventCard from '../components/EventCard.vue'
// import EventOrganize from '../components/EventOrganize.vue'
import type { EventItem } from '@/type'
import { ref } from 'vue'
import  EventService  from '@/services/EventService'
import type {Ref} from 'vue'
const events: Ref<Array<EventItem>> = ref([])
EventService.getEvent().then((respond) =>{
  events.value = respond.data
})

</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
