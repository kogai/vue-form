import assert from 'power-assert';
import _ from 'lodash';

export function createHTMLString(items) {
  const itemsHTML = items.map((item)=> {
    return `
      <dl class="vue-${item.className}">
        <dt>${item.name}</dt>
        <dd>
          <input
            type="${item.type}"
            v-model="${item.modelName}"
            @input="${item.methodName}" >
        </dd>
      </dl>
    `;
  }).join('');

  return (`
  <div class="vue-form-item">
    ${itemsHTML}
  </div>
  `);
}


/**
@param { Array } modelの名前を含んだ配列
@return { Object } modelをプロパティとして含んだ$data用オブジェクト
@example
[
  {
    formName: 'someName'
  }
]
{
  someName: '',
  validate: {
    someName: {
    isValid: false,
    isDirty: false
  }
  }
}
**/
export function createData(items) {
  assert(_.isArray(items));

  const $data = items.reduce((data, item)=> {
    data[item.modelName] = '';
    data.validate[item.modelName] = {
      isValid: false,
      isDirty: false,
    };
    return data;
  }, { validate: {} });

  assert(_.isObject($data));
  return $data;
}


/**
@param { String } someValue
@return { String } SomeValue
**/
export function toUpperCaseFirstOne(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}