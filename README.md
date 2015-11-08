## Form handling library for [vue.js](http://vuejs.org/).

No more bothered about chores of handling form.

### WIP

The following is a work in progress.

- [ ] input[type="check"]
- [ ] input[type="radio"]
- [ ] select
- [ ] textarea


### Quick Start

```js
const defaultForm = new VueForm();
Vue.use(defaultForm);
```

```html
<vue-form></vue-form>
```

![](./example/example.gif)

Then, you can listen user's input like follow.

```js
new Vue({
  el: '#root',
  created() {
    defaultForm.on((inputed)=> {
      console.log(inputed);
    });
  },
});

```


### Design your form

```js
const customForm = new VueForm({
  name: 'your-custom-name',
  items: [
    {
      type: 'text',
      name: 'Name of your field',
      errorMessage: 'It is invalid!',
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

### Currently valid validation conditions

- required
- minLength
- maxLength
- isEmail
