import Layout from 'components/for_pages/Layout'
import Loader from 'components/for_pages/logged/loader'
import { useAppContext } from 'context/state'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'

export default function LoggedPage() {

  const [loading, setIsLoading] = useState<boolean>(true)

  const appContext = useAppContext()

  /*useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }, [])*/


  return (
    <Layout loading={false}>
      <div className={styles.root}>
        {loading ? <Loader color={appContext.isTrueConf ? 'green' : 'blue'} icon={appContext.isTrueConf ? '/img/logos/trueconf.svg' : '/img/logos/zoom.png'}/> : null}
      </div>
    </Layout>
  )
}
