import request from 'utils/request'
import {IStatusResponse} from 'data/interfaces/IStatusResponse'

export default class RecordRepository {
  static async start(): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: '/api/v1/core/record/start',
      data: {
      },
    })
    return res
  }

  static async stop(): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: '/api/v1/core/record/stop',
      data: {
      },
    })
    return res
  }


  static async pause(): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: '/api/v1/core/record/pause',
      data: {
      },
    })
    return res
  }


  static async send(data: {email: string}): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: '/api/v1/core/record/send',
      data,
    })
    return res
  }


}
