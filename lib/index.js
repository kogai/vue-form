function itemGenerate(name, ownProps) {
  return Object.assign({
    type: name,
    className: `form-item__${name}`,
    dirty: true,
    required: true,
  }, ownProps);
}

function itemItrate(items) {
  for (const itemName in items) {
    if (items.hasOwnProperty(itemName)) {
      if (!items[itemName].type) items[itemName].type = 'text';
      if (!items[itemName].className) items[itemName].className = `form-item__${itemName}`;
      if (!items[itemName].dirty) items[itemName].dirty = false;
      if (!items[itemName].required) items[itemName].required = false;
    }
  }
  return items;
}

const defaultProps = {
  text: itemGenerate('text', {
    minLength: 5,
    maxLength: 15,
  }),
  email: itemGenerate('email', {
    isEmail: true,
  }),
  password: itemGenerate('password', {
    minLength: 5,
    maxLength: 30,
  }),
};

export default class VueForm {
  constructor(opts = {}) {
    this.name = opts.name || 'vue-form-unnamed';
    if (opts.items) {
      this.items = Object.assign({}, defaultProps, itemItrate(opts.items));
    } else {
      this.items = defaultProps;
    }
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
