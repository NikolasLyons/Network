<template>
   <div class="col-12 p-2">
          <img v-for="b in banners" :key="b.id" class="img-fluid" :src="b[size]" alt="">
        </div>
</template>


<script>

import { stringify } from 'json5'
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { bannersService } from '../services/BannersService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {
  props: {
    size: {
      type: String,
      default: 'square'
    }
  },
  setup(){
    onMounted( async()=>{
      try {
         await bannersService.getBanners()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      banners: computed(()=> AppState.banners)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>