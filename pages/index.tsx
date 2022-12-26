import type { NextPage } from 'next';
import ListHeader from '../src/components/ListHeader';
import ListRow from '../src/components/ListRow';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ArticleContext } from '../src/provider/ArticleProvider';

const Home: NextPage = () => {
	const router = useRouter();
	const { articles } = useContext(ArticleContext);
	const titleList = articles.map((article, index) => {
		return (
			<ListRow key={`${article}-${index}`} onClick={() => router.push(`/detail/${index}`)}>
				{article?.title}
			</ListRow>
		);
	});

	return (
		<>
			<ListHeader
				right={
					<button
						className="btn-accent btn-xs btn sm:btn-sm md:btn-md"
						onClick={() => {
							router.push('/create');
						}}
					>
						새 글 쓰기
					</button>
				}
			>
				디어 게시판
			</ListHeader>
			{titleList}
		</>
	);
};

export default Home;
