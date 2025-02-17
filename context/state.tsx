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
import { RightSideControl } from 'data/enum/RightSideControl'
import { CamState } from 'data/enum/CamState'
import CamRepository from 'data/repositories/CamRepository'
import { Timers } from 'types/constants'

interface IState {
  volumeLevel: number
  climateLevel: number
  lightLevelUp: number
  lightLevelDown: number
  updateVolumeLevel: (level: number) => void
  updateClimateLevel: (level: number) => void
  updateLightLevelUpZone: (level: number) => void
  updateLightLevelDownZone: (level: number) => void
  fetch: () => void
  coreStatus: ICoreStatus | null
  camOption: CamState
  initialLoading: boolean
  snackbar: SnackbarData | null
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
  //handleManualCamera: () => void
  //handleAutoCamera: () => void
  //handleStreamsCamera: () => void
  handleCamOption: (option: CamState) => void
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
  adminCalled: boolean
  handleAdminCalled: () => void
  loginLoading: boolean
  led: { [key: string]: ILedStatus } | null
  rightMode: RightSideControl | null,
  setRightMode: (mode: RightSideControl) => void
  hideRightMode: (mode: RightSideControl) => void
  showIframe: () => void
  isIframeShown: boolean
  isActiveZoom: boolean
  isActiveConf: boolean
  setIsActiveZoom: (state: boolean) => void
  setIsActiveConf: (state:boolean) => void
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
  camOption: CamState.Faces,
  micState: OnOffState.Off,
  camState: OnOffState.Off,
  bgMusicState: OnOffState.Off,
  handleActiveUsersListMenu: () => null,
  handleCameraMenu: () => null,
  handleInvite: () => null,
  //handleManualCamera: () => null,
  //handleAutoCamera: () => null,
  //handleStreamsCamera: () => null,
  handleCamOption: () => null,
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
  adminCalled: false,
  handleAdminCalled: () => null,
  led: null,
  rightMode: null,
  setRightMode: (mode: RightSideControl) => null,
  hideRightMode: (mode: RightSideControl) => null,
  showIframe: () => null,
  isIframeShown: false,
  isActiveZoom: false,
  isActiveConf: false,
  setIsActiveZoom: (state) => null,
  setIsActiveConf: (state) => null
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

  const [adminCalled, setAdminCalled] = useState<boolean>(false)

  const [initialLoading, setInitialLoading] = useState<boolean>(true)

  const [rightMode, setRightMode] = useState<RightSideControl | null>(null)
  const rightModeRef = useRef<RightSideControl | null>(null)
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

  const [camOption, setCamOption] = useState<CamState>(CamState.Faces)

  const [isIframeShown, setShowIframe] = useState<boolean>(false)

  const [isActiveZoom, setIsActiveZoom] = useState<boolean>(false)
  const [isActiveConf, setIsActiveConf] = useState<boolean>(false)


  useEffect(() => {
    rightModeRef.current = rightMode
  }, [rightMode])
  const init = async () => {
    await fetch()
  }

  const didUnmount = useRef(false)

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `${runtimeConfig.WS_HOST || (typeof window !== 'undefined' ? `ws://${window.location.host}` : '')}/api/v1/core/ws`,
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
    setLightLevelUp((coreStatus.light as { [key: string]: ILightStatus })['LAMP-Z-1']?.level ?? 1)
    setLightLevelDown((coreStatus.light as { [key: string]: ILightStatus })['LAMP-Z-2']?.level ?? 1)
    setLed(coreStatus.led)
    setCamOption(coreStatus.touch_designer.camera)
  }

  const fetch = async (): Promise<ICoreStatus | null> => {
    !loginLoading ? setInitialLoading(true) : null
    try {
      const coreStatus = await CoreRepository.fetchStatus()
      setStats(coreStatus)
      return coreStatus
    } catch (e) {
      console.error('Eeeee', e)
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
    rightMode,
    snackbar,
    loginLoading,
    led,
    adminCalled,
    isIframeShown,
    isActiveConf,
    isActiveZoom,
    setIsActiveZoom: (state) => {
      setIsActiveZoom(state)
    },
    setIsActiveConf: (state) => {
      setIsActiveConf(state)
    },
    showIframe: () => {
      setShowIframe(!isIframeShown)
    },
    handleAdminCalled: () => {
      setAdminCalled(adminCalled ? false : true)
    },
    handleLoginLoading: (state: boolean) => {
      setLoginLoading(state)
    },
    showSnackbar: (text, type: SnackbarType) => {
      setSnackbar({ text, type })
      setTimeout(() => {
        setSnackbar(null)
      }, Timers.showErrorBanner)
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
    setRightMode: (mode: RightSideControl) => {
      setRightMode(mode)
    },
    hideRightMode: (mode: RightSideControl) => {
      console.log('hideRightMode', mode)
      if (mode === rightModeRef.current) {
        setRightMode(null)
      }
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
    camOption,
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
    /*handleManualCamera: () => {
      setIsManualCamera(isManualCamera ? false : true)
      setCamOption()
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
    },*/
    handleCamOption: async (option) => {
      const newState = option
      await CamRepository.setCameraState(newState)
      setCoreStatus({ ...coreStatus, touch_designer: { ...coreStatus?.touch_designer, camera: newState } } as ICoreStatus)
      setCamOption(newState)
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
