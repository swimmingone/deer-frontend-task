import { ArticleRepositoryImpl } from './ArticleRepositoryImpl';
import { ArticleRepository } from '../model/ArticleRepository';
import { Article } from '../model/Article';

(async function findByIdAndSave() {
	const repository: ArticleRepository = new ArticleRepositoryImpl();
	console.assert((await repository.findById(1)) === null);

	await repository.save(createArticleFixture());

	const article = await repository.findById(1);
	if (!article) {
		throw new Error();
	}

	console.assert(article.id === 1);
})();

(async function save_initialDataExist_validId() {
	const repository: ArticleRepository = new ArticleRepositoryImpl({ 10: createArticleFixture() });
	console.assert((await repository.findById(10)) !== null);
	console.assert((await repository.findById(11)) === null);

	await repository.save(createArticleFixture());

	const article = await repository.findById(11);
	if (!article) {
		throw new Error();
	}

	console.assert(article.id === 11);
})();

(async function findByIdAndUpdate() {
	const id = 1;
	const repository: ArticleRepository = new ArticleRepositoryImpl({
		[id]: createArticleFixture(id),
	});
	const newTitle = 'newTitle';
	const newContent = 'newContent';

	const article = await repository.findById(id);
	if (!article) {
		throw new Error();
	}

	console.assert(article.id === id);
	console.assert(article.title !== newTitle);
	console.assert(article.content !== newContent);

	article.update(newTitle, newContent);
	console.assert(article.id === id);
	console.assert(article.title === newTitle);
	console.assert(article.content === newContent);

	await repository.save(article);
})();

(async function findPageAndSave() {
	const repository: ArticleRepository = new ArticleRepositoryImpl();
	console.assert((await repository.findById(1)) === null);

	generateSequence(0, 3).forEach(() => {
		repository.save(createArticleFixture());
	});

	const pageAsc = await repository.findAll(0, 2, 'asc');
	console.assert(pageAsc.totalPages === 2);
	console.assert(pageAsc.last === false);
	console.assert(pageAsc.content[0].id === 1);
	console.assert(pageAsc.content[1].id === 2);

	const pageDesc = await repository.findAll(0, 2, 'desc');
	console.assert(pageDesc.totalPages === 2);
	console.assert(pageDesc.last === false);
	console.assert(pageDesc.content[0].id === 3);
	console.assert(pageDesc.content[1].id === 2);
})();

(async function findPage_asc() {
	const existentArticles = generateSequence(1, 32)
		.map((id) => createArticleFixture(id, 'title' + id, 'content' + id))
		.reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {} as { [x: number]: Article });

	const repository: ArticleRepository = new ArticleRepositoryImpl(existentArticles);

	const firstPage = await repository.findAll(0, 10, 'asc');
	console.assert(firstPage.totalPages === 4);
	console.assert(firstPage.last === false);
	generateSequence(0, 10).forEach((idx) => {
		console.assert(firstPage.content[idx].id === idx + 1);
	});

	const secondPage = await repository.findAll(1, 10, 'asc');
	console.assert(secondPage.totalPages === 4);
	console.assert(secondPage.last === false);
	generateSequence(0, 10).forEach((idx) => {
		console.assert(secondPage.content[idx].id === idx + 11);
	});

	const lastPage = await repository.findAll(3, 10, 'asc');
	console.assert(lastPage.totalPages === 4);
	console.assert(lastPage.last === true);
	console.assert(lastPage.content.length === 1);
	console.assert(lastPage.content[0].id === 31);
})();

(async function findPage_desc() {
	const existentArticles = generateSequence(1, 32)
		.map((id) => createArticleFixture(id, 'title' + id, 'content' + id))
		.reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {} as { [x: number]: Article });

	const repository: ArticleRepository = new ArticleRepositoryImpl(existentArticles);

	const firstPage = await repository.findAll(0, 10, 'desc');
	console.assert(firstPage.totalPages === 4);
	console.assert(firstPage.last === false);
	generateSequence(0, 10).forEach((idx) => {
		console.assert(firstPage.content[idx].id === 31 - idx);
	});

	const secondPage = await repository.findAll(1, 10, 'desc');
	console.assert(secondPage.totalPages === 4);
	console.assert(secondPage.last === false);
	generateSequence(0, 10).forEach((idx) => {
		console.assert(secondPage.content[idx].id === 21 - idx);
	});

	const lastPage = await repository.findAll(3, 10, 'desc');
	console.assert(lastPage.totalPages === 4);
	console.assert(lastPage.last === true);
	console.assert(lastPage.content.length === 1);
	console.assert(lastPage.content[0].id === 1);
})();

(async function delete_existentId() {
	const id = 10;
	const repository: ArticleRepository = new ArticleRepositoryImpl({
		[id]: createArticleFixture(),
	});

	console.assert(await repository.deleteById(id));
})();

(async function delete_nonExistentId() {
	const repository: ArticleRepository = new ArticleRepositoryImpl();

	console.assert(!(await repository.deleteById(1)));
})();

function createArticleFixture(
	id: number = 0,
	title: string = 'title',
	content: string = 'content',
): Article {
	const article = new Article(title, content);
	Reflect.set(article, '_id', id);
	return article;
}

function generateSequence(
	fromInclusive: number,
	toExclusive: number,
	acc: number[] = [],
): number[] {
	if (fromInclusive >= toExclusive) {
		return acc;
	}

	return generateSequence(fromInclusive + 1, toExclusive, [...acc, fromInclusive]);
}
