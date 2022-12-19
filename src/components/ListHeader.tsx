import React, { ReactNode } from 'react';

interface Prop {
	children: ReactNode;
	right?: ReactNode;
}

const ListHeader = ({ children, right }: Prop) => {
	return (
		<div className={'sticky top-0 flex w-full bg-primary p-4 '}>
			<div
				className={
					'flex items-center text-center text-3xl font-semibold text-primary-content'
				}
			>
				{children}
			</div>
			{right !== undefined ? (
				<div className={'mr-2 ml-auto flex items-center justify-end'}>{right}</div>
			) : null}
		</div>
	);
};

export default ListHeader;
