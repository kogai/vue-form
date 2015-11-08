import Vue from '../.sample/vue1.0';
import VueForm from '../lib';

const defaultForm = new VueForm();
const customForm = new VueForm({
  name: 'your-custom-name',
  items: [
    {
      type: 'text',
      name: '項目の名前',
      dirty: true,
      errorMessage: '不正規な値です',
      minLength: 3,
      maxLength: 5,
      required: true,
    },
  ],
});

Vue.use(defaultForm);
Vue.use(customForm);

new Vue({
  el: '#root',
});
