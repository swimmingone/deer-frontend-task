import type { NextPage } from 'next';
import ListHeader from '../src/components/ListHeader';
import ArticleForm from '../src/components/ArticleForm';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { ArticleContext } from '../src/provider/ArticleProvider';
import { Article as TArticle } from '../src/types/Article';
import { useArticles } from '../src/hooks/useArticles';
import { Article } from '../src/model/Article';

const Create: NextPage = () => {
	const router = useRouter();
	// const { onCreate } = useContext(ArticleContext);
	const { onCreate } = useArticles();

	const initialArticle = {
		id: '',
		title: '',
		content: '',
	};

	const [article, setArticle] = useState<TArticle | null>(initialArticle);

	const onSubmit = () => {
		if (article) {
			const newArticle = new Article(article.title, article.content ?? '');
			onCreate(newArticle);
		} else {
			alert('게시글이 생성되지 않았습니다.');
		}
		router.push('/');
	};

	if (!article) return null;
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
