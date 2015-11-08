import {
  toUpperCaseFirstOne,
} from './utils';

import createComponent from './component';

function itemGenerate(name, ownProps) {
  return Object.assign({
    type: name,
    name: name,
    className: `form-item__${name}`,
    methodName: `onInput${toUpperCaseFirstOne(name)}`,
    modelName: `form${toUpperCaseFirstOne(name)}`,
    dirty: true,
    required: true,
  }, ownProps); // ユーザーの渡した値で上書きする
}


function itemItrate(items) {
  return items.map((item)=> {
    if (!item.type) item.type = 'text';
    if (!item.className) item.className = `form-item__${item.name}`;
    if (!item.dirty) item.dirty = false;
    if (!item.required) item.required = false;
    return item;
  });
}

function mergeArray(targetArray, defaultArray) {
  return targetArray.concat(defaultArray.filter((element)=> {
    let result = false;
    targetArray.forEach((target)=> {
      if (target.name !== element.name) {
        result = true;
      }
    });
    return result;
  }));
}

const defaultProps = [
  itemGenerate('text', {
    minLength: 5,
    maxLength: 15,
  }),
  itemGenerate('email', {
    isEmail: true,
  }),
  itemGenerate('password', {
    minLength: 5,
    maxLength: 30,
  }),
];

export default function install(Vue, opts = {}) {
  const name = opts.name || 'vue-form';
  let items;
  if (opts.items) {
    items = mergeArray(itemItrate(opts.items), defaultProps);
  } else {
    items = defaultProps;
  }
  Vue.component(name, Vue.extend(createComponent(items)));
}
