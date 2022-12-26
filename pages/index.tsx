import type { NextPage } from 'next';
import ListHeader from '../src/components/ListHeader';
import ListRow from '../src/components/ListRow';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
	const router = useRouter();
	const articleList = [...Array(20)].map((_, index) => {
		return { title: `게시글${index}` };
	});
	const titleList = articleList.map((article, index) => {
		return <ListRow key={`${article}-${index}`}>{article?.title}</ListRow>;
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
