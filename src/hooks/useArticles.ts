import { useMutation, useQueryClient } from 'react-query';
import { createArticle, deleteArticleById, editArticleById } from '../apis/article';

export const useArticles = () => {
	const queryClient = useQueryClient();

	const { mutateAsync: onCreate } = useMutation(createArticle, {
		onSuccess: () => {
			queryClient.invalidateQueries('articles');
		},
	});

	const { mutateAsync: onEdit } = useMutation(editArticleById, {
		onSuccess: () => {
			queryClient.invalidateQueries('articles');
		},
	});

	const { mutateAsync: onDelete } = useMutation(deleteArticleById, {
		onSuccess: () => {
			queryClient.invalidateQueries('articles');
		},
	});

	return { onCreate, onEdit, onDelete };
};
