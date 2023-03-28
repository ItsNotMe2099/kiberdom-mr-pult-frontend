import request from 'utils/request'
import { IStatusResponse } from 'data/interfaces/IStatusResponse'
import { CamState } from 'data/enum/CamState'

export default class CamRepository {

  static async setCameraState(state: CamState): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: `/api/v1/core/touchdesigner/switch/${state}`,
    })
    return res
  }
}
