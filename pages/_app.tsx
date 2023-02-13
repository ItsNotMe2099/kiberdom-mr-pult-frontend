import 'normalize.css'
import 'styles/globals.scss'
import type { AppProps as NextAppProps } from 'next/app'
import { AppWrapper } from 'context/state'
import Snackbar from 'components/for_pages/Layout/Snackbar'

export interface AppProps extends NextAppProps {
  pageProps: {

  }
}

function MyApp({ Component, pageProps }: AppProps) {

  alert(`${window.innerWidth} window.innerWidth`)
  alert(`${window.innerHeight} window.innerHeight`)
  alert(`${window.outerWidth} window.outerWidth`)
  alert(`${window.outerHeight} indow.outerHeight`)


  return (
    <AppWrapper>
      <Component {...pageProps} />
      <Snackbar />
    </AppWrapper>
  )
}

export default MyApp
