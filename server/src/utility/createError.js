export const createError = (message, code) => {
  const error = new Error(message);
  error.httpStatusCode = code;
  return error;
};
