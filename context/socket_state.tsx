import {createContext, useContext, useEffect, useRef} from 'react'
import {Subject} from 'rxjs'
import {useAppContext} from 'context/state'
import useWebSocket from 'react-use-websocket'
import {runtimeConfig} from 'config/runtimeConfig'
const chatIds: number[] = []
interface IState {
  reconnectState$: Subject<boolean>,
  messageState$: Subject<any>,
  join: (chatId: number) => void,
  leave: (chatId: number) => void,
}
const reconnectState$ = new Subject<boolean>()
const messageState$ = new Subject<any>()

const defaultValue: IState = {
  reconnectState$,
  messageState$,
  join: (chatId: number) => null,
  leave: (chatId: number) => null,
}

const ChatSocketContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function ChatSocketWrapper(props: Props) {
  const appContext = useAppContext()
  const reconnectCountRef = useRef<number>(0)

  const didUnmount = useRef(false)

  const {sendMessage, lastMessage, readyState} = useWebSocket(
    `${runtimeConfig.WS_HOST}/api/v1/core/ws`,
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
      console.log('lastMessage', JSON.parse(lastMessage.data))
    }
  }, [lastMessage])



  const value: IState = {
    ...defaultValue,
    join: (chatId: number) => {
      if(!chatIds.includes(chatId)) {
        chatIds.push(chatId)
      }

    },
    leave: (chatId: number) => {
      const index = chatIds.findIndex(i => i === chatId)
      if(index >= 0) {
        chatIds.splice(index, 1)
      }

    },

  }

  return (
    <ChatSocketContext.Provider value={value}>
      {props.children}
    </ChatSocketContext.Provider>
  )
}

export function useChatSocketContext() {
  return useContext(ChatSocketContext)
}
