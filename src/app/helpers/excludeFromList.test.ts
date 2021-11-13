import { excludeFromList } from "./excludeFromList";

it("excludes compare array objects from original array", () => {
  const org = [
    { request: { query: "A" } },
    { request: { query: "B" } },
    { request: { query: "C" } },
    { request: { query: "E" } },
  ];
  const comp = [{ request: { query: "B" } }, { request: { query: "E" } }];
  const solution = [{ request: { query: "A" } }, { request: { query: "C" } }];
  expect(excludeFromList(org as any, comp as any)).toEqual(solution);
});
