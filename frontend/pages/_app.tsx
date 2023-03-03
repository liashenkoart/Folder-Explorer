// libs
import type { AppProps } from 'next/app'

// assets
import '../styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
