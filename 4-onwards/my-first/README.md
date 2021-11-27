### https://overreacted.io/a-complete-guide-to-useeffect/#each-render-has-its-own-props-and-state
### https://dev.to/shareef/react-usestate-hook-is-asynchronous-1hia
### https://reactjs.org/docs/hooks-reference.html#functional-updates
### https://kentcdodds.com/blog/use-ternaries-rather-than-and-and-in-jsx

JSX is complied to js
for eg.

```
const App = () => {
    return (<div className="app">Hello</div>)
}
```

will look like

```
React.createElement(
    'div',
    {class: 'app'},
    'Hello'
)
```
its then passed to ReactDom.render method.

This tree like structure (in case of nested tags in jsx) of elements the React Dom method uses is called the virtual DOM. React DOM uses this virtual dom to inject elements into the real DOM.

When state of a comp changes, the React dom compares the 2 trees of the virtual doms, and only updates the changes on the real dom.

State: Component data that may change over time

UseState is a react hook. used for creating comp states (comp data) that can change over time. When we use this to create state, whenever state value changes, it triggers our component to be reevaluated with the new state value
