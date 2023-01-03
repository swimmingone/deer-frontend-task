import type { NextPage } from 'next';
import ListHeader from '../src/components/ListHeader';
import ListRow from '../src/components/ListRow';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { getArticles } from '../src/apis/article';
import Pagination from '../src/components/Pagination';
import { useState } from 'react';

const Home: NextPage = () => {
	const [currentPage, setCurrentPage] = useState(1);

	const { data } = useQuery(['articles', currentPage], () => getArticles({ page: currentPage }));
	const titleList = data?.content.map((article) => {
		return (
			<ListRow key={article.id} href={`/detail/${article.id}`}>
				{article?.title}
			</ListRow>
		);
	});

	const handlePrevButton = () => {
		setCurrentPage(currentPage - 1);
	};
	const handleNextButton = () => {
		setCurrentPage(currentPage + 1);
	};

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
			<div className="mb-auto flex w-full flex-col">{titleList}</div>
			<Pagination
				currentPage={currentPage}
				totalPages={data?.totalPages}
				last={data?.last}
				onClickPrevButton={handlePrevButton}
				onClickNextButton={handleNextButton}
			/>
		</>
	);
};

export default Home;
