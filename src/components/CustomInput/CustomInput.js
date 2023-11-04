import React from 'react'

function CustomInput({ label, field, form: { touched, errors }, classes, statusErrorState, darkMode,...props }) {
    const hasError = touched[field.name] && errors[field.name];
    return (
      <div className={`form-group ${hasError ? 'has-error' : ''} ${classes}`}>
            <div className='w-[100%]'>
                <label htmlFor={field.name} className={hasError || statusErrorState ? (darkMode ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500" :"block mb-2 text-sm font-medium text-left text-red-700") : (darkMode ? "block mb-2 text-sm font-medium text-gray-900 dark:text-white" : "block mb-2 text-sm font-medium text-left text-gray-900")}>{label}</label>
                <input className={hasError || statusErrorState ?
                   (darkMode ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                   : 
                   "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5")
                    : 
                    (darkMode ? "shadow-sm border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                     : 
                     "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5") } {...field} {...props} />
            </div>
        {hasError && <div className={darkMode ? "error-message text-white" :"error-message"}>{errors[field.name]}</div>}
      </div>
    );
}

export default CustomInput