import type { NextPage } from 'next';
import ArticleForm from '../../../src/components/ArticleForm';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Article } from '../../../src/types/Article';
import { ArticleContext } from '../../../src/provider/ArticleProvider';
import FormItem from '../../../src/components/FormItem';

const Detail: NextPage = () => {
	const router = useRouter();
	const { getArticleById } = useContext(ArticleContext);
	const id = router.query.id;
	const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
	const [article, setArticle] = useState<Article | null>(null);

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
			<FormItem label={'제목'}>{article.title}</FormItem>
			<FormItem label={'내용'}>{article.content}</FormItem>
			<div className="box-border flex h-8 w-1/2 justify-between gap-4">
				<button
					className="btn-secondary btn-sm btn flex-grow"
					onClick={() => router.push(`/detail/${article.id}/edit`)}
				>
					수정하기
				</button>
				<button className="btn-secondary btn-sm btn flex-grow">삭제하기</button>
			</div>
		</div>
	);
};

export default Detail;
