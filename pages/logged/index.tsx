import Layout from 'components/for_pages/Layout'
import LayoutAuthorized from 'components/for_pages/logged/LayoutAuthorized'
import Loader from 'components/for_pages/logged/loader'
import { useAppContext } from 'context/state'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'

export default function LoggedPage() {

  const [loading, setIsLoading] = useState<boolean>(true)

  const appContext = useAppContext()

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }, [])

  console.log(appContext.isZoom)


  return (
    <Layout loading={false}>
      <div className={classNames(styles.root, {[styles.loaded]: !loading})}>
        {loading ?
          <Loader
            color={appContext.isTrueConf ? 'green' : 'blue'}
            icon={appContext.isTrueConf ? '/img/logos/trueconf.svg' : '/img/logos/zoom.png'} />
          :
          <LayoutAuthorized>
            
          </LayoutAuthorized>}
      </div>
    </Layout>
  )
}
