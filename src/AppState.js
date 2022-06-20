import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  profile: {},
  posts: [],
  likes: 0,
  banners: [],
  query: '',
  activePost: {},
  nextPage: null,
  previousPage: null
})
