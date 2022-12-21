export interface Page<T> {
	content: T[];
	totalPages: number;
	last: boolean;
}
