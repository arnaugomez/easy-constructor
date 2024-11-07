/**
 * Configuration of the `easyConstructor` function.
 */
export interface EasyConstructorOptions<TOmit, TOptional> {
  /**
   * Exclude these fields from the easy constructor.
   *
   * Use it to remove getters and setters from the Easy Constructor.
   * @example
   * ```ts
   * class ExampleClass {
   *   property1: string;
   *
   *   get property2(): number {
   *    return 42
   *   }
   *
   *   static create = easyConstructor(ExampleClass, {
   *    optional: ['property2']
   *   });
   * }
   *
   * // The `property2` getter is removed from the easy constructor
   * const instance = ExampleClass.create({ property1: 'value' });
   * ```
   */
  omit?: TOmit[];
  /**
   * Make these fields optional in the easy constructor.
   *
   * The class constructor treats all fields as required by default. If you
   * have an optional field or a field with a default value, do mark it as
   * optional here.
   * @example
   * ```ts
   * class ExampleClass {
   *   property1: string;
   *   property2?: number;
   *   property3: boolean = true;
   *
   *   static create = easyConstructor(ExampleClass, {
   *    optional: ['property2', 'property3']
   *   });
   * }
   * const instance = ExampleClass.create({ property1: 'value' });
   * ```
   */
  optional?: TOptional[];
}
