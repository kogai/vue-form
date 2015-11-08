## vuejsのフォームを自動生成するプラグイン

### 作成中

- [ ] input[type="check"]
- [ ] input[type="radio"]
- [ ] select
- [ ] textarea

### 使い方

```js
const defaultForm = new VueForm();
Vue.use(defaultForm);
```

```html
<vue-form></vue-form>
```

![](./example/example.gif)

### カスタムして使う
```js
const customForm = new VueForm({
  name: 'your-custom-name',
  items: [
    {
      type: 'text',
      name: '項目の名前',
      errorMessage: '不正規な値です',
      minLength: 3,
      maxLength: 5,
      required: true,
    },
  ],
});
Vue.use(customForm);
```

```html
<your-custom-name></your-custom-name>
```

![](./example/example2.gif)

### 有効なバリデーション条件

- required
- minLength
- maxLength
- isEmail
