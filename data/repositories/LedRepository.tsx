import request from 'utils/request'
import {IStatusResponse} from 'data/interfaces/IStatusResponse'
import { LedState } from 'data/enum/LedState'

export default class LedRepository {

  static async setLedState(state: LedState, index: number): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: `/api/v1/core/led/${state}`,
      data: [index],
    })
    return res
  }


}
