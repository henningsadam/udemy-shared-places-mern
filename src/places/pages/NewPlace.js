import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './PlaceForm.css';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const history = useHistory()

  const placeSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(formState.inputs);
    try {
      await sendRequest(
        'http://localhost:3000/api/places',
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      history.push('/')
    } catch (error) {
      // This is handled by the http-client hook.
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className='place-form' onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id='title'
          element='input'
          type='text'
          label='Title'
          errorText='Please enter a valid title'
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Input
          id='description'
          element='textarea'
          label='Description'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter a longer description'
          onInput={inputHandler}
        />
        <Input
          id='address'
          element='input'
          label='Address'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid address'
          onInput={inputHandler}
        />
        <Button type='submit' disabled={!formState.isValid}>
          Submit
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
