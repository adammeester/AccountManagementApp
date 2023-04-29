import { useEffect, useState } from 'react';
import { FormInputs } from './types';

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState<FormInputs>(initial);
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, type } = e.target;
    let parsedValue = undefined;
    if (type === 'number') {
      parsedValue = parseInt(value);
    }
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: parsedValue || value
    });
  };

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm
  };
}
