import React, { useCallback, useState } from "react";

const identity = a => a;

export const useInput = (initialState, transform = identity) => {
  const [value, setValue] = useState(initialState);
  const onChange = useCallback(
    ({ target: { value } }) => setValue(transform(value)),
    [setValue]
  );

  return [value, onChange, setValue];
};

export const useCheckbox = initialState => {
  const [checked, setChecked] = useState(initialState);
  const onChange = useCallback(
    ({ target: { checked } }) => setChecked(checked),
    [setChecked]
  );

  return [checked, onChange, setChecked];
};
