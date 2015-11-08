import Vue from '../.sample/vue1.0';
import VueForm from '../lib';

const childComponent = Vue.extend({
  data() {
    return { childmock: 'This is child component.' };
  },
  template: '<section>{{childmock}}</section>'
});

Vue.use(VueForm);
const vm = new Vue({
  el: '#root',
  components: { childComponent },
});
