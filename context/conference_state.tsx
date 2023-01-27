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
  handleMembers: () => void
  handleInvite: () => void
  handleManualCamera: () => void
  handleAutoCamera: () => void
  handleStreamsCamera: () => void
  handleMicrophone: () => void
  handleCamera: () => void
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
  handleMembers: () => null,
  handleInvite: () => null,
  handleManualCamera: () => null,
  handleAutoCamera: () => null,
  handleStreamsCamera: () => null,
  handleMicrophone: () => null,
  handleCamera: () => null
}

const ConfContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function ConfWrapper(props: Props) {

  const [isActiveCameraMenu, setIsActiveCameraMenu] = useState<boolean>(false)
  const [isActiveMembers, setIsActiveMembers] = useState<boolean>(false)
  const [isActiveInvite, setIsActiveInvite] = useState<boolean>(false)

  const [isActiveUsersList, setIsActiveUsersList] = useState<boolean>(false)

  const [isManualCamera, setIsManualCamera] = useState<boolean>(true)
  const [isAutoCamera, setIsAutoCamera] = useState<boolean>(false)
  const [isStreamsCamera, setIsStreamsCamera] = useState<boolean>(false)

  const [isMicOn, setIsMicOn] = useState<boolean>(false)
  const [isCamOn, setIsCamOn] = useState<boolean>(false)

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
    isActiveUsersList,
    isActiveMembers,
    isActiveInvite,
    isManualCamera,
    isAutoCamera,
    isStreamsCamera,
    isMicOn,
    isCamOn,
    users,
    newUsers,
    handleMicrophone: () => {
      setIsMicOn(isMicOn ? false : true)
    },
    handleCamera: () => {
      setIsCamOn(isCamOn ? false : true)
    },
    handleActiveUsersListMenu: () => {
      setIsActiveUsersList(true)
    },
    handleCameraMenu: () => {
      setIsActiveCameraMenu(isActiveCameraMenu ? false : true)
      setIsActiveInvite(false)
      setIsActiveMembers(false)
      setIsActiveUsersList(false)
    },
    handleInvite: () => {
      setIsActiveInvite(isActiveInvite ? false : true)
      setIsActiveMembers(false)
      setIsActiveCameraMenu(false)
    },
    handleMembers: () => {
      setIsActiveMembers(isActiveMembers ? false : true)
      setIsActiveUsersList(isActiveUsersList ? false : true)
      setIsActiveInvite(false)
      setIsActiveCameraMenu(false)
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
