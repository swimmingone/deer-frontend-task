import React, { useState } from 'react';
import FormItem from './FormItem';
import SubmitButton from './SubmitButton';
import { Article } from '../model/Article';

interface Prop {
	data?: Article;
	onSubmit?: () => void;
}

const ArticleForm = ({ data, onSubmit }: Prop) => {
	const [article, setArticle] = useState<{ title: string; content?: string }>({
		title: data?.title ?? '',
		content: data?.content ?? '',
	});
	return (
		<div className={'box-border flex w-full flex-col items-center justify-between gap-4 p-4'}>
			<FormItem label={'제목'}>
				<>
					<input
						name={'title'}
						type={'text'}
						className="input-bordered input input-sm"
						value={article.title}
						onChange={(e) => setArticle({ ...article, title: e.target.value })}
						maxLength={20}
					/>
					{!article.title && (
						<p className={'text-sm text-red-600'}>*필수 입력 항목입니다.</p>
					)}
					<p className={'text-sm text-gray-300'}>{article.title.length} / 20</p>
				</>
			</FormItem>
			<FormItem label={'내용'}>
				<>
					<textarea
						name={'content'}
						rows={10}
						className="textarea-bordered textarea w-full"
						value={article.content}
						onChange={(e) => setArticle({ ...article, content: e.target.value })}
						maxLength={500}
					/>
					<p className={'text-sm text-gray-300'}>{article.content?.length} / 500</p>
				</>
			</FormItem>
			<SubmitButton onClick={onSubmit} disabled={article.title === ''}>
				작성 완료
			</SubmitButton>
		</div>
	);
};

export default ArticleForm;
