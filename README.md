<h1 align="center">Easy Constructor</h1>

<p align="center">JavaScript class constructors without the boilerplate</p>

<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 2" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-2-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://github.com/arnaugomez/easy-constructor/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://codecov.io/gh/arnaugomez/easy-constructor" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/arnaugomez/easy-constructor?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/arnaugomez/easy-constructor/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
	<a href="http://npmjs.com/package/easy-constructor"><img alt="📦 npm version" src="https://img.shields.io/npm/v/easy-constructor?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

Write JavaScript class constructors in a single line of code.

- Fully type-safe: TypeScript inference that feels like magic :mage:
- Write classes in half the code == half the bugs :bug: == half the bundle size :package:
- No more positional arguments. Enjoy named arguments :love_letter:

Let me show you an example. :point_down:

```ts
// Before
class ExampleClass {
	property1: string;
	property2: number;
	property3: boolean;
	property4: string;

	// So much boilerplate!
	constructor(
		property1: string,
		property2: number,
		property3: boolean,
		property4: string,
	) {
		// Feels like I'm writing the same thing twice.
		this.property1 = property1;
		this.property2 = property2;
		this.property3 = property3;
		this.property4 = property4;
	}
}

// So many positional arguments. I can't remember what they are!
const exampleInstance = new ExampleClass("Hello", 42, true, "World");
```

```ts
import { easyConstructor } from "easy-constructor";
// After
class ExampleClass {
	property1!: string;
	property2!: number;
	property3!: boolean;
	property4!: string;

	// Just one line!
	static create = easyConstructor(ExampleClass);
}

// Named arguments! 🎉
const exampleInstance = ExampleClass.create({
	property1: "Hello",
	property2: 42,
	property3: true,
	property4: "World",
});
```

## Installation

```shell
npm i easy-constructor
```

## Advanced usage

### Optional fields and default values

The `easyConstructor` function treats all class fields as required by default. To make them optional, add them in the `optional` array.

```ts
import { easyConstructor } from "easy-constructor";

class ExampleClass {
	property1!: string;
	property2!: number;
	property3?: boolean;
	property4: string = "default";

	static create = easyConstructor(ExampleClass, {
		optional: ["property3", "property4"],
	});
}
const exampleInstance = ExampleClass.create({
	property1: "Hello",
	property2: 42,
});
```

TypeScript will infer the property names and provide auto-completion.

### Omit variables and custom constructor

You can combine `easyConstructor` with a custom constructor, if you need to initialize some variables with custom logic.

To exclude variables from the easy constructor, use the `omit` array.

```ts
class ExampleClass {
	property1!: string;
	property2!: number;
	property3!: boolean;
	property4: number;

	static create = easyConstructor(ExampleClass, {
		omit: ["property4"],
	});

	// Custom constructor
	constructor(property4: string) {
		this.property4 = property4 * 2;
	}
}

const exampleInstance = ExampleClass.create(
	// Easy constructor arguments
	{
		property1: "Hello",
		property2: 42,
		property3: true,
	},
	// Custom constructor arguments
	100,
);
```

### Getters and setters

Easy Constructor works with getters and setters too.

```ts
class ExampleClass {
	property1!: string;

	get property2() {
		return this.property1.length;
	}

	static create = easyConstructor(ExampleClass, {
		// Omit getter and setter properties
		// from the easy constructor
		omit: ["property2"],
	});
}

const exampleInstance = ExampleClass.create({
	property1: "Hello",
});
```

### Limitations

Does not support inheritance. Does not support private or protected fields.

The properties from the easy constructor are assigned after the custom constructor is called. This means that the custom constructor can't access the properties of the easy constructor.

### When should I use Easy Constructor?

Easy Constructor is simple, lightweight, and designed to do one thing very well: remove boilerplate from class constructors.

It is designed to replace 99% of the constructors in your app, where you are just assigning arguments to properties. However, if you have a very complex constructor, with hefty initialization logic, you should stick to the traditional constructor or use a factory function.

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/arnaugomez"><img src="https://avatars.githubusercontent.com/u/66358043?v=4?s=100" width="100px;" alt="Arnau Gómez Farell"/><br /><sub><b>Arnau Gómez Farell</b></sub></a><br /><a href="https://github.com/arnaugomez/easy-constructor/commits?author=arnaugomez" title="Code">💻</a> <a href="#content-arnaugomez" title="Content">🖋</a> <a href="https://github.com/arnaugomez/easy-constructor/commits?author=arnaugomez" title="Documentation">📖</a> <a href="#ideas-arnaugomez" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-arnaugomez" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-arnaugomez" title="Maintenance">🚧</a> <a href="#projectManagement-arnaugomez" title="Project Management">📆</a> <a href="#tool-arnaugomez" title="Tools">🔧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.joshuakgoldberg.com/"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg ✨"/><br /><sub><b>Josh Goldberg ✨</b></sub></a><br /><a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->

<!-- You can remove this notice if you don't want it 🙂 no worries! -->

> 💙 This package was templated with [`create-typescript-app`](https://github.com/JoshuaKGoldberg/create-typescript-app).
