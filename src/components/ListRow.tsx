import Link from 'next/link';
import React, { ReactNode } from 'react';

interface Prop {
	children: ReactNode;
	href: string;
}

const ListRow = ({ children, href }: Prop) => {
	return (
		<Link
			href={href}
			className={
				'w-full cursor-pointer border-t bg-white p-4 text-xl text-primary-content hover:text-primary-focus'
			}
		>
			{children}
		</Link>
	);
};

export default ListRow;
