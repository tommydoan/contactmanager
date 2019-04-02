import React from 'react'
import PropTypes from 'prop-types'
import classname from 'classnames';
 function TextInputGroup({
     label,
     type,
     value,
     name,
     placeholder,
     onChange,
     error
 }) {
  return (
    <div className="form-group">
                    <label htmlFor={name}>{label}</label>
                        <input type={type}
                                name={name}
                                placeholder={placeholder}
                                className={classname("form-control from-control-lg",{'is-invalid':error})}
                                onChange={onChange}
                                value={value}                                
                                />
            {error && <div className="invalid-feedback">{error}</div> }
            
    </div>
  )
}
TextInputGroup.propTypes={
    name:PropTypes.string.isRequired,
    type:PropTypes.string.isRequired,
    value:PropTypes.string.isRequired,
    placeholder:PropTypes.string.isRequired,
    label:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    error:PropTypes.string.isRequired
}
export default TextInputGroup;