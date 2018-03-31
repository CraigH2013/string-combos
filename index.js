const shortid = require('shortid');

function combinations(arr) {
  if (arr.length === 0) {
    return [];
  } else if (arr.length === 1) {
    return arr[0].map(v => [v]);
  }
  const result = [];
  const rest = combinations(arr.slice(1));
  for (let i = 0; i < rest.length; i += 1) {
    for (let j = 0; j < arr[0].length; j += 1) {
      result.push([arr[0][j]].concat(rest[i]));
    }
  }
  return result;
}

class Generator {
  constructor() {
    this.options = {};
  }

  opts(...values) {
    const id = shortid() + shortid();
    this.options[id] = values;
    return id;
  }

  exec(string) {
    const ids = Object.keys(this.options);
    const combos = combinations(ids.map(id => this.options[id]));
    const strings = [];
    for (let i = 0; i < combos.length; i += 1) {
      const combo = combos[i];
      let str = string;
      for (let j = 0; j < combo.length; j += 1) {
        const id = ids[j];
        const word = combo[j];
        const re = new RegExp(id);
        str = str.replace(re, word);
      }
      strings.push(str);
    }
    return strings;
  }
}

function isOption(string) {
  const re = /\${gstr>>.*?<<gstr}/;
  return !re.test(string);
}

function encode(options) {
  return `\${gstr>>${options.join('-|gstr|-')}<<gstr}`;
}

function decode(string) {
  const gen = new Generator();
  let genStr = string;

  const re = /\${gstr>>(.*?)<<gstr}/;
  let match = re.exec(genStr);

  while (match) {
    const [matched, group] = match;
    const { index } = match;

    const before = genStr.substring(0, index);
    const id = gen.opts(...group.split('-|gstr|-'));
    const after = genStr.substring(index + matched.length);

    genStr = before + id + after;
    match = re.exec(genStr);
  }
  return gen.exec(genStr);
}

function stringCombos(...values) {
  if (values.length === 0) {
    return '';
  }
  const [firstValue] = values;

  if (isOption(firstValue)) {
    if (values.length !== 1) {
      return encode(values);
    }
    return firstValue;
  }
  return decode(firstValue);
}

module.exports = stringCombos;
