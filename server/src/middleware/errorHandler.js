export const errorHandler = (error, request, response, next) => {
  response.status(error.httpStatusCode).json(error);
};
