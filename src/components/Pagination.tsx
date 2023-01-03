import React from 'react';

interface Prop {
	currentPage: number;
	totalPages?: number;
	last?: boolean;
	onClickPrevButton?: () => void;
	onClickNextButton?: () => void;
}

const Pagination = ({
	currentPage,
	totalPages = 0,
	last,
	onClickPrevButton,
	onClickNextButton,
}: Prop) => {
	return (
		<div className="btn-group">
			<button
				className={currentPage === 1 ? 'btn-disabled btn' : 'btn'}
				onClick={onClickPrevButton}
			>
				«
			</button>
			<button className="btn">
				Page {currentPage} / {totalPages === 0 ? 1 : totalPages}
			</button>
			<button
				className={last || totalPages === 0 ? 'btn-disabled btn' : 'btn'}
				onClick={onClickNextButton}
			>
				»
			</button>
		</div>
	);
};

export default Pagination;
