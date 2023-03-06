import '../styles/globals.css'
import { Mainlayout } from '../src/components/loyout/mainlayout'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Mainlayout>
        <Component {...pageProps} />
      </Mainlayout>
    </>
  )
}
