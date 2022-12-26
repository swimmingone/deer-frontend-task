import React, { ReactNode, createContext, useCallback, useEffect, useReducer } from 'react';
import ArticleReducer from './ArticleReducer';
import { Article } from '../types/Article';

const initialState: Article[] = [];

interface ArticleContextType {
	articles: Article[];
	getArticleById: (id: string) => Article | null;
	onCreate: (data: Article) => void;
	onEdit: (data: Article) => void;
	onDelete: (id: string) => void;
}

export const ArticleContext = createContext<ArticleContextType>({
	articles: [],
	getArticleById: () => null,
	onCreate: () => {},
	onEdit: () => {},
	onDelete: () => {},
});

interface Prop {
	children: ReactNode;
}

const ArticleProvider = ({ children }: Prop) => {
	const [state, dispatch] = useReducer(ArticleReducer, initialState);

	const getArticleById = useCallback(
		(id: string) => {
			return state.find((article) => article.id === id) ?? null;
		},
		[state],
	);

	const onCreate = useCallback((data: Article) => {
		dispatch({
			type: 'CREATE_ARTICLE',
			payload: data,
		});
	}, []);

	const onEdit = useCallback((data: Article) => {
		dispatch({
			type: 'EDIT_ARTICLE',
			payload: data,
			id: data.id,
		});
	}, []);

	const onDelete = useCallback((id: string) => {
		dispatch({
			type: 'DELETE_ARTICLE',
			id,
		});
	}, []);

	useEffect(() => {
		const loadedArticles = localStorage.getItem('state');
		if (loadedArticles !== null) {
			dispatch({
				type: 'INIT_STORED',
				value: JSON.parse(loadedArticles),
			});
		}
	}, []);
	useEffect(() => {
		if (state !== initialState) {
			localStorage.setItem('state', JSON.stringify(state));
		}
	}, [state]);

	return (
		<ArticleContext.Provider
			value={{
				articles: state,
				getArticleById,
				onCreate,
				onEdit,
				onDelete,
			}}
		>
			{children}
		</ArticleContext.Provider>
	);
};

export default ArticleProvider;
