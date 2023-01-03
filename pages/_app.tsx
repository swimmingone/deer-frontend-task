import Layout from '../src/components/Layout';
import ArticleProvider from '../src/provider/ArticleProvider';
import '../src/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<ArticleProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ArticleProvider>
		</QueryClientProvider>
	);
}

export default MyApp;
