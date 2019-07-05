const renderTemplate = (req, res, next) => {
  switch (req.session.user.role.name) {
    case "OVERLORD":
      res.renderTemplate = "index-admin";
      break;
    case "NOBLEMAN":
      res.renderTemplate = "index-teacher";
      break;
    case "PEASANT":
      res.renderTemplate = "index-student";
      break;
    default:
      res.renderTemplate = "index-student";
      break;
  }

  next();
};

module.exports = renderTemplate;
