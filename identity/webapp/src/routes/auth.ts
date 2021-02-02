import { RouteMiddleware } from '../types/application';
import koaPassport from 'koa-passport';
import { withPrefix } from '../utility/prefix';

export const loginAction: RouteMiddleware = koaPassport.authenticate('auth0');

export const authCallback: RouteMiddleware = koaPassport.authenticate('auth0', {
  successRedirect: withPrefix('/dashboard'),
  failureRedirect: '/',
});

export const logoutAction: RouteMiddleware = (context) => {
  // There is also an option here for us to logout of auth0 session too, but I don't think this is required.
  context.logout();
  context.redirect('/');
};
