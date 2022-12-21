import React, { ReactNode } from 'react';

interface Prop {
	label: string;
	children: ReactNode;
}

const FormItem = ({ label, children }: Prop) => {
	return (
		<div className={'form-control w-full'}>
			<label className={'label'}>
				<span className={'label-text'}>{label}</span>
			</label>
			{children}
		</div>
	);
};

export default FormItem;
