import { createContext, useContext } from 'react'

interface IState {
  
}

const defaultValue: IState = {
  
}

const AppContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  isMobile?: boolean
}

export function AppWrapper(props: Props) {
 

  const value: IState = {
    ...defaultValue,
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
