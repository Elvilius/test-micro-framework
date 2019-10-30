import * as _ from 'lodash';
import url from 'url';
import * as parser from './parse/parser';

const route = [];

export const add = obj => route.push(obj);

export const match = (req, res) => {
  const { query, pathname, method } = url.parse(req.url);

  const obj = _.find(route, ({ methodHttp, path }) => {
    const pattern = parser.getPattern(path);
    const matches = pathname.match(pattern);
    if (!matches) {
      return false;
    }
    const [input] = matches;
    if (input !== pathname && methodHttp !== method) {
      return false;
    }

    const { groups } = matches;
    req.params = parser.paramsParser(groups);
    return true;
  });

  if (!obj) {
    res.end('Page not found');
    return res;
  }

  req.query = parser.queryParser(query);
  const { handler } = obj;
  return handler(req, res);
};
