import assert from 'power-assert';
import Vue from 'vue';
import VueForm from '../lib';

describe('Vue.installのテスト', ()=> {
  const myForm = new VueForm();
  before((done)=> {
    Vue.use(myForm);
    Vue.nextTick(done);
  });

  it('Vueにインストールできる', ()=> {
    assert(myForm.name === 'vue-form');
  });
});
