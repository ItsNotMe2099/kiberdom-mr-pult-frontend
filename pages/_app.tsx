import 'normalize.css'
import 'styles/globals.scss'
import type { AppProps as NextAppProps } from 'next/app'
import { AppWrapper } from 'context/state'
import Snackbar from 'components/for_pages/Layout/Snackbar'
import Head from 'next/head'
import { useEffect } from 'react'

export interface AppProps extends NextAppProps {
  pageProps: {

  }
}

function MyApp({ Component, pageProps }: AppProps) {


  useEffect(() => {
    if (typeof window !== 'undefined') {
      alert(`${window.innerWidth} window.innerWidth, ${window.innerHeight} window.innerHeight, ${window.outerWidth} window.outerWidth, ${window.outerHeight} indow.outerHeight`)
    }
  })


  return (
    <>
      <Head>
        <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
      </Head>
      <AppWrapper>
        <Component {...pageProps} />
        <Snackbar />
      </AppWrapper>
    </>
  )
}

export default MyApp
