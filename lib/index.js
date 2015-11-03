function itemGenerate(name, ownProps) {
  return Object.assign({
    type: name,
    name: name,
    className: `form-item__${name}`,
    dirty: true,
    required: true,
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

function toUpperCaseFirstOne(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function createHTML(items) {
  const itemsHTML = items.map((item)=> {
    return `
      <dl class="vue-${item.className}">
        <dt>${item.name}</dt>
        <dd><input type="${item.type}" v-model="form${toUpperCaseFirstOne(item.name)}"></dd>
      </dl>
    `;
  }).join('');

  return (`
  <div class="vue-form-item">
    ${itemsHTML}
  </div>
  `);
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

export default class VueForm {
  constructor(opts = {}) {
    this.name = opts.name || 'vue-form';
    if (opts.items) {
      this.items = mergeArray(itemItrate(opts.items), defaultProps);
    } else {
      this.items = defaultProps;
    }
  }
  install(Vue) {
    const items = this.items;
    Vue.elementDirective(this.name, {
      bind() {
        this.el.innerHTML = createHTML(items);
        // console.log('this.name: ', this.name);
      },
    });
  }
}

/*
import VueForm from 'vue-form';

const myForm = new VueForm({
  name: 'my-form',
  items: [],
});

Vue.use(myForm);
// <span className="form-item__email--error"></span>
*/
