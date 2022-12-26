import type { NextPage } from 'next';
import ArticleForm from '../../src/components/ArticleForm';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Article } from '../../src/types/Article';

const Detail: NextPage = () => {
	const router = useRouter();
	const [article, setArticle] = useState<Article>({
		id: 0,
		title: `${router.query.id}`,
		content: '',
	});

	const onSubmit = () => {
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
