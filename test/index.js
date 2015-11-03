import assert from 'power-assert';
import VueForm from '../lib';

const myForm = new VueForm({
  name: 'my-form',
});

describe('mochaのテスト', ()=> {
  it('テストが動作している', ()=> {
    assert(true);
  });

  it('インスタンスに名前を渡せる', ()=> {
    assert(myForm.name === 'my-form');
  });

  it.only('インスタンスはデフォルトの名前を持つ', ()=> {
    const myForm2 = new VueForm();
    assert(myForm2.name === 'vue-form-unnamed');
  });
});
