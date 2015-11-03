import assert from 'power-assert';
import VueForm from '../lib';

describe('VueFormインスタンスのテスト', ()=> {
  it('インスタンスに名前を渡せる', ()=> {
    const myForm = new VueForm({
      name: 'my-form',
    });
    assert(myForm.name === 'my-form');
  });

  it('デフォルトの名前を持つ', ()=> {
    const myForm = new VueForm();
    assert(myForm.name === 'vue-form');
  });

  it('デフォルトのフォームアイテムを持つ', ()=> {
    const myForm = new VueForm();
    assert(myForm.items[0].type === 'text');
    assert(myForm.items[0].className === 'form-item__text');
    assert(myForm.items[0].dirty === true);
    assert(myForm.items[0].required === true);
    assert(myForm.items[0].minLength === 5);
    assert(myForm.items[0].maxLength === 15);

    assert(myForm.items[1].type === 'email');
    assert(myForm.items[1].className === 'form-item__email');
    assert(myForm.items[1].dirty === true);
    assert(myForm.items[1].required === true);
    assert(myForm.items[1].isEmail === true);

    assert(myForm.items[2].type === 'password');
    assert(myForm.items[2].className === 'form-item__password');
    assert(myForm.items[2].dirty === true);
    assert(myForm.items[2].required === true);
    assert(myForm.items[2].minLength === 5);
    assert(myForm.items[2].maxLength === 30);
  });

  it('フォームアイテムを設定できる', ()=> {
    const myForm = new VueForm({
      items: [
        {
          name: 'username',
          type: 'text',
          required: true,
          minLength: 3,
          maxLength: 10,
        },
      ],
    });
    assert(myForm.items[0].type === 'text');
    assert(myForm.items[0].className === 'form-item__username');
    assert(myForm.items[0].dirty === false);
    assert(myForm.items[0].required === true);
    assert(myForm.items[0].minLength === 3);
    assert(myForm.items[0].maxLength === 10);
  });

  it('デフォルトのフォームアイテムは可能な限り維持される', ()=> {
    const myForm = new VueForm({
      items: [
        {
          name: 'username',
          type: 'text',
          required: true,
          minLength: 3,
          maxLength: 10,
        },
      ],
    });
    assert(myForm.items[0].type === 'text');
    assert(myForm.items[0].className === 'form-item__username');
    assert(myForm.items[0].dirty === false);
    assert(myForm.items[0].required === true);
    assert(myForm.items[0].minLength === 3);
    assert(myForm.items[0].maxLength === 10);

    assert(myForm.items[1].type === 'text');
    assert(myForm.items[1].className === 'form-item__text');
    assert(myForm.items[1].dirty === true);
    assert(myForm.items[1].required === true);
    assert(myForm.items[1].minLength === 5);
    assert(myForm.items[1].maxLength === 15);
  });

  it('フォームアイテムを上書きできる', ()=> {
    const myForm = new VueForm({
      items: [
        {
          name: 'password',
          type: 'password',
          className: 'form-item__password--confirm',
          required: false,
          minLength: 1,
          maxLength: 100,
        },
      ],
    });
    assert(myForm.items[0].type === 'password');
    assert(myForm.items[0].className === 'form-item__password--confirm');
    assert(myForm.items[0].required === false);
    assert(myForm.items[0].minLength === 1);
    assert(myForm.items[0].maxLength === 100);
  });
});
