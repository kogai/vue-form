import assert from 'power-assert';
import Vue from 'vue';
import jsdom from 'jsdom';
import VueForm from '../lib';

describe('Vue.install', ()=> {
  const myForm = new VueForm();
  let vm;
  before((done)=> {
    jsdom.env({
      html: `
        <html><body>
          <div id="root">
            {{test}}
            <vue-form></vue-form>
          </div>
        </body></html>
      `,
      done(err, window) {
        assert(err === null);
        global.document = window.document;
        global.window = window.document.defaultView;
        global.navigator = window.navigator;
        global.DocumentFragment = window.DocumentFragment;
        vm = new Vue({
          el: '#root',
          data: {
            test: 'This is test.',
          },
        });
        Vue.use(myForm);
        Vue.nextTick(done);
      },
    });
  });

  it('Can Install Plugin to Vue.', ()=> {
    assert(typeof Vue.options.elementDirectives['vue-form'] === 'object');
    assert(typeof Vue.options.elementDirectives['vue-form'].bind === 'function');
  });

  it('Can create DOM', ()=> {
    assert(vm.$el.innerHTML.match('This is test.'));
  });

  it.only('Can create custom element-directives.', ()=> {
    assert(vm.$el.innerHTML.match('<div class="vue-form-item">'));

    assert(vm.$el.innerHTML.match('<dl class="vue-form-item__username">'));
    assert(vm.$el.innerHTML.match('<dt>username</dt>'));
    assert(vm.$el.innerHTML.match('<dd><input type="text" v-model="formUsername" /></dd>'));

    assert(vm.$el.innerHTML.match('<dl class="vue-form-item__email">'));
    assert(vm.$el.innerHTML.match('<dt>email</dt>'));
    assert(vm.$el.innerHTML.match('<dd><input type="text" v-model="formEmail" /></dd>'));

    assert(vm.$el.innerHTML.match('<dl class="vue-form-item__password">'));
    assert(vm.$el.innerHTML.match('<dt>password</dt>'));
    assert(vm.$el.innerHTML.match('<dd><input type="password" v-model="formPassword" /></dd>'));
  });
});
