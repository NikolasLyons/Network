<template>
  <div class="modal fade" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <form @submit.prevent="saveProfile">
                        <label for="">Name</label>
                        <input class="form-control" type="text" v-model="editProfile.name">
                        <label for="">class</label>
                        <input class="form-control" type="text" v-model="editProfile.class">
                        <label for="">email</label>
                        <input class="form-control" type="text" v-model="editProfile.email">
                        <label for="">github</label>
                        <input class="form-control" type="text" v-model="editProfile.github">
                        <label for="">linkedin</label>
                        <input class="form-control" type="text" v-model="editProfile.linkedin">
                        <label for="">resume</label>
                        <input class="form-control" type="text" v-model="editProfile.resume">
                        <label for="">Bio</label>
                        <textarea class="form-control" name="" id="" cols="30" rows="10" v-model="editProfile.bio"></textarea>
                        <label for="">graduated</label>
                        <input type="checkbox" v-model="editProfile.graduated">
                        <button class="btn btn-primary">Save</button>
                        </form>
<!-- bio: ""
class: "Late Spring '22"
coverImg: "https://timelinecovers.pro/facebook-cover/download/green-forest_trees-facebook-cover.jpg"
createdAt: "2022-06-17T16:45:08.607Z"
email: "caleb123elliott@gmail.com"
github: "https://github.com/CALEBELLIOTT"
graduated: false
id: "62abe9729eabb273ed75cc87"
linkedin: "https://www.linkedin.com/in/caleb-elliott-9368b3226/"
name: "caleb123elliott@gmail.com"
picture: "https://media-exp1.licdn.com/dms/image/C5603AQHlrLu5wHtnVA/profile-displayphoto-shrink_100_100/0/1648751147131?e=1661385600&v=beta&t=J7TtCMhWA3PxOgK1uukPS36UAuVW6tnG_NGUerRRAbo"
resume: "" -->
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      
                    </div>
                  </div>
                </div>
              </div>
</template>


<script>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { profileService } from '../services/ProfileService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {
  
  setup(){
    const route = useRoute()
    const editProfile = ref({})
    watchEffect(()=>{
        AppState.profile
        editProfile.value = {...AppState.profile}
      })
    return {
      editProfile,
      profile:computed(()=> AppState.profile),
       async saveProfile(){
        try {
          await profileService.saveProfile(route.params.id,editProfile.value)
          Pop.toast('Profile Saved','success')
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