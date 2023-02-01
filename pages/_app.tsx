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


  return (
    <AppWrapper>
      <Component {...pageProps} />
      <Snackbar />
    </AppWrapper>
  )
}

export default MyApp
