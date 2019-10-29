import http from 'http';
import * as route from './http/router/router';

export const get = (path, handler) => {
  route.add({
    method: 'GET',
    path,
    handler,
  });
};

export const post = (path, handler) => {
  route.add({
    method: 'POST',
    path,
    handler,
  });
};

export const requestHandler = (request, response) => {
  route.match(request, response);
};

const server = http.createServer(requestHandler);

export const listen = (port, func) => {
  server.listen(port, func);
};
