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
    errorMessage: '不正規な値です',
    required: true,
  }, ownProps); // ユーザーの渡した値で上書きする
}

const defaultProps = [
  itemGenerate('text', {
    minLength: 3,
    maxLength: 15,
    errorMessage: '名前は3~15文字を入力して下さい',
  }),
  itemGenerate('email', {
    isEmail: true,
    errorMessage: 'メールアドレスを入力して下さい',
  }),
  itemGenerate('password', {
    minLength: 10,
    maxLength: 30,
    errorMessage: 'パスワードは10~30文字を入力して下さい',
  }),
];

export default class VueForm {
  constructor(options = {}) {
    this.options = options;
    this.listeners = [];
  }
  on(callback) {
    this.listeners.push(callback);
  }
  emit(payload) {
    this.listeners.forEach(listener=> listener(payload));
  }
  install(Vue) {
    const name = this.options.name || 'vue-form';
    const emitter = this.emit.bind(this);
    let items;
    if (this.options.items) {
      items = this.options.items.map(item=> itemGenerate(item.type, item));
    } else {
      items = defaultProps;
    }
    const component = Vue.extend(createComponent(items, emitter));
    Vue.component(name, component);
  }
}
