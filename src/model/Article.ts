export class Article {
	private _id: number;
	constructor(private _title: string, private _content: string) {
		this._id = 0; // default value should be falsy
	}

	public get id(): number {
		return this._id;
	}

	public get title(): string {
		return this._title;
	}

	public get content(): string {
		return this._content;
	}

	public update(title: string, content: string) {
		this._title = title;
		this._content = content;
	}
}
