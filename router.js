const { parse } = require("querystring");
const helpers = require("./common/helpers");

module.exports = async (req, res, routes) => {
  const route = routes.find(route => {
    const methodMatch = route.method === req.method;
    let pathMatch = false;
    if (req.url.slice(-1) === "/") {
      req.url = req.url.substring(0, req.url.length - 1);
    }
    if (typeof route.path === "object") {
      // Path  is a RegEx we use RegEx matching
      pathMatch = req.url.match(route.path);
    } else {
      // Path is a string, we simply match with URL
      pathMatch = route.path === req.url;
    }
    return pathMatch && methodMatch;
  });
  let param = null;
  if (route && typeof route.path === "object") {
    param = req.url.match(route.path)[1];
  }

  if (route) {
    let body = null;
    if (req.method === "POST" || req.method === "PUT") {
      body = await getPostData(req);
    }
    return route.handler(req, res, param, body);
  } else {
    return helpers.error(res, "Endpoint not found", 404);
  }
};

const getPostData = req => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", chunk => {
        body += chunk.toString();
      });

      req.on("end", _ => {
        resolve(body);
      });
    } catch (err) {
      reject(err);
    }
  });
};
