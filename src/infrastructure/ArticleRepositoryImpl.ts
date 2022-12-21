import { ArticleRepository } from '../model/ArticleRepository';
import { Article } from '../model/Article';
import { Page } from '../model/Page';

function pseudoLatency(): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, Math.random() * 1000 + 200);
	});
}

export class ArticleRepositoryImpl implements ArticleRepository {
	private nextId: number;

	constructor(private articles: { [id: number]: Article } = {}) {
		const maxId = Object.keys(articles).reduce((acc, curr) => Math.max(acc, Number(curr)), 0);
		this.nextId = maxId + 1;
	}

	findById(id: number): Promise<Article | null> {
		return pseudoLatency().then(() => (this.articles[id] ? this.articles[id] : null));
	}

	findAll(page: number, size: number, sort: 'asc' | 'desc'): Promise<Page<Article>> {
		const list = Object.values(this.articles);
		const content = (sort === 'desc' ? list.reverse() : list).slice(
			page * size,
			(page + 1) * size,
		);
		const totalPages = Math.ceil(list.length / size);
		const last = totalPages === page + 1;

		return pseudoLatency().then(() => ({
			content,
			totalPages,
			last,
		}));
	}

	save(article: Article): Promise<Article> {
		if (!article.id) {
			Reflect.set(article, '_id', this.nextId++);
		}
		this.articles[article.id] = article;

		return pseudoLatency().then(() => article);
	}

	deleteById(id: number): Promise<boolean> {
		return pseudoLatency().then(() => {
			if (!this.articles[id]) {
				return false;
			}
			delete this.articles[id];
			return true;
		});
	}
}
