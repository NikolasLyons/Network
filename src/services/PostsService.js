
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"





class PostsService{

  async getAll(){
      const res = await api.get('api/posts')
      logger.log('-getting post-', res.data.posts)
      AppState.posts = res.data.posts
      AppState.nextPage = res.data.older
      AppState.previousPage = res.data.newer
    }
    async getProfilePosts(profileId){
      const res = await api.get(`api/posts?creatorId=${profileId}`)
      logger.log(res.data)
      AppState.posts = res.data.posts
      AppState.nextPage = res.data.older
      AppState.previousPage = res.data.newer
    }

    async createPost(postData){
      const res = await api.post('api/posts', postData)
      logger.log('making a post',res.data)
     AppState.posts.unshift(res.data)
    }

    async deletePost(id){
      const res = await api.delete('api/posts/'+ id)
      logger.log('post deleted',res.data)
      AppState.posts = AppState.posts.filter(p => p.id != id)
    }

    async addLike(postId){
      const res = await api.post(`api/posts/${postId}/like`)
      logger.log(res.data)
      let original = AppState.posts.find(p=> p.id ==postId)
      original.likes = res.data.likes
    }
    async changePage(url){
      logger.log(url)
      const res = await api.get(url)
      logger.log(res.data.older)
      AppState.posts = res.data.posts
      AppState.nextPage = res.data.older
      AppState.previousPage = res.data.newer

    }
    
}
export const postsService = new PostsService()