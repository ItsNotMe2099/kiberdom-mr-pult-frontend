import request from 'utils/request'
import {IParticipant} from 'data/interfaces/IParticipant'
import {IStatusResponse} from 'data/interfaces/IStatusResponse'

export default class ParticipantRepository {
  static async fetch(): Promise<IParticipant[]> {
    const res = await request<IParticipant[]>({
      method: 'get',
      url: '/api/v1/core/participants',
      data: {},
    })
    return res
  }


  static async acceptParticipant(id: number | string): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: `/api/v1/core/participant/${id}/admit`,
      data: {},
    })
    return res
  }


  static async deleteParticipant(id: number | string): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: `/api/v1/core/participant/${id}/expel`,
      data: {},
    })
    return res
  }


  static async muteAudioParticipant(id: number | string): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: `/api/v1/core/participant/${id}/muteaudio`,
      data: {},
    })
    return res
  }

  static async muteAudioAll(): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: '/api/v1/core/participant/muteaudioall',
      data: {},
    })
    return res
  }

}
