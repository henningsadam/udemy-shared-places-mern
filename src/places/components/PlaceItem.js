import React, { useContext, useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import './PlaceItem.css';
import { AuthContext } from '../../shared/context/auth-context';

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const auth = useContext(AuthContext);

  const toggleShowMap = () => {
    setShowMap(!showMap);
  };

  const toggleShowConfirmModal = () => {
    setShowConfirmModal(!showConfirmModal);
  };

  const confirmDeleteHandler = () => {
    console.log('Deleting place...');
    setShowConfirmModal(false);
  };

  return (
    <>
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
          <div className='place-item__image'>
            <img src={props.image} alt={props.title} />
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
            {auth.isLoggedIn && (
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
