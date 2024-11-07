import { describe, expect, it } from "vitest";
import { easyConstructor } from "./index.js";

describe("index file", () => {
  it("exports easyConstructor function", () => {
    expect(easyConstructor).toBeDefined();
  });
});
