# SUMMARY

- `create-react-app vidly`
- `npm i bootstrap font-awesome`
- Import bootstrap in the project (index.js)

  import 'bootstrap/dist/css/bootstrap.css'
  import "font-awesome/css/font-awesome.css"

- Install lodash (\_) library `npm i lodash`
  // https://es.reactjs.org/docs/typechecking-with-proptypes.html
- Install react prop type validation `i prop-types`

## Notes

The equivalent way to get elements or elment-values in react is using `refs`.

```jsx
const elRef = React.createRef();
const el = this.elRef.current;
...
<div ref={this.elRef}></div>
```

`WARNING`: [Using refs is not recommended](https://es.reactjs.org/docs/refs-and-the-dom.html), we can use it just when we know what we are doing, instead is always better to use properties .
