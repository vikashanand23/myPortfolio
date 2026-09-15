import { describe, expect, it } from "vitest";
import { groupResults, searchPortfolio } from "./portfolioSearch";

describe("searchPortfolio", () => {
  it("returns no results for an empty query", () => {
    expect(searchPortfolio("")).toEqual([]);
    expect(searchPortfolio("   ")).toEqual([]);
  });

  it("finds projects for a project-related query", () => {
    const results = searchPortfolio("projects");

    expect(results.length).toBeGreaterThan(0);
    expect(results.some((result) => result.category === "Project")).toBe(true);
  });

  it("finds AWS-related portfolio content", () => {
    const results = searchPortfolio("AWS");

    expect(results.length).toBeGreaterThan(0);
    expect(
      results.some(
        (result) =>
          result.title.toLowerCase().includes("aws") ||
          result.snippet.toLowerCase().includes("aws"),
      ),
    ).toBe(true);
  });

  it("applies the requested result limit", () => {
    const results = searchPortfolio("technology", 3);

    expect(results.length).toBeLessThanOrEqual(3);
  });

  it("returns results with relevance scores", () => {
    const results = searchPortfolio("kubernetes");

    expect(results.length).toBeGreaterThan(0);

    for (const result of results) {
      expect(result.relevance).toBeGreaterThan(0);
      expect(result.route).toBeTruthy();
      expect(result.category).toBeTruthy();
    }
  });
});

describe("groupResults", () => {
  it("groups results by category while preserving result order", () => {
    const results = searchPortfolio("AWS");
    const groups = groupResults(results);

    expect(groups.length).toBeGreaterThan(0);

    for (const [category, categoryResults] of groups) {
      expect(category).toBeTruthy();
      expect(categoryResults.length).toBeGreaterThan(0);

      for (const result of categoryResults) {
        expect(result.category).toBe(category);
      }
    }
  });
});
