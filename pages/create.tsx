import type { NextPage } from 'next';
import ListHeader from '../src/components/ListHeader';
import ArticleForm from '../src/components/ArticleForm';
import { Article } from '../src/model/Article';
import { useRouter } from 'next/router';

const Create: NextPage = () => {
	const router = useRouter();
	const newArticle = new Article('', '');

	const onSubmit = () => {
		router.push('/');
	};

	return (
		<>
			<ListHeader>글쓰기</ListHeader>
			<div
				className={
					'box-border flex w-full flex-col items-center justify-between gap-4 border-black p-4'
				}
			>
				<ArticleForm data={newArticle} onSubmit={onSubmit} />
			</div>
		</>
	);
};

export default Create;
