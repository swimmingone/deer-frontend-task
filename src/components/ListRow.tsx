import React, { ReactNode } from 'react';

interface Prop {
	children: ReactNode;
}

const ListRow = ({ children }: Prop) => {
	return (
		<div
			className={
				'w-full cursor-pointer border-t bg-white p-4 text-xl text-primary-content hover:text-primary-focus'
			}
		>
			{children}
		</div>
	);
};

export default ListRow;
