function toUpperCaseFirstOne(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function itemGenerate(name, ownProps) {
  return Object.assign({
    type: name,
    name: name,
    className: `form-item__${name}`,
    dirty: true,
    required: true,
    modelName: `form${toUpperCaseFirstOne(name)}`,
  }, ownProps);
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

function createHTML(items) {
  const itemsHTML = items.map((item)=> {
    return `
      <dl class="vue-${item.className}">
        <dt>${item.name}</dt>
        <dd><input type="${item.type}" v-model="${item.modelName}"></dd>
      </dl>
    `;
  }).join('');

  return (`
  <div class="vue-form-item">
    ${itemsHTML}
  </div>
  `);
}

function createData(items) {
  return items.reduce((data, item)=> {
    data[item.modelName] = '';
    data.validate[item.modelName] = {
      isValid: false,
      isDirty: false,
    };
    return data;
  }, { validate: {} });
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

  const FormComponent = Vue.extend({
    name,
    data() {
      console.log('Element directive');
      return createData(items);
    },
    template: createHTML(items),
  });

  // const vm = this.vm;
  // const el = this.el;
  // const $el = vm.$el;

  Vue.component('formComponent', FormComponent);
}
