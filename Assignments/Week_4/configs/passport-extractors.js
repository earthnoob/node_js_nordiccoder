const CustomExtractor = Object.freeze({
  fromReqObj (req) {
    return req && req.jwtToken;
  },
  fromSession (req) {
    if (req && req.session) {
      return req.session.token;
    }
    return null;
  }
});

module.exports = CustomExtractor;