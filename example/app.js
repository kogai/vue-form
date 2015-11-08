import Vue from 'vue';
import VueForm from '../lib';

const defaultForm = new VueForm();
const customForm = new VueForm({
  name: 'your-custom-name',
  items: [
    {
      type: 'text',
      name: 'Name of your field',
      errorMessage: 'It is invalid!',
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
