import type { NextPage } from 'next';
import ArticleForm from '../../src/components/ArticleForm';
import { Article } from '../../src/model/Article';
import { useRouter } from 'next/router';

const Detail: NextPage = () => {
	const router = useRouter();
	const article = new Article(`${router.query.id}`, '');

	const onSubmit = () => {
		router.push('/');
	};

	return (
		<div className={'box-border flex w-full flex-col items-center justify-between gap-4 p-4'}>
			<ArticleForm data={article} onSubmit={onSubmit} />
		</div>
	);
};

export default Detail;
