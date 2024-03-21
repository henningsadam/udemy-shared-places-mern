import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import './PlaceItem.css';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const PlaceItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const auth = useContext(AuthContext);

  const toggleShowMap = () => {
    setShowMap(!showMap);
  };

  const toggleShowConfirmModal = () => {
    setShowConfirmModal(!showConfirmModal);
  };

  const confirmDeleteHandler = async () => {
    try {
      setShowConfirmModal(false);
      await sendRequest(
        `http://localhost:3000/api/places/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );
      history.push('/');
      props.onDelete(props.id);
    } catch (error) {
      // This is handled by the http-client hook.
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={toggleShowMap}
        header={props.address}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={<Button onClick={toggleShowMap}>Close</Button>}
      >
        <div className='map-container'>
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        header='Are you sure?'
        show={showConfirmModal}
        onCancel={toggleShowConfirmModal}
        footerClass='place-item__modal-actions'
        footer={
          <>
            <Button inverse onClick={toggleShowConfirmModal}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </>
        }
      >
        <p>Do you want to proceed?</p>
      </Modal>
      <li className='place-item'>
        <Card className='place-item__content'>
          {isLoading && (
            <div className='center'>
              <LoadingSpinner asOverlay />
            </div>
          )}
          <div className='place-item__image'>
            <img
              src={`http://localhost:3000/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className='place-item__info'>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className='place-item__actions'>
            <Button inverse onClick={toggleShowMap}>
              View
            </Button>
            {auth.userId === props.creatorId && (
              <>
                <Button to={`/places/${props.id}`}>Edit</Button>
                <Button danger onClick={toggleShowConfirmModal}>
                  Delete
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
