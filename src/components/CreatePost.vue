<template>
 <div class="col-10 rounded shadow m-3">
        <div class="row p-3">
          <div class="col-3 p-3">
            <img @click="goToProfile" class="create-post-img" :src="account.picture" alt="">
          </div>
          <div class="col-8 text-end">
            <form  @submit.prevent="createPost">
              <textarea class="text-border d-flex flex-column" placeholder="What's on your mind?..." name=""  id="" cols="30" rows="5" v-model="postData.body"></textarea>
              <input class="d-flex flex-column" type="text" placeholder="Image" v-model="postData.imgUrl">
            <button class="btn btn-outline-primary"><i class="mdi mdi-send"></i>Post</button>
            </form>
          </div>
        </div>
      </div>
</template>


<script>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {

  setup(){
    let profile = AppState.profile.id
    const postData = ref({})
    const router = useRouter()
    return {
      postData,
      account: computed(()=> AppState.account),
      profile: computed(()=> AppState.profile),
      async createPost(){
        try {
          await postsService.createPost(postData.value)
          
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      goToProfile(){
        router.push({
          name: "Profile",
          params: {id: profile.id}

        })
      
      },

    }
  }
}
</script>


<style lang="scss" scoped>
.text-border{
  border: 1px dashed
}

.create-post-img{
  height: 10em;
  border-radius: 50%;
}

</style>