import { ConstructorType } from "./types/ConstructorType.js";
import type { Class, SetOptional } from "type-fest";
import { EasyConstructorOptions } from "./types/EasyConstructorOptions.js";

/**
 * Creates a factory function that initializes a class with its properties.
 *
 * @example
 * ```ts
 * class ExampleClass {
 *   property1: string;
 *   property2: number;
 *
 *   static create = easyConstructor(ExampleClass);
 * }
 * // Creates an instance of ExampleClass
 * static exampleInstance = ExampleClass.create({ property1: 'value', property2: 42 });
 * ```
 *
 * @param classType The class to instantiate and initialize.
 * @param options The configuration of the class, including which fields to omit
 * and which fields to make optional.
 * @returns A factory function that creates an instance of the class.
 */
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
