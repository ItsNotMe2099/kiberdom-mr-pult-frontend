import request from 'utils/request'
import { ICoreStatus } from 'data/interfaces/ICoreStatus'
import { Platform } from 'data/enum/Platorm'
import { IStatusResponse } from 'data/interfaces/IStatusResponse'
import { OnOffState } from 'data/enum/OnOffState'

export default class CoreRepository {
  static async fetchStatus(): Promise<ICoreStatus> {
    const res = await request<ICoreStatus>({
      method: 'get',
      url: '/api/v1/core/status',
      data: {
      },
    })
    return res
  }
  static async init(platform: Platform): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: '/api/v1/core/init',
      data: {
        platform
      },
    })
    return res
  }

  static async selectPlatform(platform: Platform): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: `/api/v1/core/platform/select/${platform}`,
      data: {
      },
    })
    return res
  }

  static async setMicrophoneState(state: OnOffState): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: `/api/v1/core/microphone/${state}`,
      data: {},
    })
    return res
  }
  static async setCameraState(state: OnOffState): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: `/api/v1/core/camera/${state}`,
      data: {},
    })
    return res
  }

  static async setBgMusicState(state: OnOffState): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: `/api/v1/core/audioprocessor/bgmusic/${state}`,
      data: {},
    })
    return res
  }

  static async setVolume(level: string): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: '/api/v1/core/audioprocessor/volume/set',
      data: { level },
    })
    return res
  }

  static async callCareService(): Promise<IStatusResponse> {
    const res = await request<IStatusResponse>({
      method: 'post',
      url: '/api/v1/core/care_service/call',
    })
    return res
  }
}
