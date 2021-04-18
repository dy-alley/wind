```js
import Button from 'components/Button';
```


<!-- STORY -->

#### Story Source

<!-- SOURCE -->


#### Icons

```js
import Button from 'components/button';

render() {
  return (
    <Button icon="mail">Send mail</Button>
    <Button icon="trash">Remove</Button>
  );
}
```

#### Button types

Means `OutlinedButton`, `ContainedButton`, `TextButton`. It is possible to import as standalone component or pass `variant` property. Defautl value is `contained`.

```js
<Button variant="outlined" />
<Button variant="contained" />
<Button variant="text" />
```

<!-- PROPS -->