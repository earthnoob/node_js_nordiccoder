const studentFilter = (req, res, next) => {
  if (req.session.user.role.name === 'PEASANT') {
    res.status(403).redirect('/403');
  } else {
    next();
  }
};

const teacherFilter = (req, res, next) => {
  if (req.session.user.role.name === 'NOBLEMAN') {
    res.status(403).redirect('/403');
  } else {
    next();
  }
};

const adminFilter = (req, res, next) => {
  if (req.session.user.role.name === 'OVERLORD') {
    res.status(403).redirect('/403');
  } else {
    next();
  }
};

module.exports = { studentFilter, teacherFilter, adminFilter };