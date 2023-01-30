import {ApiConferenceCamera, ApiConferenceMicrophone, ApiPlatformPlatform} from "api/myApi";
import {IConferenceStatus} from "data/interfaces/IConferenceStatus";

export interface ILightStatus{
  power?: string;
  level?: number;
}
