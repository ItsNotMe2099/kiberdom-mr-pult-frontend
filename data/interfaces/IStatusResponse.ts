import {StatusResponseType} from 'data/enum/StatusResponseType'
import { IWiFi } from './IWiFi';

export interface IStatusResponse {
  status: StatusResponseType;
  wifi?: IWiFi
}
