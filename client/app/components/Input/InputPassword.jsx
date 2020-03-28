// @flow
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { I18n } from '../../libs/i18n';
import css from './InputPassword.scss';
import inputCss from './Input.scss';

export type Props = {
  id: string,
  name?: string,
  placeholder?: string,
  required?: boolean,
  label?: string,
  hasError?: Function,
};

export type State = {
  showText: boolean,
};

const onFocus = (required: ?boolean, hasError: ?Function) => {
  if (required && hasError) {
    hasError(false);
  }
};


const onBlur = (
  e: SyntheticEvent<HTMLInputElement>,
  required: ?boolean,
  hasError: ?Function,
  id: string,
) => {
  const { value } = e.currentTarget;
   if (required && e.currentTarget.value == '') {
    hasError(!value, "empty");
    return;
  }

  const password_regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/;

  if (e.currentTarget.id == "user_password" || e.currentTarget.id == "user_password_confirmation") {
    if (e.currentTarget.value.length>=8 && password_regex.test(e.currentTarget.value)) {
      hasError(false);
    }
    else{
      hasError(true, "password");
    }
  }
};

export function InputPassword({
  id,
  name,
  placeholder,
  required,
  label,
  hasError,
}: Props) {
  const [showText, setShowText] = useState<boolean>(false);

  const toggleShow = () => {
    setShowText(!showText);
  };

  return (
    <div className={css.password}>
      <input
        type={showText ? 'text' : 'password'}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        aria-label={label}
        autoComplete="off"
        className={inputCss.password}
        onFocus={() => onFocus(required, hasError)}
        onBlur={(e: SyntheticEvent<HTMLInputElement>) => onBlur(e, required, hasError, id)}
      />
      <button
        type="button"
        onClick={toggleShow}
        aria-label={
          showText
            ? I18n.t('devise.hide_password')
            : I18n.t('devise.show_password')
        }
      >
        <FontAwesomeIcon icon={showText ? faEyeSlash : faEye} />
      </button>
    </div>
  );
}
