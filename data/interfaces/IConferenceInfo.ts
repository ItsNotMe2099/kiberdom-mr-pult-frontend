export interface IConferenceInfo {
  success?: boolean;
  /** Сообщение */
  message?: string;
  /** Идентификатор конференции */
  meeting_id?: string;
  /** Пароль к конференции */
  meeting_pass?: string;
  /** Ссылка на конференцию */
  meeting_link?: string;

}
