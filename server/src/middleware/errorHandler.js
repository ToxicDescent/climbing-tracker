export const errorHandler = (error, request, response, next) => {
  console.error(`${error.httpStatusCode}: ${error.message}`);
  response.status(error.httpStatusCode).json(error);
};
