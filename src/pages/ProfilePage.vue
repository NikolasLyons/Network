<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
       <Banner size="square"/>
      </div>
    </div>
    <div class="row">
      <div class="col-md-7 rounded shadow p-3 m-2">
        <div class="row p-2 bg-img" :style="`background-image: url(${profile.coverImg})`">
        
        </div>
        <div class="row">
          <div class="col-md-6 profile p-4">
            <img class="profile-img" :src="profile.picture" alt="">
            <h3>{{profile.class}}</h3>
            <h2>{{profile.name}}</h2>
            <i v-if="profile.graduated">🎓</i>
          </div>
          <div class="col-md-6 text-end p-2">
           <i class="mdi mdi-github social-media"></i><p>{{profile.github}}</p>
           <i class="mdi mdi-linkedin social-media"></i><p>{{profile.linkedin}}</p>
           <i class="mdi mdi-file-document-outline social-media"></i><p>{{profile.resume}}</p>
          </div>
          <div class="col-12">
            <p><em>{{profile.bio}}</em></p>
          
          </div>
          <div class="col-12 text-end">
            <Modal />
            <button v-if="account.id == profile.id" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#modelId">Edit</button>
          </div>
        </div>
      </div>
      <div class="col-md-3 d-flex">
       <p>this is where the ads will go</p>
      </div>

    </div>
    <div class="row">
      <!--NOTE this is where the create post will be placed   -->
       <CreatePost v-if="account.id == profile.id"/>
      <!-- <div class="col-10 rounded shadow m-3">
        <div class="row p-3">
          <div class="col-3 p-3">
            <img class="create-post-img" :src="profile.picture" alt="">
          </div>
          <div class="col-8 text-end">
            <form>
              <textarea class="text-border" placeholder="What's on your mind?..." name=""  id="" cols="30" rows="10"></textarea>
            </form>

          </div>
          <div class="col-8 d-flex justify-content-between text-end">
            <p><i class="mdi mdi-image"></i>Photo/video</p>
            <p><i class="mdi mdi-send"></i>Post</p>
          </div>
        </div>
      </div> -->
    <!--  -->
    </div>
    <div class="row">
      <div class="col-8">
         <Post v-for="p in posts" :key="posts.id" :post="p"/>
      </div>
    
    </div>
     <div class="col-12 d-flex justify-content-around">
        <p class="selectable" @click="changePage(previousPage)"><i class="mdi mdi-arrow-left"></i>Newer</p>
        <p class="selectable" @click="changePage(nextPage)">Older<i class="mdi mdi-arrow-right"></i></p>
      </div>

  </div>
</template>


<script>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import { profileService } from '../services/ProfileService'
import { bannersService } from '../services/BannersService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {
  setup(){
    const route = useRoute()
    onMounted( async ()=>{
      try {
        AppState.banners = []
        await profileService.getProfile(route.params.id)
        await postsService.getProfilePosts(route.params.id)
        await bannersService.getBanners()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }

    })
    return {
      banners: computed(()=> AppState.banners),
      account: computed(()=> AppState.account),
      profile: computed(()=> AppState.profile),
      posts: computed(()=> AppState.posts),
      async changePage(url){
        try {
          await postsService.changePage(url)
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
.bg-img{
  height: 20vh;
  background-size: cover;
  background-position: center;
}
.profile-img{
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

  .profile {
  transform: translateY(-8vh);
}


.social-media{
  font-size: 40px;
}

.text-border{
  border: 1px dashed
}

.create-post-img{
  height: 10em;
  border-radius: 50%;
}

</style>