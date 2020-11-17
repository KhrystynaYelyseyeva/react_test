import React, { memo } from 'react';

export const Form = memo(({
                handleSubmit,
                formData,
                errors,
                handleChange,
              }) =>  {
  const { userName, password } = formData;
  const { userNameError, passwordError } = errors;

  return (
    <form onSubmit={handleSubmit} className="Form">
      <label
        className="ContactForm__input-label"
      >
        Your name*
        {userNameError && (
          <span className="error">
            is required !
          </span>
        )}
        <input
          className="ContactForm__input"
          type="text"
          name="name"
          value={userName}
          required
          onChange={event => handleChange('userName')(event)}
        />
      </label>

      <label
        className="ContactForm__input-label"
      >
        Your password*
        {passwordError && (
          <span className="error">
            is required !
          </span>
        )}
        <input
          className="ContactForm__input"
          type="password"
          name="password"
          value={password}
          required
          onChange={event => handleChange('password')(event)}
        />
      </label>

      <button
        type="submit"
      >
        Submit
      </button>
    </form>
)});
