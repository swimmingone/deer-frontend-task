import type { NextPage } from 'next';
import ArticleForm from '../../src/components/ArticleForm';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Article } from '../../src/types/Article';
import { ArticleContext } from '../../src/provider/ArticleProvider';

const Detail: NextPage = () => {
	const router = useRouter();
	const { onEdit, getArticleById } = useContext(ArticleContext);
	const id = router.query.id;
	const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
	const [article, setArticle] = useState<Article | null>(null);

	const onSubmit = () => {
		if (article) {
			onEdit(article);
		} else {
			alert('게시글이 수정되지 않았습니다.');
		}
		router.push('/');
	};

	useEffect(() => {
		if (typeof id === 'string') {
			console.log('test');
			setSelectedArticle(getArticleById(id));
		}
	}, [getArticleById, id]);

	useEffect(() => {
		if (selectedArticle) {
			setArticle(selectedArticle);
		}
	}, [selectedArticle]);

	if (!article) return null;
	return (
		<div className={'box-border flex w-full flex-col items-center justify-between gap-4 p-4'}>
			<ArticleForm data={article} setData={setArticle} onSubmit={onSubmit} />
		</div>
	);
};

export default Detail;
