exports.myMiddleware = (req, res, next) => {
  req.name = 'Carlos';
  res.cookie('name', 'Carlos manda');
  next();
};

// everything you put in the exports variable is imported when the module is
exports.homePage = (req, res) => {
  console.log(req.name);
  res.render('index');
};
