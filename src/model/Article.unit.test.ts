import { Article } from './Article';

(function create() {
	const title = 'title';
	const content = 'content';
	const board = new Article(title, content);

	console.assert(board.title === title);
	console.assert(board.content === content);
	console.assert(!board.id);
})();

(function update() {
	const board = new Article('title', 'content');
	const title = 'newTitle';
	const content = 'newContent';

	console.assert(board.title !== title);
	console.assert(board.title !== content);

	board.update(title, content);

	console.assert(board.title === title);
	console.assert(board.content === content);
})();
