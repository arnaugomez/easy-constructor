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
});
