import React, { useState, useContext } from 'react';

import './LoginForm.css';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';

const Login = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  const auth = useContext(AuthContext);

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { 'Content-Type': 'application/json' }
        );
        auth.login(responseData.user.userId, responseData.token);
      } catch (error) {
        // Do nothing... This is handled in the http hook.
      }
    } else {
      try {
        const formData = new FormData();
        formData.append('name', formState.inputs.name.value);
        formData.append('email', formState.inputs.email.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);

        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/signup`,
          'POST',
          formData
        );

        auth.login(responseData.user.userId, responseData.token);
      } catch (error) {
        // Do nothing... This is handled in the http hook.
      }
    }
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className='login-form'>
        {isLoading && <LoadingSpinner asOverlay />}
        {isLoginMode ? <h2>Login</h2> : <h2>Register</h2>}
        <form onSubmit={loginSubmitHandler}>
          {!isLoginMode && (
            <Input
              element='input'
              id='name'
              label='Name'
              type='text'
              onInput={inputHandler}
              errorText='Please enter a valid name'
              validators={[VALIDATOR_REQUIRE()]}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              center
              id='image'
              onInput={inputHandler}
              errorText='Please provide an image'
            />
          )}
          <Input
            id='email'
            element='input'
            type='email'
            label='Email'
            errorText='Please enter a valid email'
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
          />
          <Input
            id='password'
            element='input'
            type='password'
            label='Password'
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText='Please enter a valid password'
            onInput={inputHandler}
          />
          <Button type='submit' disabled={!formState.isValid}>
            {isLoginMode ? 'Login' : 'Submit'}
          </Button>
        </form>

        {isLoginMode ? (
          <div className='right'>
            <p>Don't have an account?</p>
            <Button inverse onClick={switchModeHandler}>
              Sign Up
            </Button>
          </div>
        ) : (
          <div className='right'>
            <p>Already have an account?</p>
            <Button inverse onClick={switchModeHandler}>
              Login
            </Button>
          </div>
        )}
      </Card>
    </>
  );
};

export default Login;
