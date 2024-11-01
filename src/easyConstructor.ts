import { ConstructorType } from "./types/ConstructorType.js";
import { Class, SetOptional } from "type-fest";
import { EasyConstructorOptions } from "./types/EasyConstructorOptions.js";

export function easyConstructor<
	T,
	Arguments extends unknown[],
	TExclude extends keyof ConstructorType<T> = never,
	TOptional extends keyof ConstructorType<T> = never,
>(
	classType: Class<T, Arguments>,
	options?: EasyConstructorOptions<TExclude, TOptional>,
) {
	return function (
		input: SetOptional<Omit<ConstructorType<T>, TExclude>, TOptional>,
		...constructorArguments: Arguments
	): T {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		const newInstance = new classType(...constructorArguments) as Record<
			string,
			unknown
		>;
		for (const key in input) {
			if (!options?.exclude?.includes(key as TExclude)) {
				// @ts-expect-error foo
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				newInstance[key] = input[key];
			}
		}
		return newInstance as T;
	};
}
