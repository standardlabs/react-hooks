import debounce from "lodash.debounce";
import { useCallback, useState } from "react";

export const identity = a => a;
export const asInt = value => parseInt(value, 10);
export const asFloat = value => parseFloat(value, 10);

export const useDebounced = (initialState, wait) => {
  const [state, setState] = useState(initialState);
  const setStateDebounced = useCallback(debounce(setState, wait), [setState]);
  return [state, setStateDebounced];
};

export const useDeferred = (initialState, wait) => {
  const [value, setValue] = useState(initialState);
  const [deferred, setDeferred] = useDebounced(initialState, wait);

  const setState = useCallback(
    (...args) => {
      setDeferred(...args);
      return setValue(...args);
    },
    [setValue, setDeferred]
  );

  return [{ value, deferred }, setState];
};

const buildOnHandler = (useFn, key, argFn) => (...args) => {
  const { initialState, wait, transform = identity } = argFn(args);

  const [value, setValue] = useFn(initialState, wait);
  const onChange = useCallback(
    ({ target }) => setValue(transform(target[key])),
    [setValue]
  );

  return [value, onChange, setValue];
};

const useStateArgs = args => ({
  initialState: args[0],
  transform: args[1]
});

const useDeferredArgs = args => ({
  initialState: args[0],
  wait: args[1],
  transform: args[2]
});

export const useOnChange = buildOnHandler(useState, "value", useStateArgs);
export const useDeferredOnChange = buildOnHandler(
  useDeferred,
  "value",
  useDeferredArgs
);

export const useOnChecked = buildOnHandler(useState, "checked", useStateArgs);
export const useDeferredOnChecked = buildOnHandler(
  useDeferred,
  "checked",
  useDeferredArgs
);

const buildToggleHandler = useFn => (...args) => {
  const [value, setValue] = useFn(...args);
  const onToggle = useCallback(() => setValue(value => !value), [setValue]);
  return [value, onToggle, setValue];
};

export const useToggle = buildToggleHandler(useState);
export const useDeferredToggle = buildToggleHandler(useDeferred);
