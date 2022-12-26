import { Article } from '../types/Article';
import newID from '../utils/newId';
import removeItemAtIndex from '../utils/removeItemAtIndex';
import replaceItemAtIndex from '../utils/replaceItemAtIndex';

type ArticlesAction = {
	type: string;
	id?: string;
	payload?: Article;
	value?: Article[];
};

export default function reducer(state: Article[], action: ArticlesAction): Article[] {
	const targetIndex = state.findIndex((article) => article.id === action.id);
	const targetArticle = state.find((article) => article.id === action.id);

	switch (action.type) {
		case 'INIT_STORED':
			if (!action.value) return [];
			return action.value;
		case 'CREATE_ARTICLE':
			if (!action.payload) return state;
			return [
				...state,
				{
					id: newID(),
					title: action.payload.title,
					content: action.payload.content,
				},
			];
		case 'EDIT_ARTICLE':
			if (!targetArticle || !action.payload) return state;
			return replaceItemAtIndex<Article>(state, targetIndex, {
				...action.payload,
			});
		case 'DELETE_ARTICLE':
			return removeItemAtIndex<Article>(state, targetIndex);
		default:
			return state;
	}
}
