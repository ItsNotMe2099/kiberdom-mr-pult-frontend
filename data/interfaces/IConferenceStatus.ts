import {IConferenceInfo} from 'data/interfaces/IConferenceInfo'
import {MicrophoneState} from 'data/enum/MicrophoneState'
import {CameraState} from 'data/enum/CameraState'

export interface IConferenceStatus{
    /** Запущена ли конференция */
    started?: boolean;
    /** Включен ли микрофон */
    microphone?: MicrophoneState;
    /** Включена ли камера */
    camera?: CameraState;
    /**
     * Уровень громкости
     * @min 0
     * @max 100
     */
    volume?: number;
    /** Информация о конференции */
    info?: IConferenceInfo

}
