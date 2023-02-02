import request from 'utils/request'
import {IConferenceInfo} from 'data/interfaces/IConferenceInfo'
import {IStatusResponse} from 'data/interfaces/IStatusResponse'

export default class ConferenceRepository {
  static async fetch(): Promise<IConferenceInfo> {
    const res = await request<IConferenceInfo>({
      method: 'get',
      url: '/api/v1/core/conference',
      data: {},
    })
    return res
  }

  static async create(): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: '/api/v1/core/conference/create',
      data: {
      },
    })
    return res
  }

  static async join(data: {login: string, password: string}): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: '/api/v1/core/conference/join',
      data: {
        data
      },
    })
    return res
  }

  static async exit(): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: '/api/v1/core/conference/exit',
      data: {
      },
    })
    return res
  }

  static async leave(): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: '/api/v1/core/conference/leave',
      data: {
      },
    })
    return res
  }

  static async invite(data: {username: string, email: string}): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: '/api/v1/core/invite/send',
      data,
    })
    return res
  }

  static async setScreenDemonstrationState(state: 'start' | 'stop'): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: `/api/v1/core/screen/demo/${state}`,
      data: {},
    })
    return res
  }


}
