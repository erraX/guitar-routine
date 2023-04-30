import '../styles/globals.css'
import { Provider } from 'react-redux'
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import store from '../store';
import Layout from '@/components/Layout';

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<GeistProvider>
			<Provider store={store}>
				<CssBaseline />
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</GeistProvider>
	);
}

export default MyApp
