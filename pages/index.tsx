import ConferencePage from 'components/for_pages/conference/Page'
import MainPage from 'components/for_pages/main/Page'
import { useAppContext } from 'context/state'

export default function IndexPage() {

  const appContext = useAppContext()

  if (appContext.coreStatus?.conference.started) {
    return <ConferencePage />
  }
  else {
    return <MainPage />
  }
}
