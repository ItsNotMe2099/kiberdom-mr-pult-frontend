import {IConferenceStatus} from 'data/interfaces/IConferenceStatus'
import {ILedStatus} from 'data/interfaces/ILedStatus'
import {ILightStatus} from 'data/interfaces/ILightStatus'
import {Platform} from 'data/enum/Platorm'

export interface ICoreStatus{
  /** Признак инициализации конференции */
  initialized: boolean;
  /** Признак запуска демо */
  demo: boolean;
  /** Название запущенной платформы */
  platform: Platform;
  /** Состояние конференции */
  conference:IConferenceStatus
  /** Лед экраны */
  led: {[key: string]: ILedStatus}
  /** Освещение */
  light: {[key: string]: ILightStatus}
  /** Климат */
  climate: {
    temperature?: number;
  };
}
