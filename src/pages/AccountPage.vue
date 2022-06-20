<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-10">
          <form class="d-flex flex-column" @submit.prevent="saveAccount">
            <label for="">Name</label>
            <input type="text" v-model="editAccount.name">
            <label for="">Account Picture</label>
            <input type="text" v-model="editAccount.picture">
            <label for="">Cover Image</label>
            <input type="text" v-model="editAccount.coverImg">
            <button class="btn btn-outline-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  name: 'Account',
  setup() {
    const editAccount = ref({})
      watchEffect(()=>{
        AppState.account
        editAccount.value = {...AppState.account}
      })
    return {
      editAccount,
      account: computed(() => AppState.account),
      async saveAccount(){
        try {
          await accountService.saveAccount(editAccount.value)
          Pop.toast('Account Saved','success')
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }

      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
