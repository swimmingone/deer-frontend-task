import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import FormItem from '../../../src/components/FormItem';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { getArticleById } from '../../../src/apis/article';
import { useArticlesMutation } from '../../../src/hooks/useArticlesMutation';

const Detail: NextPage = () => {
	const router = useRouter();
	const { onDelete } = useArticlesMutation();
	const id = router.query.id;

	const { data: article } = useQuery(['articles', id], () =>
		getArticleById({ articleId: typeof id === 'string' ? parseInt(id) : 0 }),
	);

	const deleteArticle = () => {
		if (article) {
			onDelete({ articleId: article.id }).then(() => router.push('/'));
		} else {
			alert('게시글이 삭제되지 않았습니다.');
		}
	};

	if (!article) return null;
	return (
		<div className={'box-border flex w-full flex-col items-center justify-between gap-4 p-4'}>
			<FormItem label={'제목'}>{article.title}</FormItem>
			<FormItem label={'내용'}>{article.content}</FormItem>
			<div className="box-border flex h-8 w-1/2 justify-between gap-4">
				<Link
					className="btn-secondary btn-sm btn flex-grow"
					href={`/detail/${article.id}/edit`}
				>
					수정하기
				</Link>
				<button className="btn-secondary btn-sm btn flex-grow" onClick={deleteArticle}>
					삭제하기
				</button>
			</div>
		</div>
	);
};

export default Detail;
