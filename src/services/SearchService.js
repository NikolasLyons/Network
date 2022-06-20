import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class SearchService{
  async searchPost(query=''){
    AppState.query = query
    logger.log('searching', query)
    const res = await api.get(`api/posts?${query}`)
    logger.log('-seachpost-',res.data)
    AppState.posts = res.data.posts
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
   
  }
}
export const searchService = new SearchService()