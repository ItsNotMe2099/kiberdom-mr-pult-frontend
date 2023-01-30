import { IUser } from 'data/interfaces/IUser'
import { createContext, useContext, useState } from 'react'

interface IState {
  isActiveCameraMenu: boolean
  isActiveUsersList: boolean
  isActiveMembers: boolean
  isActiveInvite: boolean
  isManualCamera: boolean
  isAutoCamera: boolean
  isStreamsCamera: boolean
  isMicOn: boolean
  isCamOn: boolean
  users: IUser[]
  newUsers: IUser[]
  handleActiveUsersListMenu: () => void
  handleCameraMenu: () => void
  handleInvite: () => void
  handleManualCamera: () => void
  handleAutoCamera: () => void
  handleStreamsCamera: () => void
  handleMicrophone: () => void
  handleCamera: () => void
  isEmailFormActive: boolean
  handleCancelEmailForm: () => void
  handleRecording: () => void
  isRecording: boolean
  handleVisibleRecControls: () => void
  isRecControls: boolean
  isRecPaused: boolean
  handleRecIsPaused: () => void
  isStopRec: boolean
  handleStopRec: () => void
  isEmailFormInvite: boolean
}

const defaultValue: IState = {
  isActiveCameraMenu: false,
  isActiveUsersList: false,
  isActiveMembers: false,
  isActiveInvite: false,
  isManualCamera: false,
  isAutoCamera: false,
  isStreamsCamera: false,
  isMicOn: false,
  isCamOn: false,
  users: [],
  newUsers: [],
  handleActiveUsersListMenu: () => null,
  handleCameraMenu: () => null,
  handleInvite: () => null,
  handleManualCamera: () => null,
  handleAutoCamera: () => null,
  handleStreamsCamera: () => null,
  handleMicrophone: () => null,
  handleCamera: () => null,
  isEmailFormActive: false,
  handleCancelEmailForm: () => null,
  handleRecording: () => null,
  isRecording: false,
  handleVisibleRecControls: () => null,
  isRecControls: false,
  isRecPaused: false,
  handleRecIsPaused: () => null,
  isStopRec: false,
  handleStopRec: () => null,
  isEmailFormInvite: false
}

const ConfContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function ConfWrapper(props: Props) {

  const [isActiveCameraMenu, setIsActiveCameraMenu] = useState<boolean>(false)
  const [isActiveInvite, setIsActiveInvite] = useState<boolean>(false)

  const [isActiveUsersList, setIsActiveUsersList] = useState<boolean>(false)

  const [isManualCamera, setIsManualCamera] = useState<boolean>(true)
  const [isAutoCamera, setIsAutoCamera] = useState<boolean>(false)
  const [isStreamsCamera, setIsStreamsCamera] = useState<boolean>(false)

  const [isMicOn, setIsMicOn] = useState<boolean>(false)
  const [isCamOn, setIsCamOn] = useState<boolean>(false)

  const [isEmailFormActive, setIsEmailFormActive] = useState<boolean>(false)
  const [isRecording, setIsRecording] = useState<boolean>(false)

  const [isRecControls, setIsRecControls] = useState<boolean>(false)
  const [isRecPaused, setIsRecPaused] = useState<boolean>(false)
  const [isStopRec, setIsStopRec] = useState<boolean>(false)
  const [isEmailFormInvite, setIsEmailFormInvite] = useState<boolean>(false)

  //temp

  const tempNewUsers = [
    {id: '1', avatar: '', name: 'Генри Форд'},
    {id: '2', avatar: '/img/dev/avatar.png', name: 'Генри Форд'},
  ]

  const tempUsers = [
    {id: '3', avatar: '/img/dev/avatar.png', name: 'Генри Форд'},
  ]

  //temp

  const [newUsers, setNewUsers] = useState<IUser[]>(tempNewUsers)

  const [users, setUsers] = useState<IUser[]>(tempUsers)

  const value: IState = {
    ...defaultValue,
    isActiveCameraMenu,
    isStopRec,
    isActiveUsersList,
    isActiveInvite,
    isManualCamera,
    isAutoCamera,
    isStreamsCamera,
    isMicOn,
    isCamOn,
    users,
    newUsers,
    isRecording,
    isRecControls,
    isRecPaused,
    isEmailFormInvite,
    handleStopRec: () => {
      setIsStopRec(true)
      setIsEmailFormActive(true)
    },
    handleRecIsPaused: () => {
      setIsRecPaused(isRecPaused ? false : true)
    },
    handleVisibleRecControls: () => {
      setIsRecControls(true)
    },
    handleRecording: () => {
      setIsRecording(true)
    },
    handleMicrophone: () => {
      setIsMicOn(isMicOn ? false : true)
    },
    handleCamera: () => {
      setIsCamOn(isCamOn ? false : true)
    },
    handleActiveUsersListMenu: () => {
      setIsActiveUsersList(isActiveUsersList ? false : true)
      setIsActiveInvite(false)
      setIsActiveCameraMenu(false)
    },
    handleCameraMenu: () => {
      setIsActiveCameraMenu(isActiveCameraMenu ? false : true)
      setIsActiveInvite(false)
      setIsActiveUsersList(false)
    },
    handleInvite: () => {
      setIsActiveInvite(isActiveInvite ? false : true)
      setIsActiveUsersList(false)
      setIsActiveCameraMenu(false)
      setIsEmailFormActive(true)
      setIsEmailFormInvite(true)
    },
    handleManualCamera: () => {
      setIsManualCamera(isManualCamera ? false : true)
      setIsAutoCamera(false)
      setIsStreamsCamera(false)
    },
    handleAutoCamera: () => {
      setIsAutoCamera(isAutoCamera ? false : true)
      setIsManualCamera(false)
      setIsStreamsCamera(false)
    },
    handleStreamsCamera: () => {
      setIsStreamsCamera(isStreamsCamera ? false : true)
      setIsManualCamera(false)
      setIsAutoCamera(false)
    },
    isEmailFormActive,
    handleCancelEmailForm: () => {
      setIsEmailFormActive(false)
      setIsActiveInvite(false)
      if(isEmailFormInvite){
        setIsEmailFormInvite(false)
      }
      if(isStopRec){
        setIsStopRec(false)
      }
    }
  }


  return (
    <ConfContext.Provider value={value}>
      {props.children}
    </ConfContext.Provider>
  )
}

export function useConfContext() {
  return useContext(ConfContext)
}
