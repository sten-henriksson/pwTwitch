
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (<div> <Component {...pageProps} />
    <style jsx global>{`
      main{
        margin-right: 25%;
        margin-left: 25%;
      }
      html,
      body {
        background: #121212;
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
          Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
          sans-serif;
      }
      * {
        box-sizing: border-box;
      }
  `}</style>
  </div>)
}

export default MyApp
