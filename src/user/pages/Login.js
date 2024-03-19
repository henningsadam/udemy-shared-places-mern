import React, { useState, useContext } from 'react';
import { useForm } from '../../shared/hooks/form-hook';

import './LoginForm.css';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/auth-context';

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
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
    setIsLoading(true);

    if (isLoginMode) {
      try {
        const response = await fetch('http://localhost:3000/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.login();
      } catch (error) {
        console.log(error);
        setError(error.message || 'Something went wrong.');
        setIsLoading(false);
      }
    } else {
      try {
        const response = await fetch('http://localhost:3000/api/users/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.login();
      } catch (error) {
        console.log(error);
        setError(error.message || 'Something went wrong.');
        setIsLoading(false);
      }
    }
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
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
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
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
            validators={[VALIDATOR_MINLENGTH(5)]}
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
