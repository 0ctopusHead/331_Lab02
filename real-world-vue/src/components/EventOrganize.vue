<template>
  <div class="organize-class">
   <div class="organize-card">
    <span>
       Category : {{ event?.category }}
    </span> 
     <br/>
    <span>
       Organizer : {{ event?.organizer }}
    </span>
  
   
   </div>
  </div>
</template>

<script lang="ts" setup>
  import type { EventItem } from '@/type'
  import type { PropType } from 'vue' 
  
const props = defineProps({
  event: {
    type: Object as PropType<EventItem>,
    require: true
  }
})
</script>

<style>
.organize-card {
  padding: 20px;
  width: 250px;
  margin-bottom: 18px;
  text-align: right;
}

</style>