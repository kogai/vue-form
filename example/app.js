import Vue from '../.sample/vue1.0';
import VueForm from '../lib';

const defaultForm = new VueForm();
const customForm = new VueForm({
  name: 'vue-form-custom',
  items: [
    {
      type: 'text',
      name: 'custom',
      dirty: true,
      errorMessage: '不正規な値です',
      required: true,
    },
  ],
});

Vue.use(defaultForm);
Vue.use(customForm);

const vm = new Vue({
  el: '#root',
});
