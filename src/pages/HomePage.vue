<template>
 <div class="container-fluid">
  <div class="row p-3">
    <div v-if="account.id" class="col-md-3 side-bar rounded shadow">
      <div class="row">
        <div class="col-md-12 p-5">
          <img class="img-fluid side-bar-img" :src="account.picture" alt="">
          <h1 class="text-center">{{account.name}}</h1>
          <p>{{account.github}}</p>
          <p>{{account.biop}}</p>
        </div>
        <div class="col-md-12 p-5">
          <p></p>
        </div>
      </div>
    </div>
    <div v-else="account.id" class="col-md-3 side-bar rounded shadow">
      <div class="row">
        <div class="col-md-12 p-5">
          
          <h1 class="text-center">Welcome</h1>
        </div>
      </div>
    </div>
   
    <div class="col-md-6">
      <div class="row">
       <CreatePost v-if="account.id"/>
      </div>
  <div class="row flex-column text-center justify-content-center">
    <Post v-for="p in posts" :key="p.id" :post="p"/>
     <!-- <div class="col-md-12 m-4 p-2 rounded shadow post-card" v-for="p in posts" :key="p.id">
      <div class="border-bottom d-flex p-3" @click="goToProfile">
        <img class="img-fluid creator-img" :src="p.creator.picture" alt="">
       <p>{{p.creator.name}}</p>

      </div>
         
          <img class="img-fluid body-img" :src="p.imgUrl" alt="">
      </div> -->
      <div class="col-12 d-flex justify-content-around">
        <p class="selectable" @click="changePage(previousPage)"><i class="mdi mdi-arrow-left"></i>Newer</p>
        <p class="selectable" @click="changePage(nextPage)">Older<i class="mdi mdi-arrow-right"></i></p>
      </div>
  
  </div>

    </div>
    <div class="col-md-3">
      <div class="row p-2">
       <Banner  size="tall"/>
      </div>
    </div>
  </div>
  
</div> 
 
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'

import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { postsService } from '../services/PostsService'
import { bannersService } from '../services/BannersService'


export default {
  name: 'Home',
  setup(){
    onMounted(async ()=> {
      try {
       
        AppState.posts = []
        AppState.banners = []
        await postsService.getAll()
       
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }

    })
    return{
      
      account: computed(()=> AppState.account),
      profile: computed(()=> AppState.profile),
      posts: computed(()=> AppState.posts),
      nextPage: computed (() => AppState.nextPage ),
      previousPage: computed(()=> AppState.previousPage),
      banners: computed(()=> AppState.banners),
      async changePage(url){
        try {
          await postsService.changePage(url)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

    }
  }
}
</script>

<style scoped lang="scss">
.side-bar-img{
  border-radius: 50%;
}


</style>
