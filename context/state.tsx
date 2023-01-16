import { createContext, useContext, useState } from 'react'

interface IState {
  isZoom: boolean
  isTrueConf: boolean
  soundLevel: number
  climateLevel: number
  updateSoundLevel: (level: number) => void
  updateClimateLevel: (level: number) => void
}

const defaultValue: IState = {
  isZoom: false,
  isTrueConf: false,
  soundLevel: 0,
  climateLevel: 0,
  updateSoundLevel: (level) => null,
  updateClimateLevel: (level) => null
}

const AppContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function AppWrapper(props: Props) {

  const [soundLevel, setSoundLevel] = useState<number>(50)
  const [climateLevel, setClimateLevel] = useState<number>(21)


  const value: IState = {
    ...defaultValue,
    isZoom: false,
    isTrueConf: false,
    soundLevel,
    climateLevel,
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
