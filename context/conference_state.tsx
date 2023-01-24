import { createContext, useContext, useState } from 'react'

interface IState {
  isActiveCameraMenu: boolean
  isActiveMembers: boolean
  isActiveInvite: boolean
  isManualCamera: boolean
  isAutoCamera: boolean
  isStreamsCamera: boolean
  handleCameraMenu: () => void
  handleMembers: () => void
  handleInvite: () => void
  handleManualCamera: () => void
  handleAutoCamera: () => void
  handleStreamsCamera: () => void
}

const defaultValue: IState = {
  isActiveCameraMenu: false,
  isActiveMembers: false,
  isActiveInvite: false,
  isManualCamera: false,
  isAutoCamera: false,
  isStreamsCamera: false,
  handleCameraMenu: () => null,
  handleMembers: () => null,
  handleInvite: () => null,
  handleManualCamera: () => null,
  handleAutoCamera: () => null,
  handleStreamsCamera: () => null
}

const ConfContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function ConfWrapper(props: Props) {

  const [isActiveCameraMenu, setIsActiveCameraMenu] = useState<boolean>(false)
  const [isActiveMembers, setIsActiveMembers] = useState<boolean>(false)
  const [isActiveInvite, setIsActiveInvite] = useState<boolean>(false)

  const [isManualCamera, setIsManualCamera] = useState<boolean>(false)
  const [isAutoCamera, setIsAutoCamera] = useState<boolean>(false)
  const [isStreamsCamera, setIsStreamsCamera] = useState<boolean>(false)

  const value: IState = {
    ...defaultValue,
    isActiveCameraMenu,
    isActiveMembers,
    isActiveInvite,
    isManualCamera,
    isAutoCamera,
    isStreamsCamera,
    handleCameraMenu: () => {
      setIsActiveCameraMenu(isActiveCameraMenu ? false : true)
      setIsActiveInvite(false)
      setIsActiveMembers(false)
    },
    handleInvite: () => {
      setIsActiveInvite(isActiveInvite ? false : true)
      setIsActiveMembers(false)
      setIsActiveCameraMenu(false)
    },
    handleMembers: () => {
      setIsActiveMembers(isActiveMembers ? false : true)
      setIsActiveInvite(false)
      setIsActiveCameraMenu(false)
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
    }
  }


  return (
    <ConfContext.Provider value={value}>
      {props.children}
    </ConfContext.Provider>
  )
}

export function useConfContext() {
  return useContext(ConfContext)
}
