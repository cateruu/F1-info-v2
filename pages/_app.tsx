import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import Layout from '../components/Layout/Layout';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function App({ Component, pageProps }: AppProps) {
  NProgress.configure({
    minimum: 0.3,
    easing: 'ease',
    speed: 800,
    showSpinner: false,
  });

  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
