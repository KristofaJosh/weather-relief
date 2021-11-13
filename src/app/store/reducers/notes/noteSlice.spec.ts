import noteReducer, {
  addNote,
  clearNotes,
  removeNote,
  updateNote,
} from "./notesSlice";

describe("favourite reducer", () => {
  const initialState = {
    notes: {},
  };

  it("should handle initial state", () => {
    expect(noteReducer(undefined, { type: "unknown" })).toEqual({
      notes: {},
    });
  });

  it("should create note", () => {
    const actual = noteReducer(
      initialState,
      addNote({
        key: "some:new:key",
        body: { title: "the-title", description: "the-description" },
      })
    );

    expect(actual.notes["some:new:key"]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          body: { title: "the-title", description: "the-description" },
        }),
      ])
    );
  });

  it("should create new note with a different key", () => {
    const initialState = {
      notes: {
        "some:new:key": [
          {
            idx: "1",
            body: { title: "the-title", description: "the-description" },
          },
        ],
      },
    };
    const actual = noteReducer(
      initialState,
      addNote({
        key: "some:different:key",
        body: { title: "the-diff-title", description: "the-diff-description" },
      })
    );

    expect(actual.notes).toEqual({
      "some:new:key": [
        expect.objectContaining({
          body: {
            title: "the-title",
            description: "the-description",
          },
        }),
      ],
      "some:different:key": [
        expect.objectContaining({
          body: {
            title: "the-diff-title",
            description: "the-diff-description",
          },
        }),
      ],
    });
  });

  it("should append to existing note", () => {
    const initialState = {
      notes: {
        "some:new:key": [
          {
            idx: "random-key",
            body: { title: "the-title", description: "the-description" },
          },
        ],
      },
    };
    const actual = noteReducer(
      initialState,
      addNote({
        key: "some:new:key",
        body: { title: "the-title-1", description: "the-description-1" },
      })
    );

    expect(actual.notes["some:new:key"]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          body: { title: "the-title", description: "the-description" },
        }),
        expect.objectContaining({
          body: { title: "the-title-1", description: "the-description-1" },
        }),
      ])
    );
  });

  it("should update note using generated key", () => {
    const initialState = {
      notes: {
        "some:new:key": [
          {
            idx: "random-key",
            body: { title: "the-title", description: "the-description" },
          },
          {
            idx: "random-key-2",
            body: { title: "the-title-1", description: "the-description-1" },
          },
        ],
      },
    };

    const actual = noteReducer(
      initialState,
      updateNote({
        key: "some:new:key",
        idx: "random-key",
        body: { title: "the-title", description: "the-description-edited" },
      })
    );
    expect(actual.notes["some:new:key"]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          body: { title: "the-title", description: "the-description-edited" },
        }),
        expect.objectContaining({
          body: { title: "the-title-1", description: "the-description-1" },
        }),
      ])
    );
  });

  it("should remove note", () => {
    const initialState = {
      notes: {
        "some:new:key": [
          {
            idx: "1",
            body: { title: "the-title", description: "the-description" },
          },
          {
            idx: "2",
            body: { title: "the-title", description: "the-description-edited" },
          },
        ],
      },
    };

    const actual = noteReducer(
      initialState,
      removeNote({ idx: "1", key: "some:new:key" })
    );
    expect(actual.notes["some:new:key"]).toEqual(
      expect.arrayContaining([
        {
          idx: "2",
          body: { title: "the-title", description: "the-description-edited" },
        },
      ])
    );
  });

  it("should clear note", () => {
    const initialState = {
      notes: {
        "some:new:key": [
          {
            idx: "1",
            body: { title: "the-title", description: "the-description" },
          },
        ],
      },
    };

    const actual = noteReducer(initialState, clearNotes("some:new:key"));
    expect(actual.notes["some:new:key"]).toMatchObject({});
  });
});
