import { backlogInit } from "./backlogInit";

describe("Backlog Init Command", () => {
  it("contains correct number of sub-commands", () => {
    expect(backlogInit.commands).toHaveLength(0);
  });
});