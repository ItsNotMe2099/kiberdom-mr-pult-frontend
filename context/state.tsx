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
  handlePlatform: (platform: Platform) => void
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
  logout: () => void
  fetch: () => void
  coreStatus: ICoreStatus | null
  initialLoading: boolean
  snackbar: SnackbarData | null,
  showSnackbar: (text: string, type: SnackbarType) => void
}

const defaultValue: IState = {
  handlePlatform: (platform) => null,
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
  const [coreStatus, setCoreStatus] = useState<ICoreStatus | null>(null)
  const [soundLevel, setSoundLevel] = useState<number>(coreStatus?.conference?.volume ?? 0)
  const [climateLevel, setClimateLevel] = useState<number>(coreStatus?.climate?.temperature ?? 0)
  const [lightLevelUp, setLightLevelUp] = useState<number>(1)
  const [lightLevelDown, setLightLevelDown] = useState<number>(1)

  const [user, setUser] = useState<IUser | undefined>(props.user)

  const [initialLoading, setInitialLoading] = useState<boolean>(false)

  const [isSoundActive, setIsSoundActive] = useState<boolean>(false)
  const [isClimateActive, setIsClimateActive] = useState<boolean>(false)
  const [isHelpActive, setIsHelpActive] = useState<boolean>(false)
  const [isLightActive, setIsLightActive] = useState<boolean>(false)
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
  //temp
  const init = async  () => {
    const coreStatus = await fetch()
    if(coreStatus?.conference?.started && router.asPath === '/'){
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
    else{
      setUser(trueConfUser)
    }
  }, [])

  const fetch = async (): Promise<ICoreStatus | null> => {
    setInitialLoading(true)
    try {
      const coreStatus = await CoreRepository.fetchStatus()
      setCoreStatus(coreStatus)
      setInitialLoading(false)
      return coreStatus
    }catch (e) {
      if(e instanceof  RequestError){
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
    soundLevel,
    climateLevel,
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
    logout: () => {
      
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
