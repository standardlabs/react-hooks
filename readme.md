# @standardlabs/react-hooks

This library is a collection of simple but useful react hooks.

## Installation

To install using NPM:
```sh
npm install @standardlabs/react-hooks
```

To install using Yarn:
```sh
yarn add @standardlabs/react-hooks
```

## useDebounced

`useDebounced(initialState, waitMs) => [value, setValue]`

Think of this hook as a debounced version of `useState`. Useful for state where the settled value is more important than every intermediate value.

```jsx
import React, {useEffect} from 'react'
import {useDebounced} from '@standardlabs/react-hooks'

const Example = () => {
  const [value, setValue] = useDebounced({height: null, width: null}, 150)
  
  useEffect(() => {
    const handler = e => setValue({height: e.target.innerHeight, width: e.target.innerWidth})
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [setValue])
  
  return <p>Height: {value.height}px Width: {value.width}px</p>
}
```

## useDeferred

`useDeferred(initialState, waitMs) => [{value, deferred}, setValue]`

This hooks is useful if you have a piece of state that is both needed for user interaction and potentially expensive computation. You have access to `value` which is always updated immediately as well as `deferred` which is a debounced mirror of `value`.

```jsx
import React, {useEffect} from 'react'
import {useDeferred} from '@standardlabs/react-hooks'

const Example = () => {
  const [counter, setCounter] = useDeferred(0, 150)
  
  useEffect(() => {
    const interval = setInterval(() => setCounter(i => i + 1), 1000)
    return () => clearInterval(interval)
  }, [setCounter])
  
  return <p>Value {counter.value}, Deferred: {counter.deferred}</p>
}
```

The above is a contrived example. Generally the deferred versions of these hooks are more useful for things like user input that drives expensive computations or graphs.

## useOnChange/useDeferredOnChange

`useOnChange(initialState, [transform]) => [value, onChange, setValue]`
`useOnChangeDeferred(initialState, waitMs, [transform]) => [{value deferred}, onChange, setValue]`

This hook is best used for form inputs that expose an `onChange` handler. The optional `transform` argument allows you parse event data before updating `value`. This library exports `asInt(value) => Int` and `asFloat(value) => Float` to make it easy to hold integer or float state. The deferred version is best used for form inputs that drive expensive operations like rendering charts or API calls.

```jsx
import React, {useEffect} from 'react'
import {useOnChange, useDeferredOnChange} from '@standardlabs/react-hooks'

const Example = () => {
  const [normal, onChangeNormal] = useOnChange('')
  const [deferred, onChangeDeferred] = useDeferredOnChange('', 300)
  
  // This will fire on every keypress
  useEffect(() => console.log(`[normal]: ${normal}`), [normal])
  
  // This will fire much less frequently
  useEffect(() => console.log(`[deferred]: ${deferred.deferred}`), [deferred.deferred])
  
  return <form>
    <input type="text" value={normal} onChange={onChangeNormal} />
    {/* This will remain very responsive as deferred.value updates immediately */}
    <input type="text" value={deferred.value} onChange={onChangeDeferred} />
  </form>
}
```

Again, this is a bit contrived. Imagine a `useEffect` that calls a search API as a user is typing. The `waitMs` value will contol how frequently the API call is performed.

## useOnChecked/useDeferredOnChecked

`useOnChecked(initialState, [transform]) => [value, onChange, setValue]`
`useDeferredOnChecked(initialState, wait, [transform]) => [{value, deferred}, onChange, setValue]`

Specialized versions of `useOnChange` and `useDeferredOnChange` that are tailored to checkbox inputs. Examples of these are left as an exercise to the reader.

## useToggle/useDeferredToggle

`useToggle(initialState) => [value, onToggle, setValue]`
`useDeferredToggle(initialState, wait) => [{value, deferred}, onToggle, setValue]`

This hook represents a toggle or boolean value. The `onToggle` function will alternate `value` from true to false and vice versa.

```jsx
import React, {useEffect} from 'react'
import {useToggle, useDeferredToggle} from '@standardlabs/react-hooks'

const Example = () => {
  const [normal, onToggle] = useToggle(true)
  const [deferred, onToggleDeferred] = useDeferredToggle(true, 150)

  return <div>
    <button onClick={onToggle}>Normal {normal ? 'On' : 'Off'}</button>
    <button onClick={onToggleDeferred}>Deferred {deferred.deferred ? 'On' : 'Off'}</button>
  </div>
}
```
