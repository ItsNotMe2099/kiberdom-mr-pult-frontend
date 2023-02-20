import { ParticipantAudioState } from "data/enum/ParticipantAudioState"

export interface IParticipantHandStatus{
  is_raise_hand?: boolean
  is_valid?: string
  time_stamp?: string
}
export interface IParticipant{
  audio_status_state?: ParticipantAudioState
  audio_status_type?: string
  avatar_url?: string
  camera_status_am_i_controlling?: boolean
  camera_status_can_i_request_control?: boolean
  camera_status_can_move_camera?: boolean
  camera_status_can_switch_camera?: boolean
  camera_status_can_zoom_camera?: boolean
  can_edit_closed_caption?: boolean
  can_record?: boolean
  event?: string
  hand_status?: IParticipantHandStatus
  isCohost?: boolean
  is_client_support_closed_caption?: boolean
  is_client_support_coHost?: boolean
  is_host?: boolean
  is_myself?: boolean
  is_recording?: boolean
  is_video_can_mute_byHost?: boolean
  is_video_can_unmute_byHost?: boolean
  local_recording_disabled?: boolean
  user_id?: number
  user_name?: string
  user_type?: string
  video_status_has_source?: boolean
  video_status_is_receiving?: boolean
  video_status_is_sending?: boolean
  is_in_waiting_room: boolean
}
