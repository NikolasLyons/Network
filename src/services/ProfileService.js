import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class ProfileService{
  async getProfile(id){
    const res  = await api.get('api/profiles/'+ id)
    logger.log(res.data)
    AppState.profile = res.data
  }
  async saveProfile(id, profileData){
    logger.log(id, profileData)
    // const res = await api.put('api/profiles/'+ id)
    // logger.log('profile has been saved',res.data)
    // AppState.profile = res.data

  }
  

}
export const profileService = new ProfileService()