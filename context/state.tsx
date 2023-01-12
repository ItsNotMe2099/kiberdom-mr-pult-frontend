import { createContext, useContext } from 'react'

interface IState {
  isZoom: boolean
  isTrueConf: boolean
}

const defaultValue: IState = {
  isZoom: false,
  isTrueConf: false
}

const AppContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function AppWrapper(props: Props) {
 

  const value: IState = {
    ...defaultValue,
    isZoom: false,
    isTrueConf: false
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
