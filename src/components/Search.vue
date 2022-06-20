<template>
  <form @submit.prevent="Search">
     <input type="text" v-model="search" placeholder="Search..."><button class="btn btn-outline-secondary"><i class="mdi mdi-magnify"></i></button>
    </form>
</template>


<script>
import { computed, ref } from 'vue'
import { searchService } from '../services/SearchService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {
  setup(){
    const search = ref("")
    return {
      
      search,
      async Search(){
        try {
          logger.log("searching", search.value)
          await searchService.searchPost(`query=${search.value}`)        
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>