import { IIotState } from 'data/interfaces/IIotState'
import {IStatusResponse} from 'data/interfaces/IStatusResponse'
import request from 'utils/request'

export default class IotRepository {

  static async setState(name: string, command: number): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: `/api/v1/core/iot/state/${name}`,
      data: {
        command
      },
    })
    return res
  }

  static async getState(name: string): Promise<IIotState> {
    const res = await request<IIotState>({
      method: 'get',
      url: `/api/v1/core/iot/state/${name}`,
      data: {
  
      },
    })
    return res
  }
}
