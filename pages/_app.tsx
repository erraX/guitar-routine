import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline';
import store from '../store';
import Layout from '@/components/Layout';

import type { AppProps } from 'next/app'

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </QueryClientProvider>
	);
}

export default MyApp
