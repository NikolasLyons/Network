<template>
<div class="col-10">
  <div class="row">
    <div class="col-md-4 m-4 p-2 rounded shadow post-card">
      <div class="row border-bottom">
        <div class="col-6 d-flex p-3 selectable" @click="goToProfile">
          <img class="img-fluid creator-img" :src="post.creator.picture" alt="">
         <p>{{post.creator.name}}</p>
         <p>{{formatDate(post.createdAt)}}</p>
        </div>
        <div class="col-md-6 p-3">
        <p class="text-end" v-if="post.creatorId == profile.id && profile.id == account.id" @click="deletePost"><i class="mdi mdi-delete-forever"></i></p>
        </div>
      </div>
      <div v-if="post.imgUrl" class="row">
        <div class="col-12 p-3">
          <img class="img-fluid body-img" :src="post.imgUrl" alt="">
        </div>
      </div>
      <div class="row p-2">
        <div class="col-12">
          <p class="post-body">{{post.body}}</p>
          
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <i @click="addLike" class="mdi mdi-heart-outline">{{post.likes.length}}</i>
        </div>
      </div>
     
    </div>
             
  </div>
</div>
</template>


<script>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {
  props: {post: {type: Object, required: true}},
  setup(props){
    let likes = 0
    const router = useRouter()
    return {
    likes,
    
      profile: computed(()=> AppState.profile),
      account: computed(()=> AppState.account),
      goToProfile(){
        router.push({
          name: "Profile",
          params: {id: props.post.creatorId}

        })
      
      },
      async addLike(){
        try {
          await postsService.addLike()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }

      },

      async deletePost(){
        try {
          if(await Pop.confirm('Are you sure you want to delete post')){

            await postsService.deletePost(props.post.id)
          }
          
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }

      },
      formatDate(rawDate){
        return new Date(rawDate).toLocaleDateString()

      }
    }
  }
}
</script>


<style lang="scss" scoped>
.post-card{
  height: 50vh;
  width: 80vh;
}
.body-img{
  height: 25vh;
  width: 50vh;
  object-fit: contain;
  object-position: center;
  
}

.creator-img{
  height: 4em;
  object-fit: cover;
  border-radius: 50%;
}

.post-body{
  text-overflow: ellipsis;
}

</style>