import {
  createData,
  createHTMLString,
} from './utils';

export default function createComponent(items) {
  return {
    data() {
      return createData(items);
    },
    template: createHTMLString(items),
    methods: createValidators(items),
  };
}

function collectConditions(item) {
  const collected = {};
  for (const key in item) {
    if (item.hasOwnProperty(key)) {
      if (
        !(
          key === 'type'
          || key === 'name'
          || key === 'className'
          || key === 'methodName'
          || key === 'modelName'
        )
      ) {
        collected[key] = item[key];
      }
    }
  }
  return collected;
}

function createValidators(items) {
  return items.reduce((methods, item)=> {
    const conditions = collectConditions(item);
    methods[item.methodName] = createValidator(conditions);
    return methods;
  }, {});
}

function createValidator(conditions) {
  return (event)=> {
    const inputed = event.target.value;
    console.log(inputed);
  };
}
