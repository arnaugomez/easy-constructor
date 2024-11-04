import { ConstructorType } from "./types/ConstructorType.js";
import type { Class, SetOptional } from "type-fest";
import { EasyConstructorOptions } from "./types/EasyConstructorOptions.js";

export function easyConstructor<
	T,
	Arguments extends unknown[],
	TOmit extends keyof ConstructorType<T> = never,
	TOptional extends keyof ConstructorType<T> = never,
>(
	classType: Class<T, Arguments>,
	options?: EasyConstructorOptions<TOmit, TOptional>,
) {
	return function (
		input: SetOptional<Omit<ConstructorType<T>, TOmit>, TOptional>,
		...constructorArguments: Arguments
	): T {
		const newInstance = new classType(...constructorArguments) as Record<
			string,
			unknown
		>;
		for (const [key, value] of Object.entries(input)) {
			if (options?.omit?.includes(key as TOmit)) {
				continue;
			}
			if (
				value === undefined &&
				options?.optional?.includes(key as TOptional)
			) {
				continue;
			}
			newInstance[key] = value;
		}
		return newInstance as T;
	};
}
