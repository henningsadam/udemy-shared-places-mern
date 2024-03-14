import React, { useState, useContext } from 'react';
import { useForm } from '../../shared/hooks/form-hook';

import './LoginForm.css';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/auth-context';

const Login = () => {
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
  const auth = useContext(AuthContext)

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      auth.login()
      console.log('User logged in');
    } else {
      console.log('Signing up...');
    }
    console.log(formState.inputs);
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

  return (
    <Card className='login-form'>
      {isLoginMode ? <h2>Login</h2> : <h2>Register</h2>}
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
      <form onSubmit={loginSubmitHandler}>
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
  );
};

export default Login;
