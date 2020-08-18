import debounce from "lodash.debounce";
import { useCallback, useMemo, useState } from "react";

export const asInt = (value: string): number => parseInt(value, 10);

export const asFloat = (value: string): number => parseFloat(value);

export const useDebounced = <T>(
  initialState: T,
  wait: number
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState(initialState);
  const setStateDebounced = useMemo(() => debounce(setState, wait), [
    setState,
    wait,
  ]);
  return [state, setStateDebounced];
};

export type Deferred<T> = { value: T; deferred: T };

export const useDeferred = <T>(
  initialState: T,
  wait: number
): [Deferred<T>, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState(initialState);
  const [deferred, setDeferred] = useDebounced(initialState, wait);

  const setState = useCallback(
    (val) => {
      setDeferred(val);
      setValue(val);
    },
    [setValue, setDeferred]
  );

  return [{ value, deferred }, setState];
};

export type OnChange = (e: { target: { value: string } }) => void;

export const useOnChange = <I, O>(
  initialState: O,
  transform?: (a: I) => O
): [O, OnChange, React.Dispatch<React.SetStateAction<O>>] => {
  const [value, setValue] = useState(initialState);
  const onChange = useCallback(
    ({ target: { value } }) => {
      if (transform) {
        setValue(transform(value));
      } else {
        setValue(value);
      }
    },
    [transform, setValue]
  );
  return [value, onChange, setValue];
};

export const useDeferredOnChange = <I, O>(
  initialState: O,
  wait: number,
  transform?: (a: I) => O
): [Deferred<O>, OnChange, React.Dispatch<React.SetStateAction<O>>] => {
  const [value, setValue] = useDeferred(initialState, wait);
  const onChange = useCallback(
    ({ target: { value } }) => {
      if (transform) {
        setValue(transform(value));
      } else {
        setValue(value);
      }
    },
    [transform, setValue]
  );
  return [value, onChange, setValue];
};

export type OnChecked = (e: { target: { checked: boolean } }) => void;

export const useOnChecked = (
  initialState: boolean
): [boolean, OnChecked, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [checked, setChecked] = useState(initialState);
  const onChecked = useCallback(
    ({ target: { checked } }) => setChecked(checked),
    [setChecked]
  );
  return [checked, onChecked, setChecked];
};

export const useDeferredOnChecked = (
  initialState: boolean,
  wait: number
): [
  Deferred<boolean>,
  OnChecked,
  React.Dispatch<React.SetStateAction<boolean>>
] => {
  const [checked, setChecked] = useDeferred(initialState, wait);
  const onChecked = useCallback(
    ({ target: { checked } }) => setChecked(checked),
    [setChecked]
  );
  return [checked, onChecked, setChecked];
};

export type OnToggle = () => void;

export const useToggle = (
  initialState: boolean
): [boolean, OnToggle, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [value, setValue] = useState(initialState);
  const onToggle = useCallback(() => setValue((value) => !value), [setValue]);
  return [value, onToggle, setValue];
};

export const useDeferredToggle = (
  initialState: boolean,
  wait: number
): [
  Deferred<boolean>,
  OnToggle,
  React.Dispatch<React.SetStateAction<boolean>>
] => {
  const [value, setValue] = useState(initialState);
  const [deferred, setDeferred] = useDebounced(initialState, wait);

  const set = useCallback(
    (val) => {
      setDeferred(val);
      setValue(val);
    },
    [setDeferred, setValue]
  );

  const onToggle = useCallback(() => set(!value), [set, value]);

  return [{ value, deferred }, onToggle, set];
};
