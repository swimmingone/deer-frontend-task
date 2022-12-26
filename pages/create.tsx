import type { NextPage } from 'next';
import ListHeader from '../src/components/ListHeader';
import ArticleForm from '../src/components/ArticleForm';
import { Article } from '../src/model/Article';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Create: NextPage = () => {
	const router = useRouter();

	const [article, setArticle] = useState<{ title: string; content?: string }>({
		title: '',
		content: '',
	});

	const onSubmit = () => {
		if (article) {
			const newArticle = new Article(article.title, article.content ?? '');
			// onCreate(newArticle);
		} else {
			alert('게시글이 생성되지 않았습니다.');
		}
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
				<ArticleForm data={article} setData={setArticle} onSubmit={onSubmit} />
			</div>
		</>
	);
};

export default Create;
