import { Article } from './Article';
import { Page } from './Page';

export interface ArticleRepository {
	findById(id: number): Promise<Article | null>;
	findAll(page: number, size: number, sort: 'asc' | 'desc'): Promise<Page<Article>>;
	save(board: Article): Promise<Article>;
	deleteById(id: number): Promise<boolean>;
}
