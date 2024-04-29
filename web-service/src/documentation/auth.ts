export const registerSamples = [
  {
    status: 200,
    input: "data user",
    output: {
      message: "successful registered user.",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZz9zaXplPTUweDUwJnNldD1zZXQxIiwiaWF0IjoxNjM1NzczOTYyLCJleHAiOjE2MzU3Nzc1NjJ9.n9PQX8w8ocKo0dMCw3g8bKhjB8Wo7f7IONFBDqfxKhs",
    },
  },
  {
    status: 402,
    input: "invalid data",
    output: {
      error: "error description",
    },
  },
  {
    status: 500,
    input: "internal server error",
    output: {
      error: "internal server error.",
    },
  },
];

export const signInSamples = [
  {
    status: 200,
    input: "incorrect user credentials",
    output: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZz9zaXplPTUweDUwJnNldD1zZXQxIiwiaWF0IjoxNjM1NzczOTYyLCJleHAiOjE2MzU3Nzc1NjJ9.n9PQX8w8ocKo0dMCw3g8bKhjB8Wo7f7IONFBDqfxKhs",
    },
  },
  {
    status: 400,
    input: "incorrect user credentials",
    output: {
      error: "User not found",
    },
  },
  {
    status: 401,
    input: "incorrect user credentials",
    output: {
      error: "invalid credentials",
    },
  },
  {
    status: 401,
    input: "invalid data",
    output: {
      error: "error description",
    },
  },
  {
    status: 500,
    input: "internal server error",
    output: {
      error: "internal server error.",
    },
  },
];
