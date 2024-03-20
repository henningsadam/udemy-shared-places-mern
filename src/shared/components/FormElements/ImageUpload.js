import React, { useRef, useState, useEffect } from 'react';

import './ImageUpload.css';
import Button from './Button';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [isValid, setIsValid] = useState(false);
  const [previewUrl, setPreviewUrl] = useState();

  const filePickerRef = useRef();

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid; // Using this given it is used in later in the function and state is scheduled to be updated
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  return (
    <div className='form-control'>
      <input
        type='file'
        ref={filePickerRef}
        style={{ display: 'none' }}
        name={props.name}
        id={props.id}
        onChange={pickedHandler}
        accept='.jpg,.png,.jpeg'
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className='image-upload__preview'>
          {previewUrl ? (
            <img src={previewUrl} alt='Preview' />
          ) : (
            <p>Please pick an image.</p>
          )}
        </div>
        <Button type='button' onClick={pickImageHandler}>
          Pick Image
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
