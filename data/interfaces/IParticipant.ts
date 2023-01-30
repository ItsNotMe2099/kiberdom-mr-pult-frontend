export interface IParticipantCameraStatus{
  am_i_controlling?: boolean;
  can_i_request_control?: boolean;
  can_move_camera?: boolean;
  can_switch_camera?: boolean;
  can_zoom_camera?: boolean;
}
export interface IParticipantAudioStatus{
  state?: string;
  type?: string;
}
export interface IParticipantVideoStatus{
  has_source?: boolean;
  is_receiving?: boolean;
  is_sending?: boolean;
}
export interface IParticipantHandStatus{
  is_raise_hand?: boolean;
  is_valid?: string;
  time_stamp?: string;
}
export interface IParticipant{
  audio_status?: IParticipantAudioStatus
  avatar_url?: string;
  camera_status?: IParticipantCameraStatus
  can_edit_closed_caption?: boolean;
  can_record?: boolean;
  event?: string;
  hand_status?: IParticipantHandStatus
  isCohost?: boolean;
  is_client_support_closed_caption?: boolean;
  is_client_support_coHost?: boolean;
  is_host?: boolean;
  is_myself?: boolean;
  is_recording?: boolean;
  is_video_can_mute_byHost?: boolean;
  is_video_can_unmute_byHost?: boolean;
  local_recording_disabled?: boolean;
  user_id?: number;
  user_name?: string;
  user_type?: string;
  video_status?: IParticipantVideoStatus
};
