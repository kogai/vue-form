import _ from 'lodash';

import {
  createData,
  createHTMLString,
} from './utils';

import validators from './validators';

let context;

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
          || key === 'dirty'
          || key === 'errorMessage'
        )
      ) {
        collected[key] = item[key];
      }
    }
  }
  return collected;
}

function correctModels(_context, items) {
  return items.reduce((models, item)=> {
    models[item.modelName] = _context[item.modelName];
    return models;
  }, {});
}

function correctValidates(_context, items) {
  return items.map((item)=> {
    return _context.validate[item.modelName].isValid;
  });
}

function createValidator(conditions, modelName, items) {
  const validatorFn = ()=> {
    // 一度でも入力があったかをチェック
    if (!context.validate[modelName].isDirty) {
      context.validate[modelName].isDirty = true;
    }

    const validateResults = [];
    const model = context[modelName];

    // 検証項目を全てチェックする
    for (const key in conditions) {
      if (conditions.hasOwnProperty(key)) {
        let result = false;
        result = validators[key](model, conditions[key]);
        validateResults.push(result);
      }
    }
    context.validate[modelName].isValid = _.every(validateResults, (isValid)=> isValid);

    const validates = correctValidates(context, items);
    context.validate.isAllValid = _.every(validates, (isValid)=> isValid);
  };
  return validatorFn;
}

function createValidators(items) {
  return items.reduce((methods, item)=> {
    const conditions = collectConditions(item);
    methods[item.methodName] = createValidator(conditions, item.modelName, items);
    return methods;
  }, {});
}

export default function createComponent(items, emitter) {
  return {
    data() {
      return createData(items);
    },
    created() {
      context = this;
    },
    template: createHTMLString(items),
    computed: {
      isAllValid() {
        const validates = correctValidates(context, items);
        return _.every(validates, (isValid)=> isValid);
      },
    },
    methods: {
      onSubmit() {
        emitter(correctModels(context, items));
      },
      ...createValidators(items),
    },
  };
}
