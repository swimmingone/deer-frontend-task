import Layout from '../src/components/Layout';
import ArticleProvider from '../src/provider/ArticleProvider';
import '../src/styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ArticleProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ArticleProvider>
	);
}

export default MyApp;
