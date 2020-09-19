import React from 'react';
import classnames from 'classnames';

export const InputSelect = ({ items, input, disabled, meta: { touched, error } }) => (
    <>
        <select
            {...input}
            disabled={disabled}
            className={classnames({
                'select--error': error && touched
            })}
        >
            {items && !items.find(item => item.value === '') &&
                <option disabled value="">Select an option</option>
            }
            {items.map((item, i) => (
                <option key={i} value={item.value}>{item.name}</option>
            ))}
        </select>

        {touched && error && !disabled &&
            <div className="input__container__error">
                <span className="error__message">{error}</span>
            </div>
        }
    </>
);