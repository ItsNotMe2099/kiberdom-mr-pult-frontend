import { createContext, useContext, useState } from 'react'

interface IState {
  isZoom: boolean
  isTrueConf: boolean
  soundLevel: number
  updateSoundLevel: (level: number) => void
}

const defaultValue: IState = {
  isZoom: false,
  isTrueConf: false,
  soundLevel: 0,
  updateSoundLevel: (level) => null
}

const AppContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function AppWrapper(props: Props) {

  const [soundLevel, setSoundLevel] = useState<number>(50)


  const value: IState = {
    ...defaultValue,
    isZoom: false,
    isTrueConf: false,
    soundLevel,
    updateSoundLevel: (level) => {
      setSoundLevel(level)
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
