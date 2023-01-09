function handleError(res, status, errorMessage) {
  res.status(status).send(errorMessage);
}

module.exports = { handleError };
