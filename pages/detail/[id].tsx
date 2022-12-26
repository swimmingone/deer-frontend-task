import type { NextPage } from 'next';
import ArticleForm from '../../src/components/ArticleForm';
import { Article } from '../../src/model/Article';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Detail: NextPage = () => {
	const router = useRouter();
	const [article, setArticle] = useState<{ title: string; content?: string }>({
		title: `${router.query.id}`,
		content: '',
	});

	const onSubmit = () => {
		const editedArticle = new Article(article.title, article.content ?? '');
		// onEdit(editedArticle)
		router.push('/');
	};

	return (
		<div className={'box-border flex w-full flex-col items-center justify-between gap-4 p-4'}>
			<ArticleForm data={article} setData={setArticle} onSubmit={onSubmit} />
		</div>
	);
};

export default Detail;
