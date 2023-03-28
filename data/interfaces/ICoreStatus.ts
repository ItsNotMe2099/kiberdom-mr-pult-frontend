import { IConferenceStatus } from 'data/interfaces/IConferenceStatus'
import { ILedStatus } from 'data/interfaces/ILedStatus'
import { ILightStatus } from 'data/interfaces/ILightStatus'
import { Platform } from 'data/enum/Platorm'
import { OnOffState } from 'data/enum/OnOffState'
import { CamState } from 'data/enum/CamState'

export interface ICoreStatus {
  /** Признак инициализации конференции */
  initialized: boolean;
  /** Признак запуска демо */
  demo: boolean;
  /** Название запущенной платформы */
  platform: Platform;
  /** Состояние конференции */
  conference: IConferenceStatus
  /** Лед экраны */
  led: { [key: string]: ILedStatus }
  /** Освещение */
  light: { [key: string]: ILightStatus }
  /** Климат */
  climate: {
    temperature?: number;
  };
  // audio processor
  audio_processor: {
    level: number
    mute: null
    bg_music: OnOffState
  }
  recorder: {
    status: string | null
  }
  touch_designer: {
    camera: CamState
  }
}
