import {IStatusResponse} from 'data/interfaces/IStatusResponse'
import request from 'utils/request'

export default class IotRepository {

  static async setState(name: string, command: number): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: `/api/v1/core/ios/state/${name}`,
      data: {
        command
      },
    })
    return res
  }


}
