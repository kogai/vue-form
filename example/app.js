import Vue from 'vue';
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
  created() {
    defaultForm.on((inputed)=> {
      console.log(inputed);
    });
    customForm.on((inputed)=> {
      console.log(inputed);
    });
  },
});
