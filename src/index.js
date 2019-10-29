import React, {useCallback, useState} from 'react'

export const useInput = (initialState) => {
  const [value, setValue] = useState(initialState)
  const onChange = useCallback(({target: {value}}) => setValue(value), [setValue])
  return [value, onChange, setValue]
}

export const useCheckbox = (initialState) => {
  const [checked, setChecked] = useState(initialState)
  const onChange = useCallback(({target: {checked}}) => setChecked(checked), [setChecked])
  return [checked, onChange, setChecked]
}
