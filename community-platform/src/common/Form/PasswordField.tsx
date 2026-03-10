import { Icon } from 'oa-components';
import { useState } from 'react';
import { Field } from 'react-final-form';

export const PasswordField = ({ name, component, ...rest }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Field
      {...rest}
      name={name}
      component={component}
      type={isPasswordVisible ? 'text' : 'password'}
      sx={{
        paddingRight: 8,
        border: '1px solid rgba(0,0,0,0.25)',
        borderRadius: '10px',
      }}
      endAdornment={
        <Icon
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
          glyph={isPasswordVisible ? 'hide' : 'show'}
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          size="25"
        />
      }
      required
    />
  );
};
