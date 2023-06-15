export const AddBookSchema = {
  body: {
    type: "object",
    required: ["author", "year", "title", "isbn"],
    properties: {
      author: { description: "Name of author", type: "string" },
      year: { description: "Year of publication", type: "number" },
      title: { description: "Title of book", type: "string" },
      isbn: { description: "ISBN-code", type: "string" },
    },
  },
  response: {
    201: {
      description: "Success response",
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
      },
    },
  },
};

export const GetBooksSchema = {
  response: {
    200: {
      description: "List of all books",
      type: "array",
      items: {
        type: "object",
        properties: {
          author: { description: "Name of author", type: "string" },
          year: { description: "Year of publication", type: "number" },
          title: { description: "Title of book", type: "string" },
          isbn: { description: "ISBN-code", type: "string" },
        },
      },
    },
  },
};

export const DeleteBookSchema = {
  body: {
    type: "object",
    required: ["isbn"],
    properties: {
      isbn: { description: "ISBN-code", type: "string" },
    },
  },
  response: {
    200: {
      description: "Delete status",
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
      },
    },
  },
};

export const UpdateBookSchema = {
  body: {
    type: "object",
    required: ["author", "year", "title", "isbn"],
    properties: {
      author: { description: "Name of author", type: "string" },
      year: { description: "Year of publication", type: "number" },
      title: { description: "Title of book", type: "string" },
      isbn: { description: "ISBN-code", type: "string" },
    },
  },
  response: {
    200: {
      description: "Update status",
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
      },
    },
  },
};
