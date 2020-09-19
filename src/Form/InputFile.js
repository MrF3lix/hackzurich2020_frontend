import React from 'react';
import classNames from 'classnames';

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const InputFile = ({ selector, label, input: { onChange, value }, meta, ...props }) => {
    // const imageUrl = value ? URL.createObjectURL(value) : null
    const hasError = (meta.error || meta.submitError) && meta.touched;

    return (
        <div>
            <input
                onChange={adaptFileEventToValue(onChange)}
                className={classNames('input--file', {
                    'input--error': hasError
                })}
                type="file"
                id={selector}
                accept="image/*"
                {...props.input}
            />
            <label htmlFor={selector}>{label}</label>
            {hasError &&
                <span className="error__message">{meta.error || meta.submitError}</span>
            }
            {/* {imageUrl && !meta.error &&
                <div className="upload__preview">
                    <img src={imageUrl} alt="Upload image" />
                </div>
            } */}
        </div>
    );
};

export default InputFile;
