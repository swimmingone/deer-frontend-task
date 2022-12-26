export default function removeItemAtIndex<T>(arr: T[], index: number) {
	return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
