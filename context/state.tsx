import {IUser} from 'data/interfaces/IUser'
import {createContext, useContext, useEffect, useState} from 'react'
import {ICoreStatus} from 'data/interfaces/ICoreStatus'
import CoreRepository from 'data/repositories/CoreRepository'
import {RequestError} from 'types/types'
import {Platform} from 'data/enum/Platorm'
import {useRouter} from 'next/router'
import { SnackbarData } from 'data/interfaces/ISnackBarData'
import { SnackbarType } from 'types/enums'

interface IState {
  isZoom: boolean
  isTrueConf: boolean
  soundLevel: number
  climateLevel: number
  lightLevelUp: number
  lightLevelDown: number
  updateSoundLevel: (level: number) => void
  updateClimateLevel: (level: number) => void
  updateLightLevelUpZone: (level: number) => void
  updateLightLevelDownZone: (level: number) =>  void
  user: IUser | undefined
  isSoundActive: boolean
  isClimateActive: boolean
  isHelpActive: boolean
  isLightActive: boolean
  handleSoundActive: () => void
  handleClimateActive: () => void
  handleHelpActive: () => void
  handleLightActive: () => void
  loginZoom: () => void
  loginTrueConf: () => void
  logout: () => void
  fetch: () => void
  coreStatus: ICoreStatus | null
  initialLoading: boolean
  snackbar: SnackbarData | null,
  showSnackbar: (text: string, type: SnackbarType) => void
}

const defaultValue: IState = {
  isZoom: false,
  isTrueConf: false,
  soundLevel: 0,
  climateLevel: 0,
  lightLevelUp: 0,
  lightLevelDown: 0,
  updateSoundLevel: (level) => null,
  updateClimateLevel: (level) => null,
  updateLightLevelUpZone: (level) => null,
  updateLightLevelDownZone: (level) =>  null,
  user: undefined,
  isSoundActive: false,
  isClimateActive: false,
  isHelpActive: false,
  isLightActive: false,
  handleSoundActive: () => null,
  handleClimateActive: () => null,
  handleHelpActive: () => null,
  handleLightActive: () => null,
  loginZoom: () => null,
  loginTrueConf: () => null,
  logout: () => null,
  fetch: () => null,
  coreStatus: null,
  initialLoading: false,
  snackbar: null,
  showSnackbar: (text, type) => null,
}

const AppContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  user?: IUser
}

export function AppWrapper(props: Props) {
  const router = useRouter()
  const [soundLevel, setSoundLevel] = useState<number>(50)
  const [climateLevel, setClimateLevel] = useState<number>(21)
  const [lightLevelUp, setLightLevelUp] = useState<number>(1)
  const [lightLevelDown, setLightLevelDown] = useState<number>(1)

  const [user, setUser] = useState<IUser | undefined>(props.user)

  const [isZoom, setIsZoom] = useState<boolean>(false)
  const [isTrueConf, setIsTrueConf] = useState<boolean>(false)
  const [initialLoading, setInitialLoading] = useState<boolean>(false)

  const [isSoundActive, setIsSoundActive] = useState<boolean>(false)
  const [isClimateActive, setIsClimateActive] = useState<boolean>(false)
  const [isHelpActive, setIsHelpActive] = useState<boolean>(false)
  const [isLightActive, setIsLightActive] = useState<boolean>(false)
  const [coreStatus, setCoreStatus] = useState<ICoreStatus | null>(null)
  const [snackbar, setSnackbar] = useState<SnackbarData | null>(null)
  //temp
  const zoomUser = {
    id: '303-334-43-45',
    avatar: '', name: ''
  }

  const trueConfUser = {
    id: '303-334-43-45',
    avatar: '', name: ''
  }
  const init = async  () => {
    const coreStatus = await fetch()
    setInitialLoading(true)
    if(coreStatus?.conference?.started && router.asPath === '/'){
      router.push('/conference')
    }
  }
  //temp
  useEffect(() => {
    init()
  }, [])
  useEffect(() => {
    if (isZoom) {
      setUser(zoomUser)
    }
    else{
      setUser(trueConfUser)
    }
  }, [])
  const fetch = async (): Promise<ICoreStatus | null> => {
    try {
      const coreStatus = await CoreRepository.fetchStatus()
      setCoreStatus(coreStatus)
      return coreStatus
    }catch (e) {
      if(e instanceof  RequestError){
        //Show error
      }
    }
    return null
  }

  const value: IState = {
    ...defaultValue,
    isZoom: coreStatus?.platform === Platform.Zoom,
    isTrueConf: coreStatus?.platform === Platform.TrueConf,
    soundLevel: coreStatus?.conference?.volume ?? 0,
    climateLevel: coreStatus?.climate?.temperature ?? 0,
    lightLevelUp,
    lightLevelDown,
    user,
    isSoundActive,
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
    updateSoundLevel: (level) => {
      setSoundLevel(level)
    },
    updateClimateLevel: (level) => {
      setClimateLevel(level)
    },
    updateLightLevelUpZone: (level) => {
      setLightLevelUp(level)
    },
    updateLightLevelDownZone: (level) => {
      setLightLevelDown(level)
    },
    handleSoundActive: () => {
      setIsSoundActive(true)
      setIsHelpActive(false)
      setIsClimateActive(false)
      setIsLightActive(false)
    },
    handleHelpActive: () => {
      setIsHelpActive(true)
      setIsSoundActive(false)
      setIsClimateActive(false)
      setIsLightActive(false)
    },
    handleClimateActive: () => {
      setIsClimateActive(true)
      setIsHelpActive(false)
      setIsSoundActive(false)
      setIsLightActive(false)
    },
    handleLightActive: () => {
      setIsLightActive(true)
      setIsHelpActive(false)
      setIsClimateActive(false)
      setIsSoundActive(false)
    },
    loginZoom: () => {
      setIsZoom(true)
    },
    loginTrueConf: () => {
      setIsTrueConf(true)
    },
    logout: () => {
      setIsTrueConf(false)
      setIsZoom(false)
    },
    fetch,
    coreStatus,
    initialLoading
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
