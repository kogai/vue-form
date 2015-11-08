import validator from 'validator';

export default {
  required(model) {
    return model.length > 0;
  },
  isEmail(model) {
    return validator.isEmail(model);
  },
  minLength(model, conditions) {
    return model.length >= Number(conditions);
  },
  maxLength(model, conditions) {
    return model.length <= Number(conditions);
  },
};
