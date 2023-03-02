import {IConferenceInfo} from 'data/interfaces/IConferenceInfo'
import { OnOffState } from 'data/enum/OnOffState';

export interface IConferenceStatus{
    /** Запущена ли конференция */
    started?: boolean;
    /** Включен ли микрофон */
    microphone?: OnOffState;
    /** Включена ли камера */
    camera?: OnOffState;
    /**
     * Уровень громкости
     * @min 0
     * @max 100
     */
    volume?: number;
    /** Информация о конференции */
    info?: IConferenceInfo

}
