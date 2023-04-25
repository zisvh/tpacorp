import { Html, Head, Main, NextScript } from 'next/document'
export default function Document() {
  return (
      <Html className='scroll-smooth'>
      <Head />
      <body className="dark:bg-zinc-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
