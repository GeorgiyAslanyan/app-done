import s from './FormsControl.module.css'
import React from "react";
import {WrappedFieldProps} from "redux-form";

export const Textarea: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return(
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div className={s.formTextarea}>
                <textarea {...input} {...props}/>
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>
    )
}

export const Input: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return(
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div>
                <input {...input} {...props}/>
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>
    )
}