const routes = {
  user: require('./routes/user'),
  instruments: require('./routes/instruments'),
  orchestras: require('./routes/orchestras'),
  // Add more routes here...
  // items: require('./routes/items'),
};

// We create a wrapper to workaround async errors not being transmitted correctly.
function makeHandlerAwareOfAsyncErrors(handler) {
  return async function(req, res, next) {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
}

function routeGenerator(app) {
  // We define the standard REST APIs for each route (if they exist).
  for (const [routeName, routeController] of Object.entries(routes)) {
    console.log(`/api/mysqlseq/${routeName}`)
    if (routeController.getAll) {
      app.get(
        `/api/mysqlseq/${routeName}`,
        makeHandlerAwareOfAsyncErrors(routeController.getAll)
      );
    }
    if (routeController.getById) {
      app.get(
        `/api/mysqlseq/${routeName}/:id`,
        makeHandlerAwareOfAsyncErrors(routeController.getById)
      );
    }
    if (routeController.create) {
      app.post(
        `/api/mysqlseq/${routeName}`,
        makeHandlerAwareOfAsyncErrors(routeController.create)
      );
    }
    if (routeController.update) {
      app.put(
        `/api/mysqlseq/${routeName}/:id`,
        makeHandlerAwareOfAsyncErrors(routeController.update)
      );
    }
    if (routeController.remove) {
      app.delete(
        `/api/mysqlseq/${routeName}/:id`,
        makeHandlerAwareOfAsyncErrors(routeController.remove)
      );
    }
  }
}

module.exports = routeGenerator;
