import { describe, expect, it } from "vitest";
import { easyConstructor } from "./easyConstructor.js";

describe("easyConstructor", () => {
	it("Creates an instance of the class", () => {
		class ExampleClass {
			public property1!: string;
			public property2!: string;
			public property3!: undefined;

			myMethod() {
				console.log("myMethod");
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
		expect(exampleClassInstance.myMethod).toBeInstanceOf(Function);
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
		expect(exampleClassInstance.myMethod).toBeInstanceOf(Function);
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
				exclude: ["property5"],
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
		expect(exampleClassInstance.myMethod).toBeInstanceOf(Function);
	});
});
