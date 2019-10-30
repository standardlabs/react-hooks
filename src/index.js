import React, { useCallback, useState } from "react";

const identity = a => a;

export const useOnChange = (initialState, transform = identity) => {
  const [value, setValue] = useState(initialState);
  const onChange = useCallback(
    ({ target: { value } }) => setValue(transform(value)),
    [setValue]
  );

  return [value, onChange, setValue];
};

export const useOnChecked = initialState => {
  const [checked, setChecked] = useState(initialState);
  const onChecked = useCallback(
    ({ target: { checked } }) => setChecked(checked),
    [setChecked]
  );

  return [checked, onChecked, setChecked];
};
