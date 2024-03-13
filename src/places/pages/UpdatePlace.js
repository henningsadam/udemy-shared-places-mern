import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import './PlaceForm.css';
import { useForm } from '../../shared/hooks/form-hook';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire St Building',
    description:
      'Iconic, art deco office tower from 1931 with exhibits & observatories on the 86th & 102nd floors.',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipNAG7iptYkmXdRODIfH30UToKMxcwIycF8ou5RI=w408-h292-k-no',
    address: '20 W 34th St., New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: 'u1',
  },
  {
    id: 'p1',
    title: 'Empire St Building',
    description:
      'Iconic, art deco office tower from 1931 with exhibits & observatories on the 86th & 102nd floors.',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipNAG7iptYkmXdRODIfH30UToKMxcwIycF8ou5RI=w408-h292-k-no',
    address: '20 W 34th St., New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: 'u2',
  },
];

const UpdatePlace = (props) => {
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    if (place) {
      setFormData(
        {
          title: {
            value: place.title,
            isValid: true,
          },
          description: {
            value: place.description,
            isValid: true,
          },
        },
        true
      );
    }
  }, [setFormData, place]);

  const placeUpdateSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  if (!place) {
    return (
      <div className='center'>
        <Card>
          <h2>No place found</h2>
        </Card>
      </div>
    );
  }
  return (
    formState.inputs.title.value && (
      <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
        <Input
          id='title'
          element='input'
          type='text'
          title='Title'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid title'
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialValid={formState.inputs.title.isValid}
        />
        <Input
          id='description'
          element='textarea'
          title='Description'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter a valid description (more than 5 characters)'
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialValid={formState.inputs.description.isValid}
        />
        <Button type='submit' disabled={!formState.isValid}>
          Update Place
        </Button>
      </form>
    )
  );
};

export default UpdatePlace;
