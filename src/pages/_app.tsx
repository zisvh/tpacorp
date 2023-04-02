import type { AppProps } from 'next/app'
import "../Globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
