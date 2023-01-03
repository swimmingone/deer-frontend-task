import type { NextPage } from 'next';
import ArticleForm from '../../../src/components/ArticleForm';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Article as TArticle } from '../../../src/types/Article';
import { useQuery } from 'react-query';
import { getArticleById } from '../../../src/apis/article';
import { useArticlesMutation } from '../../../src/hooks/useArticlesMutation';
import { Article } from '../../../src/model/Article';

const Edit: NextPage = () => {
	const router = useRouter();
	const { onEdit } = useArticlesMutation();
	const id = router.query.id;
	const [article, setArticle] = useState<TArticle | null>(null);

	const { data: selectedArticle } = useQuery(['articles', id], () =>
		getArticleById({ articleId: typeof id === 'string' ? parseInt(id) : 0 }),
	);
	const onSubmit = () => {
		if (article) {
			const newArticle = new Article(article.title, article.content ?? '');
			onEdit({ articleId: article.id, newArticle }).then(() => router.push('/'));
		} else {
			alert('게시글이 수정되지 않았습니다.');
		}
	};

	useEffect(() => {
		if (selectedArticle) {
			setArticle({
				id: selectedArticle.id,
				title: selectedArticle.title,
				content: selectedArticle.content,
			});
		}
	}, [selectedArticle]);

	if (!article) return null;
	return <ArticleForm data={article} setData={setArticle} onSubmit={onSubmit} />;
};

export default Edit;
