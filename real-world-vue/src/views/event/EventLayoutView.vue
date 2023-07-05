<script setup lang="ts">
import { ref } from 'vue'
import { type EventItem } from '@/type';
import { useRouter } from 'vue-router';
import EventService from '@/services/EventService';
const event = ref<EventItem | null>(null)

const props = defineProps({
    id: String
})
const router = useRouter()

EventService.getEventById(Number(props.id))
   .then((respond) => {
    event.value = respond.data
   })
   .catch((error) =>{
    console.log(error)
    if(error.respond && error.respond.status === 404){
        router.push({ name: '404:resource', params: {resource : 'event'}})
    }
    else{
        router.push({name: 'network-error'})
    }
   })
</script>
<template>
    <div v-if="event">
        <h1>{{ event.title }} </h1>
        <div id="nav">
            <router-link :to="{name: 'event-detail', params: {id}}">Details</router-link>
            |
            <router-link :to="{name: 'event-register', params: {id}}">Register</router-link>
            |
            <router-link :to="{name: 'event-edit', params:{id}}">Edit</router-link>
        </div>
        <RouterView :event="event"></RouterView>
    </div>
</template>
<style>
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>