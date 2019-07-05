const permissionMapping = (req, res, next) => {
  let permissions = {
    editOwnAccountInfo: false,
    removeOwnAccount: false,
    editAccountInfo: false,
    removeAccount: false
  };

  switch (req.session.user.role) {
    case "OVERLORD":
      permissions = {
        ...permissions,
        editOwnAccountInfo: true,
        removeOwnAccount: true,
        editAccountInfo: true,
        removeAccount: true
      };
      break;
    case "PEASANT":
      permissions = {
        ...permissions,
        editOwnAccountInfo: true,
        removeOwnAccount: true,
        editAccountInfo: false,
        removeAccount: false
      };
      break;
    default:
      break;
  }

  req.permissions = permissions;
  next();
};

module.exports = permissionMapping;
