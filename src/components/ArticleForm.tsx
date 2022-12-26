import React, { Dispatch, SetStateAction } from 'react';
import FormItem from './FormItem';
import SubmitButton from './SubmitButton';

interface Prop {
	data: {
		title: string;
		content?: string | undefined;
	};
	setData: Dispatch<
		SetStateAction<{
			title: string;
			content?: string | undefined;
		}>
	>;
	onSubmit?: () => void;
}

const ArticleForm = ({ data, setData, onSubmit }: Prop) => {
	return (
		<div className={'box-border flex w-full flex-col items-center justify-between gap-4 p-4'}>
			<FormItem label={'제목'}>
				<>
					<input
						name={'title'}
						type={'text'}
						className="input-bordered input input-sm"
						value={data.title}
						onChange={(e) => setData({ title: e.target.value, content: data.content })}
						maxLength={20}
					/>
					{!data.title && (
						<p className={'text-sm text-red-600'}>*필수 입력 항목입니다.</p>
					)}
					<p className={'text-sm text-gray-300'}>{data.title.length} / 20</p>
				</>
			</FormItem>
			<FormItem label={'내용'}>
				<>
					<textarea
						name={'content'}
						rows={10}
						className="textarea-bordered textarea w-full"
						value={data.content}
						onChange={(e) => setData({ title: data.title, content: e.target.value })}
						maxLength={500}
					/>
					<p className={'text-sm text-gray-300'}>{data.content?.length} / 500</p>
				</>
			</FormItem>
			<SubmitButton onClick={onSubmit} disabled={data.title === ''}>
				작성 완료
			</SubmitButton>
		</div>
	);
};

export default ArticleForm;
