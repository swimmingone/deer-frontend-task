import React, {
	ReactNode,
	createContext,
	useCallback,
	useEffect,
	useReducer,
	useState,
} from 'react';
import ArticleReducer from './ArticleReducer';
import { Article } from '../types/Article';

const initialState: Article[] = [];

interface ArticleContextType {
	articles: Article[];
	nextId: number;
	getArticleById: (id: number) => Article | null;
	onCreate: (data: Article) => void;
	onEdit: (data: Article) => void;
	onDelete: (id: number) => void;
}

export const ArticleContext = createContext<ArticleContextType>({
	articles: [],
	nextId: 0,
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
	const [id, setId] = useState(0);

	const getArticleById = useCallback(
		(id: number) => {
			return state.find((article) => article.id === id) ?? null;
		},
		[state],
	);

	const onCreate = (data: Article) => {
		setId((id) => id + 1);
		dispatch({
			type: 'CREATE_ARTICLE',
			payload: { ...data, id: id },
		});
	};

	const onEdit = useCallback((data: Article) => {
		dispatch({
			type: 'EDIT_ARTICLE',
			payload: data,
			id: data.id,
		});
	}, []);

	const onDelete = useCallback((id: number) => {
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
				nextId: id,
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
