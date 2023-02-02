import { IUser } from 'data/interfaces/IUser'
import { createContext, useContext, useEffect, useState } from 'react'
import { ICoreStatus } from 'data/interfaces/ICoreStatus'
import CoreRepository from 'data/repositories/CoreRepository'
import { RequestError } from 'types/types'
import { Platform } from 'data/enum/Platorm'
import { useRouter } from 'next/router'
import { SnackbarData } from 'data/interfaces/ISnackBarData'
import { SnackbarType } from 'types/enums'
import { MicrophoneState } from 'data/enum/MicrophoneState'
import { CameraState } from 'data/enum/CameraState'
import ParticipantRepository from 'data/repositories/ParticipantsRepository'
import RecordRepository from 'data/repositories/RecordRepository'
import IotRepository from 'data/repositories/IotRepository'

interface IState {
  handlePlatform: (platform: Platform) => void
  volumeLevel: number
  climateLevel: number
  lightLevelUp: number
  lightLevelDown: number
  updateVolumeLevel: (level: number) => void
  updateClimateLevel: (level: number) => void
  updateLightLevelUpZone: (level: number) => void
  updateLightLevelDownZone: (level: number) => void
  user: IUser | undefined
  isVolumeActive: boolean
  isClimateActive: boolean
  isHelpActive: boolean
  isLightActive: boolean
  handleVolumeActive: () => void
  handleClimateActive: () => void
  handleHelpActive: () => void
  handleLightActive: () => void
  logout: () => void
  fetch: () => void
  coreStatus: ICoreStatus | null
  initialLoading: boolean
  snackbar: SnackbarData | null,
  showSnackbar: (text: string, type: SnackbarType) => void
  isActiveCameraMenu: boolean
  isActiveUsersList: boolean
  isActiveMembers: boolean
  isActiveInvite: boolean
  isManualCamera: boolean
  isAutoCamera: boolean
  isStreamsCamera: boolean
  micState: MicrophoneState
  camState: CameraState
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
  isMuteAll: boolean
  handleMuteAll: () => void
}

const defaultValue: IState = {
  handlePlatform: (platform) => null,
  volumeLevel: 0,
  climateLevel: 0,
  lightLevelUp: 0,
  lightLevelDown: 0,
  updateVolumeLevel: (level) => null,
  updateClimateLevel: (level) => null,
  updateLightLevelUpZone: (level) => null,
  updateLightLevelDownZone: (level) => null,
  user: undefined,
  isVolumeActive: false,
  isClimateActive: false,
  isHelpActive: false,
  isLightActive: false,
  handleVolumeActive: () => null,
  handleClimateActive: () => null,
  handleHelpActive: () => null,
  handleLightActive: () => null,
  logout: () => null,
  fetch: () => null,
  coreStatus: null,
  initialLoading: false,
  snackbar: null,
  showSnackbar: (text, type) => null,
  isActiveCameraMenu: false,
  isActiveUsersList: false,
  isActiveMembers: false,
  isActiveInvite: false,
  isManualCamera: false,
  isAutoCamera: false,
  isStreamsCamera: false,
  micState: MicrophoneState.Off,
  camState: CameraState.Off,
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
  isEmailFormInvite: false,
  isMuteAll: false,
  handleMuteAll: () => null
}

const AppContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  user?: IUser
}

