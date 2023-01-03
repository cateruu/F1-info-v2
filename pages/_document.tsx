import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className='min-h-screen w-screen bg-slate-900 overflow-x-hidden'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
