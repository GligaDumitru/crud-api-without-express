const bcrypt = require("bcrypt");

module.exports.success = (res, data = null) => {
  addHeaders(res);

  res.statusCode = 200;
  res.end(
    JSON.stringify(
      {
        status: "success",
        data
      },
      null,
      3
    )
  );
};

module.exports.crypt = password => {
  return bcrypt.hash(password, (saltRounds = 10), (err, hash) => {
    return hash;
  });
};

module.exports.checkPassword = (password, hash) => {
  bcrypt.compare(password, hash, (err, res) => {
    return res;
  });
};

module.exports.error = (res, error = "An error ocured", statusCode = 500) => {
  addHeaders(res);
  res.statusCode = statusCode;
  res.end(
    JSON.stringify(
      {
        status: "fail",
        error
      },
      null,
      3
    )
  );
};

module.exports.validationError = (res, error = "Data is not valid") => {
  addHeaders(res);

  res.statusCode = 422;
  res.end(
    JSON.stringify(
      {
        status: "fail",
        error
      },
      null,
      3
    )
  );
};

const addHeaders = res => res.setHeader("Content-Type", "application/json");
