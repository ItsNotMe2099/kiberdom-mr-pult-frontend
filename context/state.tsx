import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { ICoreStatus } from 'data/interfaces/ICoreStatus'
import CoreRepository from 'data/repositories/CoreRepository'
import { RequestError } from 'types/types'
import { SnackbarData } from 'data/interfaces/ISnackBarData'
import { SnackbarType } from 'types/enums'
import RecordRepository from 'data/repositories/RecordRepository'
import IotRepository from 'data/repositories/IotRepository'
import { ILedStatus } from 'data/interfaces/ILedStatus'
import { OnOffState } from 'data/enum/OnOffState'
import { ILightStatus } from 'data/interfaces/ILightStatus'
import useWebSocket from 'react-use-websocket'
import { runtimeConfig } from 'config/runtimeConfig'

interface IState {
  volumeLevel: number
  climateLevel: number
  lightLevelUp: number
  lightLevelDown: number
  updateVolumeLevel: (level: number) => void
  updateClimateLevel: (level: number) => void
  updateLightLevelUpZone: (level: number) => void
  updateLightLevelDownZone: (level: number) => void
  isVolumeActive: boolean
  isClimateActive: boolean
  isHelpActive: boolean
  isLightActive: boolean
  handleVolumeActive: () => void
  handleClimateActive: () => void
  handleHelpActive: () => void
  handleLightActive: () => void
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
  micState: OnOffState
  camState: OnOffState
  bgMusicState: OnOffState
  handleActiveUsersListMenu: () => void
  handleCameraMenu: () => void
  handleInvite: () => void
  handleManualCamera: () => void
  handleAutoCamera: () => void
  handleStreamsCamera: () => void
  handleMicrophone: () => void
  handleCamera: () => void
  handleBgMusic: () => void
  isEmailFormActive: boolean
  handleCancelEmailForm: () => void
  handleRecording: () => void
  isRecording: boolean
  handleVisibleRecControls: () => void
  isRecControls: boolean
  isRecPaused: OnOffState
  handleRecIsPaused: () => void
  isStopRec: boolean
  handleStopRec: () => void
  isEmailFormInvite: boolean
  handleLoginLoading: (state: boolean) => void
  loginLoading: boolean
  led: { [key: string]: ILedStatus } | null
}

const defaultValue: IState = {
  volumeLevel: 0,
  climateLevel: 0,
  lightLevelUp: 0,
  lightLevelDown: 0,
  updateVolumeLevel: (level) => null,
  updateClimateLevel: (level) => null,
  updateLightLevelUpZone: (level) => null,
  updateLightLevelDownZone: (level) => null,
  isVolumeActive: false,
  isClimateActive: false,
  isHelpActive: false,
  isLightActive: false,
  handleVolumeActive: () => null,
  handleClimateActive: () => null,
  handleHelpActive: () => null,
  handleLightActive: () => null,
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
  micState: OnOffState.Off,
  camState: OnOffState.Off,
  bgMusicState: OnOffState.Off,
  handleActiveUsersListMenu: () => null,
  handleCameraMenu: () => null,
  handleInvite: () => null,
  handleManualCamera: () => null,
  handleAutoCamera: () => null,
  handleStreamsCamera: () => null,
  handleMicrophone: () => null,
  handleCamera: () => null,
  handleBgMusic: () => null,
  isEmailFormActive: false,
  handleCancelEmailForm: () => null,
  handleRecording: () => null,
  isRecording: false,
  handleVisibleRecControls: () => null,
  isRecControls: false,
  isRecPaused: OnOffState.Off,
  handleRecIsPaused: () => null,
  isStopRec: false,
  handleStopRec: () => null,
  isEmailFormInvite: false,
  loginLoading: false,
  handleLoginLoading: (state) => null,
  led: null
}

const AppContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function AppWrapper(props: Props) {
  const [coreStatus, setCoreStatus] = useState<ICoreStatus | null>(null)
  const [led, setLed] = useState<{ [key: string]: ILedStatus } | null>(null)
  const [volumeLevel, setVolumeLevel] = useState<number>(0)
  const [climateLevel, setClimateLevel] = useState<number>(20)
  const [lightLevelUp, setLightLevelUp] = useState<number>(1)
  const [lightLevelDown, setLightLevelDown] = useState<number>(1)

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

  //ON/OFF states
  const [micState, setMicState] = useState<OnOffState>(OnOffState.Off)
  const [camState, setCamState] = useState<OnOffState>(OnOffState.Off)
  const [bgMusicState, setBgMusicState] = useState<OnOffState>(OnOffState.Off)
  const [isRecPaused, setIsRecPaused] = useState<OnOffState>(OnOffState.Off)
  ////

  const [isEmailFormActive, setIsEmailFormActive] = useState<boolean>(false)
  const [isRecording, setIsRecording] = useState<boolean>(false)

  const [isRecControls, setIsRecControls] = useState<boolean>(false)
  const [isStopRec, setIsStopRec] = useState<boolean>(false)
  const [isEmailFormInvite, setIsEmailFormInvite] = useState<boolean>(false)

  const [loginLoading, setLoginLoading] = useState<boolean>(false)

  const init = async () => {
    await fetch()
  }

  const didUnmount = useRef(false)

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `${runtimeConfig.WS_HOST}/api/v1/core/ws`,
    {
      shouldReconnect: (closeEvent) => {
        /*
        useWebSocket will handle unmounting for you, but this is an example of a
        case in which you would not want it to automatically reconnect
      */
        return didUnmount.current === false
      },
      reconnectAttempts: 10000,
      reconnectInterval: 3000,
    }
  )
  useEffect(() => {
    if (lastMessage !== null) {

      // Обновляем state
      try {
        console.log('lastMessage', JSON.parse(lastMessage.data))
        const coreStatus = JSON.parse(lastMessage.data)
        setStats(coreStatus)
      }
      catch (e) {

      }
    }
  }, [lastMessage, setCoreStatus])

  useEffect(() => {
    init()
  }, [])

  const setStats = (coreStatus: ICoreStatus) => {
    setCoreStatus(coreStatus)
    setMicState(coreStatus.conference.microphone ?? OnOffState.Off)
    setCamState(coreStatus.conference.camera ?? OnOffState.Off)
    setBgMusicState(coreStatus.audio_processor.bg_music ?? OnOffState.Off)
    setVolumeLevel(coreStatus.audio_processor.level ?? 0)
    setClimateLevel(coreStatus.climate.temperature ?? 20)
    setLightLevelUp((coreStatus.light as { [key: string]: ILightStatus })['LAMP-Z-1'].level ?? 1)
    setLightLevelDown((coreStatus.light as { [key: string]: ILightStatus })['LAMP-Z-2'].level ?? 1)
    setLed(coreStatus.led)
  }

  const fetch = async (): Promise<ICoreStatus | null> => {
    setInitialLoading(true)
    try {
      const coreStatus = await CoreRepository.fetchStatus()
      setStats(coreStatus)
      return coreStatus
    } catch (e) {
      if (e instanceof RequestError) {
        //Show error
      }
    }
    finally {
      setInitialLoading(false)
    }
    return null
  }

  console.log(coreStatus)

  const value: IState = {
    ...defaultValue,
    volumeLevel,
    climateLevel,
    lightLevelUp,
    lightLevelDown,
    isVolumeActive,
    isClimateActive,
    isHelpActive,
    isLightActive,
    snackbar,
    loginLoading,
    led,
    handleLoginLoading: (state: boolean) => {
      setLoginLoading(state)
    },
    showSnackbar: (text, type: SnackbarType) => {
      setSnackbar({ text, type })
      setTimeout(() => {
        setSnackbar(null)
      }, 2000)
    },
    updateVolumeLevel: async (level) => {
      await CoreRepository.setVolume(level.toString())
      setCoreStatus({ ...coreStatus, audio_processor: { ...coreStatus?.audio_processor, level: level } } as ICoreStatus)
      setVolumeLevel(level)
    },
    updateClimateLevel: async (level) => {
      await IotRepository.setState('CLIMAT', level.toString())
      setClimateLevel(level)
    },
    updateLightLevelUpZone: async (level) => {
      await IotRepository.setState('LAMP-Z-1', level.toString())
      setLightLevelUp(level)
    },
    updateLightLevelDownZone: async (level) => {
      await IotRepository.setState('LAMP-Z-2', level.toString())
      setLightLevelDown(level)
    },
    handleVolumeActive: () => {
      setIsVolumeActive(isVolumeActive ? false : true)
      setIsHelpActive(false)
      setIsClimateActive(false)
      setIsLightActive(false)
    },
    handleHelpActive: () => {
      setIsHelpActive(isHelpActive ? false : true)
      setIsVolumeActive(false)
      setIsClimateActive(false)
      setIsLightActive(false)
    },
    handleClimateActive: () => {
      setIsClimateActive(isClimateActive ? false : true)
      setIsHelpActive(false)
      setIsVolumeActive(false)
      setIsLightActive(false)
    },
    handleLightActive: () => {
      setIsLightActive(isLightActive ? false : true)
      setIsHelpActive(false)
      setIsClimateActive(false)
      setIsVolumeActive(false)
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
    bgMusicState,
    isRecording,
    isRecControls,
    isRecPaused,
    isEmailFormInvite,
    handleStopRec: async () => {
      const newStatus = true
      await RecordRepository.stop()
      setIsStopRec(newStatus)
      setIsRecording(false)
      setIsRecControls(false)
      setIsEmailFormActive(newStatus)
    },
    handleRecIsPaused: async () => {
      const newState = isRecPaused === OnOffState.On ? OnOffState.Off : OnOffState.On
      const newRecState = newState === OnOffState.On ? 'paused' : 'record'
      await RecordRepository.pause(newState)
      setCoreStatus({ ...coreStatus, recorder: { ...coreStatus?.recorder, status: newRecState } } as ICoreStatus)
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
      const newMicState = micState === OnOffState.On ? OnOffState.Off : OnOffState.On
      await CoreRepository.setMicrophoneState(newMicState)
      setCoreStatus({ ...coreStatus, conference: { ...coreStatus?.conference, microphone: newMicState } } as ICoreStatus)
      setMicState(newMicState)
    },
    handleCamera: async () => {
      const newState = camState === OnOffState.On ? OnOffState.Off : OnOffState.On
      await CoreRepository.setCameraState(newState)
      setCoreStatus({ ...coreStatus, conference: { ...coreStatus?.conference, camera: newState } } as ICoreStatus)
      setCamState(newState)
    },
    handleBgMusic: async () => {
      const newState = bgMusicState === OnOffState.On ? OnOffState.Off : OnOffState.On
      await CoreRepository.setBgMusicState(newState)
      setCoreStatus({ ...coreStatus, conference: { ...coreStatus?.conference, bgMusic: newState } } as ICoreStatus)
      setBgMusicState(newState)
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
