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
	newArticle?: Article;
}

export async function getArticleById({ articleId = 0 }: ArticleProps) {
	return repository.findById(articleId);
}

export async function createArticle({ newArticle }: ArticleProps) {
	if (!newArticle) {
		throw new Error();
	}
	return repository.save(newArticle);
}

export async function editArticleById({ articleId = 0, newArticle }: ArticleProps) {
	const article = await repository.findById(articleId);
	if (!article || !newArticle) {
		throw new Error();
	}
	article.update(newArticle.title, newArticle.content);
	return repository.save(article);
}

export async function deleteArticleById({ articleId = 0 }: ArticleProps) {
	return repository.deleteById(articleId);
}
