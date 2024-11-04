import { describe, expect, it } from "vitest";
import { easyConstructor } from "./easyConstructor.js";

describe("easyConstructor", () => {
	it("Creates an instance of the class", () => {
		class ExampleClass {
			public property1!: string;
			public property2!: string;
			public property3!: undefined;

			myMethod() {
				return 3;
			}

			public static create = easyConstructor(ExampleClass);
		}

		const exampleClassInstance = ExampleClass.create({
			property1: "value1",
			property2: "value2",
			property3: undefined,
		});

		expect(exampleClassInstance).toBeInstanceOf(ExampleClass);
		expect(exampleClassInstance.property1).toBe("value1");
		expect(exampleClassInstance.property2).toBe("value2");
		expect(exampleClassInstance.property3).toBe(undefined);
		expect(exampleClassInstance.myMethod()).toBe(3);
	});

	it("Creates an instance of the class with optional properties", () => {
		class ExampleClass {
			public property1!: string;
			public property2?: string;
			public property3!: undefined;
			public property4: string = "default";

			myMethod() {
				console.log("myMethod");
			}

			public static create = easyConstructor(ExampleClass, {
				optional: ["property2", "property4"],
			});
		}

		const exampleClassInstance = ExampleClass.create({
			property1: "value1",
			property3: undefined,
			property4: undefined,
		});

		expect(exampleClassInstance).toBeInstanceOf(ExampleClass);
		expect(exampleClassInstance.property1).toBe("value1");
		expect(exampleClassInstance.property2).toBe(undefined);
		expect(exampleClassInstance.property3).toBe(undefined);
		expect(exampleClassInstance.property4).toBe("default");
		expect(exampleClassInstance.myMethod()).toBe(3);
	});

	it("Creates an instance of the class with optional properties and custom constructor", () => {
		class ExampleClass {
			public property1!: string;
			public property2?: string;
			public property3!: undefined;
			public property4: string = "default";
			public property5: number;

			myMethod() {
				console.log("myMethod");
			}

			public static create = easyConstructor(ExampleClass, {
				omit: ["property5"],
				optional: ["property2", "property4"],
			});

			constructor(property5: number) {
				this.property5 = property5 * 2;
			}
		}

		const exampleClassInstance = ExampleClass.create(
			{
				property1: "value1",
				property3: undefined,
				property4: undefined,
			},
			5,
		);

		expect(exampleClassInstance).toBeInstanceOf(ExampleClass);
		expect(exampleClassInstance.property1).toBe("value1");
		expect(exampleClassInstance.property2).toBe(undefined);
		expect(exampleClassInstance.property3).toBe(undefined);
		expect(exampleClassInstance.property4).toBe("default");
		expect(exampleClassInstance.property5).toBe(10);
		expect(exampleClassInstance.myMethod()).toBe(3);
	});

	it("Works with getters and setters", () => {
		class ExampleClass {
			public property1!: string;
			public property2!: string;

			get property3() {
				return "value3";
			}

			set property4(value: string) {
				this.property2 = value;
			}

			public static create = easyConstructor(ExampleClass, {
				omit: ["property3", "property4"],
			});
		}

		const exampleClassInstance = ExampleClass.create({
			property1: "value1",
			property2: "value2",
		});

		expect(exampleClassInstance).toBeInstanceOf(ExampleClass);
		expect(exampleClassInstance.property1).toBe("value1");
		expect(exampleClassInstance.property2).toBe("value2");
		exampleClassInstance.property4 = "value4";
		expect(exampleClassInstance.property2).toBe("value4");
	});
});
