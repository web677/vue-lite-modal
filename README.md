# vue-lite-modal

Vue.js modal dialog plugin for vue 3

[vue-lite-toast](https://www.npmjs.com/package/vue-lite-toast) : Vue.js toast notification plugin for vue 3

## Installation

```bash
# npm
npm install vue-lite-modal -S
```

## Import

```js
// In you main.js
// ... considering that your app creation is here
import Modal from "@vue-lite-modal";

createApp(App).use(Modal).mount("#app");
```

## Usage

```js
// this.$modal.open({/* options */});
this.$modal.open({content: 'Hello world'});
this.$modal.alert({
    title: 'Hello world',
    confirmButtonText: 'OK!'
});
this.$modal.confirm({
    title: 'Hello world',
    content: 'Vue.js modal dialog plugin for vue 3',
    cancelButtonText: 'NO!',
    confirmButtonText: 'YES!'
}).then(( {action} ) => {
    if(action == 'confirm'){
        alert('You clicked the confirm button!')
    } else {
        alert('You clicked the cancel button!')
    }
});
```

## Available options

The API methods accepts these options:

| Attribute         |  Type   |  Default  | Description                                |
| :---------------- | :-----: | :-------: | :----------------------------------------- |
| title             | String  |    --     | The Modal Dialog title, Can be empty       |
| content           | String  |    --     | The Modal Dialog content, Can not be empty |
| customClass       | String  |    --     | The Override class to overwrite the style  |
| showCancelButton  | Boolean |  `true`   | If the cancel button show or not           |
| cancelButtonText  | String  | `Cancel`  | The cancel button text                     |
| confirmButtonText | String  | `Confirm` | The confirm button text                    |

## API methods

### `open(options)`

This is generic method, you can use this method to make any kind of modal dialog.

```js
// Can accept a message as string and apply rest of options from defaults
this.$modal.open({content: 'Hello world'});
```

### `alert(options)`

There are some proxy methods to make it more readable.

```js
this.$modal.alert({
    title: 'Hello world',
    confirmButtonText: 'OK!'
}).then(({action}) => {
    console.log(action)
    //do some thing when the modal dialog closed
});

// it's the same as 
this.$modal.open({
    showCancelButton: false,
    title: 'Hello world',
    confirmButtonText: 'OK!'
}).then(({action}) => {
    console.log(action)
    //do some thing when the modal dialog closed
});

```

### `confirm(options)`

```js
this.$modal.confirm({
    title: 'Hello world',
    cancelButtonText: 'NO!',
    confirmButtonText: 'YES!'
}).then(({action}) => {
    if(action == 'confirm'){
        alert('You clicked the confirm button!')
        //do some thing when the modal dialog closed
    } else {
        alert('You clicked the cancel button!')
        //do some thing when the modal dialog closed
    }
});
```

## License

[MIT](LICENSE.txt) License