export function AppWrapper(props: Props) {
  const router = useRouter()
  const [coreStatus, setCoreStatus] = useState<ICoreStatus | null>(null)
  const [volumeLevel, setVolumeLevel] = useState<number>(0)
  const [climateLevel, setClimateLevel] = useState<number>(20)
  const [lightLevelUp, setLightLevelUp] = useState<number>(1)
  const [lightLevelDown, setLightLevelDown] = useState<number>(1)

  const [user, setUser] = useState<IUser | undefined>(props.user)

  const [initialLoading, setInitialLoading] = useState<boolean>(true)

  const [isVolumeActive, setIsVolumeActive] = useState<boolean>(false)
  const [isClimateActive, setIsClimateActive] = useState<boolean>(false)
  const [isHelpActive, setIsHelpActive] = useState<boolean>(false)
  const [isLightActive, setIsLightActive] = useState<boolean>(false)
  const [snackbar, setSnackbar] = useState<SnackbarData | null>(null)

  const [isActiveCameraMenu, setIsActiveCameraMenu] = useState<boolean>(false)
  const [isActiveInvite, setIsActiveInvite] = useState<boolean>(false)

  const [isActiveUsersList, setIsActiveUsersList] = useState<boolean>(false)

  const [isManualCamera, setIsManualCamera] = useState<boolean>(true)
  const [isAutoCamera, setIsAutoCamera] = useState<boolean>(false)
  const [isStreamsCamera, setIsStreamsCamera] = useState<boolean>(false)

  const [micState, setMicState] = useState<MicrophoneState>(MicrophoneState.Off)
  const [camState, setCamState] = useState<CameraState>(CameraState.Off)

  const [isEmailFormActive, setIsEmailFormActive] = useState<boolean>(false)
  const [isRecording, setIsRecording] = useState<boolean>(false)

  const [isRecControls, setIsRecControls] = useState<boolean>(false)
  const [isRecPaused, setIsRecPaused] = useState<boolean>(false)
  const [isStopRec, setIsStopRec] = useState<boolean>(false)
  const [isEmailFormInvite, setIsEmailFormInvite] = useState<boolean>(false)

  const [isMuteAll, setIsMuteAll] = useState<boolean>(false)

  //temp
  const zoomUser = {
    id: '303-334-43-45',
    avatar: '', name: ''
  }

  const trueConfUser = {
    id: '303-334-43-45',
    avatar: '', name: ''
  }
  //temp
  //temp

  const tempNewUsers = [
    { id: '1', avatar: '', name: 'Генри Форд' },
    { id: '2', avatar: '/img/dev/avatar.png', name: 'Генри Форд' },
  ]

  const tempUsers = [
    { id: '3', avatar: '/img/dev/avatar.png', name: 'Генри Форд' },
  ]

  //temp

  const [newUsers, setNewUsers] = useState<IUser[]>(tempNewUsers)

  const [users, setUsers] = useState<IUser[]>(tempUsers)

  const init = async () => {
    const coreStatus = await fetch()
    if (coreStatus?.conference?.started && router.asPath === '/') {
      //router.push('/conference')
    }
  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    if (coreStatus?.platform === Platform.Zoom) {
      setUser(zoomUser)
    }
    else {
      setUser(trueConfUser)
    }
  }, [])

  const fetch = async (): Promise<ICoreStatus | null> => {
    try {
      const coreStatus = await CoreRepository.fetchStatus()
      const climateLevel = await IotRepository.getState('CLIMAT')
      const lightLevelUp = await IotRepository.getState('LAMP-Z-1')
      const lightLevelDown = await IotRepository.getState('LAMP-Z-2')
      setCoreStatus(coreStatus)
      setMicState(coreStatus.conference.microphone ?? MicrophoneState.Off)
      setCamState(coreStatus.conference.camera ?? CameraState.Off)
      setVolumeLevel(coreStatus.conference.volume ?? 0)
      setClimateLevel(climateLevel.state ?? 20)
      setLightLevelUp(lightLevelUp.state ?? 1)
      setLightLevelDown(lightLevelDown.state ?? 1)
      setInitialLoading(false)
      return coreStatus
    } catch (e) {
      if (e instanceof RequestError) {
        //Show error
      }
    }
    setInitialLoading(false)
    return null
  }

  const value: IState = {
    ...defaultValue,
    handlePlatform: async (platform: Platform) => {
      await CoreRepository.selectPlatform(platform)
      fetch()
      router.push('/conference')
    },
    volumeLevel,
    climateLevel,
    lightLevelUp,
    lightLevelDown,
    user,
    isVolumeActive,
    isClimateActive,
    isHelpActive,
    isLightActive,
    snackbar,
    showSnackbar: (text, type: SnackbarType) => {
      setSnackbar({ text, type })
      setTimeout(() => {
        setSnackbar(null)
      }, 2000)
    },
    updateVolumeLevel: async (level) => {
      await CoreRepository.setVolume(level)
      setCoreStatus({ ...coreStatus, conference: { ...coreStatus?.conference, volume: level } } as ICoreStatus)
      setVolumeLevel(level)
    },
    updateClimateLevel: async (level) => {
      await IotRepository.setState('CLIMAT', level)
      setClimateLevel(level)
    },
    updateLightLevelUpZone: async (level) => {
      await IotRepository.setState('LAMP-Z-1', level)
      setLightLevelUp(level)
    },
    updateLightLevelDownZone: async (level) => {
      await IotRepository.setState('LAMP-Z-2', level)
      setLightLevelDown(level)
    },
    handleVolumeActive: () => {
      setIsVolumeActive(true)
      setIsHelpActive(false)
      setIsClimateActive(false)
      setIsLightActive(false)
    },
    handleHelpActive: () => {
      setIsHelpActive(true)
      setIsVolumeActive(false)
      setIsClimateActive(false)
      setIsLightActive(false)
    },
    handleClimateActive: () => {
      setIsClimateActive(true)
      setIsHelpActive(false)
      setIsVolumeActive(false)
      setIsLightActive(false)
    },
    handleLightActive: () => {
      setIsLightActive(true)
      setIsHelpActive(false)
      setIsClimateActive(false)
      setIsVolumeActive(false)
    },
    logout: () => {

    },
    fetch,
    coreStatus,
    initialLoading,
    isActiveCameraMenu,
    isStopRec,
    isActiveUsersList,
    isActiveInvite,
    isManualCamera,
    isAutoCamera,
    isStreamsCamera,
    micState,
    camState,
    users,
    newUsers,
    isRecording,
    isRecControls,
    isRecPaused,
    isEmailFormInvite,
    handleStopRec: async () => {
      const newStatus = true
      await RecordRepository.stop()
      setIsStopRec(newStatus)
      setIsEmailFormActive(newStatus)
    },
    handleRecIsPaused: async () => {
      const newState = isRecPaused ? false : true
      await RecordRepository.pause()
      setIsRecPaused(newState)
    },
    handleVisibleRecControls: () => {
      setIsRecControls(true)
    },
    handleRecording: async () => {
      const newState = true
      await RecordRepository.start()
      setIsRecording(newState)
    },
    handleMicrophone: async () => {
      const newMicState = micState === MicrophoneState.On ? MicrophoneState.Off : MicrophoneState.On
      await CoreRepository.setMicrophoneState(newMicState)
      setCoreStatus({ ...coreStatus, conference: { ...coreStatus?.conference, microphone: newMicState } } as ICoreStatus)
      setMicState(newMicState)
    },
    handleCamera: async () => {
      const newState = camState === CameraState.On ? CameraState.Off : CameraState.On
      await CoreRepository.setCameraState(newState)
      setCoreStatus({ ...coreStatus, conference: { ...coreStatus?.conference, camera: newState } } as ICoreStatus)
      setCamState(newState)
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
      if (isEmailFormInvite) {
        setIsEmailFormInvite(false)
      }
      if (isStopRec) {
        setIsStopRec(false)
      }
    },
    isMuteAll,
    handleMuteAll: async () => {
      const newState = true
      await ParticipantRepository.muteAudioAll()
      setIsMuteAll(newState)
    }
  }


  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
