import { describe, expect, it } from "vitest";
import { CATEGORIES, PRODUCTS, categoryClass } from "@/lib/shop-data";

describe("product type colours", () => {
  it("gives organic produce and medicine different card colour themes", () => {
    expect(categoryClass("fruit")).not.toBe(categoryClass("medicine"));
    expect(categoryClass("vegetable")).not.toBe(categoryClass("medicine"));
  });

  it("gives every product type its own colour theme", () => {
    const classes = CATEGORIES.map((c) => categoryClass(c.id));
    expect(new Set(classes).size).toBe(CATEGORIES.length);
  });

  it("covers fruits, vegetables, biscuits, medicine and others", () => {
    const used = new Set(PRODUCTS.map((p) => p.category));
    expect([...used].sort()).toEqual(["biscuit", "fruit", "medicine", "other", "vegetable"]);
  });
});
