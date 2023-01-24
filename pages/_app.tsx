import 'normalize.css'
import 'styles/globals.scss'
import type { AppProps as NextAppProps } from 'next/app'
import { AppWrapper } from 'context/state'
import { ConfWrapper } from 'context/conference_state'

export interface AppProps extends NextAppProps {
  pageProps: {

  }
}

function MyApp({ Component, pageProps }: AppProps) {


  return (
    <AppWrapper>
      <ConfWrapper>
        <Component {...pageProps} />
      </ConfWrapper>
    </AppWrapper>
  )
}

export default MyApp
