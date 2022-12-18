import React, { ReactNode } from 'react';

import Head from 'next/head';

interface Props {
	children: ReactNode;
}
const Layout = ({ children }: Props) => {
	return (
		<>
			<Head>
				<title>Deer Board</title>
			</Head>
			<div
				className={
					'box-border flex w-screen flex-col items-center justify-between bg-white p-2 md:p-8 lg:p-16 xl:p-16 2xl:px-32'
				}
			>
				{children}
			</div>
		</>
	);
};

export default Layout;
