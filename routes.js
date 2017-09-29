/**
 * Created by andoan on 9/29/17.
 */
const nextRoutes = require('next-routes');
const routes = module.exports = nextRoutes();
routes.add('quiz', '/quiz/:slug');
routes.add('index', '/');