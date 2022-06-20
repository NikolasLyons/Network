<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
     <img class="img" src="https://static.wixstatic.com/media/161a5a_123241ed2e3f4451a3153fe02bbef524~mv2.png/v1/fill/w_520,h_464,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/N-icon.png" alt=""><p>etwork</p>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          
          <Search />
         
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';

export default {
  setup() {
    return {
      post: computed(()=> AppState.posts)
    };
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.img{
  height: 5em;
  
}
</style>
