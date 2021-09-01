import { Global } from '@emotion/react';
import baseCSS from '@/styles/baseCSS';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import type { AppProps /*, AppContext */ } from 'next/app';
import wrapper from '@/reducers/index';

import 'semantic-ui-css/semantic.min.css';
import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { syncLocalToRedux } = useAuth();
  useEffect(() => {
    syncLocalToRedux();
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Global styles={[baseCSS]} />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default wrapper.withRedux(MyApp);
