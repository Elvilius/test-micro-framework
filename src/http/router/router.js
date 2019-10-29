import * as _ from 'lodash';
import url from 'url';

const route = [];

export const add = obj => route.push(obj);

const queryParser = str => (!str ? {} : str.split('&').reduce((acc, item) => {
  const [key, value] = item.split('=');
  return ({ ...acc, [key]: value });
}, {}));

export const match = (req, res) => {
  const { query, pathname } = url.parse(req.url);

  req.query = queryParser(query);
  const obj = _.find(route, ({ method, path }) => method === req.method && path.match(pathname));
  if (!obj) {
    res.end('Page not found');
    return res;
  }
  const { handler } = obj;
  return handler(req, res);
};
