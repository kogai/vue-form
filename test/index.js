import assert from 'power-assert';
import VueForm from '../lib';

describe('mochaのテスト', ()=> {
  it('インスタンスに名前を渡せる', ()=> {
    const myForm = new VueForm({
      name: 'my-form',
    });
    assert(myForm.name === 'my-form');
  });

  it('デフォルトの名前を持つ', ()=> {
    const myForm = new VueForm();
    assert(myForm.name === 'vue-form-unnamed');
  });

  it('デフォルトのフォームアイテムを持つ', ()=> {
    const myForm = new VueForm();
    assert(myForm.items.text.type === 'text');
    assert(myForm.items.text.className === 'form-item__text');
    assert(myForm.items.text.dirty === true);
    assert(myForm.items.text.required === true);
    assert(myForm.items.text.minLength === 5);
    assert(myForm.items.text.maxLength === 15);

    assert(myForm.items.email.type === 'email');
    assert(myForm.items.email.className === 'form-item__email');
    assert(myForm.items.email.dirty === true);
    assert(myForm.items.email.required === true);
    assert(myForm.items.email.isEmail === true);

    assert(myForm.items.password.type === 'password');
    assert(myForm.items.password.className === 'form-item__password');
    assert(myForm.items.password.dirty === true);
    assert(myForm.items.password.required === true);
    assert(myForm.items.password.minLength === 5);
    assert(myForm.items.password.maxLength === 30);
  });

  it('フォームアイテムを設定できる', ()=> {
    const myForm = new VueForm({
      items: {
        username: {
          type: 'text',
          required: true,
          minLength: 3,
          maxLength: 10,
        },
      },
    });
    assert(myForm.items.username.type === 'text');
    assert(myForm.items.username.className === 'form-item__username');
    assert(myForm.items.username.dirty === false);
    assert(myForm.items.username.required === true);
    assert(myForm.items.username.minLength === 3);
    assert(myForm.items.username.maxLength === 10);
  });

  it.only('デフォルトのフォームアイテムは可能な限り維持される', ()=> {
    const myForm = new VueForm({
      items: {
        username: {
          type: 'text',
          required: true,
          minLength: 3,
          maxLength: 10,
        },
      },
    });
    assert(myForm.items.username.type === 'text');
    assert(myForm.items.username.className === 'form-item__username');
    assert(myForm.items.username.dirty === false);
    assert(myForm.items.username.required === true);
    assert(myForm.items.username.minLength === 3);
    assert(myForm.items.username.maxLength === 10);

    assert(myForm.items.text.type === 'text');
    assert(myForm.items.text.className === 'form-item__text');
    assert(myForm.items.text.dirty === true);
    assert(myForm.items.text.required === true);
    assert(myForm.items.text.minLength === 5);
    assert(myForm.items.text.maxLength === 15);
  });

  it.only('フォームアイテムを上書きできる', ()=> {
    const myForm = new VueForm({
      items: {
        password: {
          type: 'password',
          className: 'form-item__password--confirm',
          required: false,
          minLength: 1,
          maxLength: 100,
        },
      },
    });
    assert(myForm.items.password.type === 'password');
    assert(myForm.items.password.className === 'form-item__password--confirm');
    assert(myForm.items.password.required === false);
    assert(myForm.items.password.minLength === 1);
    assert(myForm.items.password.maxLength === 100);
  });
});
