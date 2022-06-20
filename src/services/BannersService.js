import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class BannersService{
  async getBanners(){
    const res = await api.get('api/ads')
    logger.log(res.data)
    AppState.banners = res.data

  }

}
export const bannersService = new BannersService()