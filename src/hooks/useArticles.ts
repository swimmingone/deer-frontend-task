import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ArticleRepositoryImpl } from '../infrastructure/ArticleRepositoryImpl';
import { ArticleRepository } from '../model/ArticleRepository';
import { Article } from '../model/Article';

const repository: ArticleRepository = new ArticleRepositoryImpl();

export const useArticles = () => {
	const queryClient = useQueryClient();

	const { data: getArticles, isSuccess: getArticlesIsSuccess } = useQuery(['articles'], () =>
		repository.findAll(0, 3, 'asc'),
	);

	const createArticle = (article: Article) => repository.save(article);
	const { mutate: onCreate } = useMutation(createArticle, {
		onSuccess: (data) => {
			queryClient.invalidateQueries('articles');
		},
	});

	return { onCreate, getArticles, getArticlesIsSuccess };
};
