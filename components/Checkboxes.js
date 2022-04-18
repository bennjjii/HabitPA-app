import * as React from 'react';
import {useController, useForm} from 'react-hook-form';

const Checkboxes = ({options, control, name}) => {
  const {field} = useController({
    control,
    name,
  });
  const [value, setValue] = React.useState(field.value || []);

  return (
    <>
      {options.map((option, index) => (
        <input
          onChange={e => {
            const valueCopy = [...value];

            // update checkbox value
            valueCopy[index] = e.target.checked ? e.target.value : null;

            // send data to react hook form
            field.onChange(valueCopy);

            // update local state
            setValue(valueCopy);
          }}
          key={option}
          checked={value.includes(option)}
          type="checkbox"
          value={option}
        />
      ))}
    </>
  );
};
