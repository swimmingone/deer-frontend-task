import { Article } from '../model/Article';
import { ArticleRepository } from '../model/ArticleRepository';
import { ArticleRepositoryImpl } from './../infrastructure/ArticleRepositoryImpl';

export const repository: ArticleRepository = new ArticleRepositoryImpl();

interface ArticlesProps {
	page?: number;
	pageSize?: number;
	sort?: 'asc' | 'desc';
}

export async function getArticles({ page = 0, pageSize = 10, sort = 'asc' }: ArticlesProps) {
	return repository.findAll(page, pageSize, sort);
}

interface ArticleProps {
	articleId?: number;
}

export async function getArticleById({ articleId = 0 }: ArticleProps) {
	return repository.findById(articleId);
}

export const createArticle = (article: Article) => repository.save(article);
