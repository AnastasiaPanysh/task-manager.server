function buildResponse(res, status, message) {
  res.status(status).send(message);
}

module.exports = { buildResponse };
