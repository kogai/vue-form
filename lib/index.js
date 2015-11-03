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
    Vue.elementDirective(this.name, {
      bind() {
      },
    });
  }
  getName() {
    // メソッドが無いとテストでRefferenceErrorが...
    return this.name;
  }
}

/*
import VueForm from 'vue-form';

const myForm = new VueForm({
  name: 'my-form',
  items: {
    username: {
      type: 'text',
      className: 'form-item__username',
      dirty: true,
      required: true,
      minLength: 5,
      maxLength: 15,
    },
    email: {
      type: 'email',
      className: 'form-item__email',
      dirty: true,
      required: true,
      isEmail: true,
    },
    password: {
      type: 'password',
      className: 'form-item__password',
      dirty: true,
      required: true,
      minLength: 5,
      maxLength: 30,
    },
    passwordConfirm: {
      type: 'password',
      className: 'form-item__password',
      dirty: true,
      required: true,
      minLength: 5,
      maxLength: 30,
      confirmation; 'password',
    },
  },
});

Vue.use(myForm);
// <span className="form-item__email--error"></span>
*/
