import 'normalize.css'
import 'styles/globals.scss'
import type {AppProps as NextAppProps } from 'next/app'
import { AppWrapper } from 'context/state'

export interface AppProps extends NextAppProps {
  pageProps: {
    
  }
}

function MyApp({ Component, pageProps }: AppProps) {


  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default MyApp
