import Vue from 'vue';
import VueForm from '../lib';

const defaultForm = new VueForm();
Vue.use(defaultForm);

new Vue({
  el: '#root',
  created() {
    defaultForm.on((inputed)=> {
      console.log(inputed);
    });
  },
});
