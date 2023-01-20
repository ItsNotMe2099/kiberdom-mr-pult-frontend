import { IUser } from 'data/interfaces/IUser'
import { createContext, useContext, useEffect, useState } from 'react'

interface IState {
  isZoom: boolean
  isTrueConf: boolean
  soundLevel: number
  climateLevel: number
  updateSoundLevel: (level: number) => void
  updateClimateLevel: (level: number) => void
  user: IUser | undefined
}

const defaultValue: IState = {
  isZoom: false,
  isTrueConf: false,
  soundLevel: 0,
  climateLevel: 0,
  updateSoundLevel: (level) => null,
  updateClimateLevel: (level) => null,
  user: undefined
}

const AppContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  user?: IUser
}

export function AppWrapper(props: Props) {

  const [soundLevel, setSoundLevel] = useState<number>(50)
  const [climateLevel, setClimateLevel] = useState<number>(21)
  const [user, setUser] = useState<IUser | undefined>(props.user)
  const [isZoom, setIsZoom] = useState<boolean>(true)
  const [isTrueConf, setIsisTrueConf] = useState<boolean>(false)

  //temp
  const zoomUser = {
    id: '303-334-43-45'
  }

  const trueConfUser = {
    id: '303-334-43-45'
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
    user,
    updateSoundLevel: (level) => {
      setSoundLevel(level)
    },
    updateClimateLevel: (level) => {
      setClimateLevel(level)
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
