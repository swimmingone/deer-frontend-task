import type { NextPage } from 'next';
import ListHeader from '../src/components/ListHeader';
import ListRow from '../src/components/ListRow';
import { useContext } from 'react';
import { ArticleContext } from '../src/provider/ArticleProvider';
import Link from 'next/link';

const Home: NextPage = () => {
	const { articles } = useContext(ArticleContext);
	const titleList = articles.map((article) => {
		return (
			<ListRow key={article.id} href={`/detail/${article.id}`}>
				{article?.title}
			</ListRow>
		);
	});

	return (
		<>
			<ListHeader
				right={
					<Link className="btn-accent btn-xs btn sm:btn-sm md:btn-md" href={'/create'}>
						새 글 쓰기
					</Link>
				}
			>
				디어 게시판
			</ListHeader>
			{titleList}
		</>
	);
};

export default Home;
