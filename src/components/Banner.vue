<template>
   <div class="col-12 p-2">
          <img class="img-fluid" :src="banners[0].tall" alt="">
          <img class="img-fluid" :src="banners[1].square" alt="">
        </div>
</template>


<script>

import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { bannersService } from '../services/BannersService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {
  props: {banner: {type: Object, required: true}},
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