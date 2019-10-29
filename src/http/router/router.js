import * as _ from 'lodash';
import url from 'url';
const route = []; 

export const add = obj => route.push(obj);

export const match = (req, res) => {
    const a = url.parse(req.url);
    const {query, pathname} = url.parse(req.url);  

    console.log(a);
    req.query = queryParser(query);
    const obj = _.find(route, ({method, path}) => method === req.method && path.match(pathname));
    if (! obj) {
        res.end('Page not found');
        return res;
    }
    const { handler } = obj;
    return handler(req, res);
}

const queryParser = str => !str ? {} : str.split('&').reduce((acc, item) => {
  const [key, value] = item.split('=');
  return {...acc, [key]: value} }, {})
    