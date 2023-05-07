import '../styles/globals.css'
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline';
import store from '../store';
import Layout from '@/components/Layout';

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
	return (
    <Provider store={store}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
	);
}

export default MyApp
