import React, { ReactNode } from 'react';

interface Prop {
	children: ReactNode;
	onClick?: () => void;
}

const ListRow = ({ children, onClick }: Prop) => {
	return (
		<div
			className={
				'w-full cursor-pointer border-t bg-white p-4 text-xl text-primary-content hover:text-primary-focus'
			}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default ListRow;
