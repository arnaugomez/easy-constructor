export type ConstructorType<T> = {
	[K in keyof T as T[K] extends (...args: unknown[]) => unknown
		? never
		: K]: T[K];
};