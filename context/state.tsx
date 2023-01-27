import { IUser } from 'data/interfaces/IUser'
import { createContext, useContext, useEffect, useState } from 'react'

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
  handleLightActive: () => null
}

const AppContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  user?: IUser
}

export function AppWrapper(props: Props) {

  const [soundLevel, setSoundLevel] = useState<number>(50)
  const [climateLevel, setClimateLevel] = useState<number>(21)
  const [lightLevelUp, setLightLevelUp] = useState<number>(1)
  const [lightLevelDown, setLightLevelDown] = useState<number>(1)

  const [user, setUser] = useState<IUser | undefined>(props.user)

  const [isZoom, setIsZoom] = useState<boolean>(true)
  const [isTrueConf, setIsTrueConf] = useState<boolean>(false)

  const [isSoundActive, setIsSoundActive] = useState<boolean>(false)
  const [isClimateActive, setIsClimateActive] = useState<boolean>(false)
  const [isHelpActive, setIsHelpActive] = useState<boolean>(false)
  const [isLightActive, setIsLightActive] = useState<boolean>(false)
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

  useEffect(() => {
    if (isZoom) {
      setUser(zoomUser)
    }
    else{
      setUser(trueConfUser)
    }
  }, [])


  const value: IState = {
    ...defaultValue,
    isZoom,
    isTrueConf,
    soundLevel,
    climateLevel,
    lightLevelUp,
    lightLevelDown,
    user,
    isSoundActive,
    isClimateActive,
    isHelpActive,
    isLightActive,
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
