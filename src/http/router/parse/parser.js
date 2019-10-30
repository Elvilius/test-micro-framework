export const getPattern = path => path.replace(/:[A-Za-z]+/gi, (str) => {
  const key = str.replace(/:/, '');
  return `(?<${key}>[0-9]+)`;
});

export const paramsParser = match => (!match ? {}
  : Object.keys(match).reduce((acc, item) => ({ ...acc, [item]: match[item] }), {}));

export const queryParser = str => (!str ? {} : str.split('&').reduce((acc, item) => {
  const [key, value] = item.split('=');
  return ({ ...acc, [key]: value });
}, {}));
