import type { NextPage } from 'next';
import ListHeader from '../src/components/ListHeader';
import ListRow from '../src/components/ListRow';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { getArticles } from '../src/apis/article';

const Home: NextPage = () => {
	const { data: articles } = useQuery('articles', () => getArticles({}));
	const titleList = articles?.content.map((article) => {
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
