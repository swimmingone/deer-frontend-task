import React, { ReactNode } from 'react';

interface Prop {
	children: ReactNode;
	onClick?: () => void;
	disabled?: boolean;
}

const SubmitButton = ({ onClick, disabled, children }: Prop) => {
	return (
		<button type="submit" className={'btn-secondary btn'} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
};

export default SubmitButton;
