import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import styles from './Modal.module.scss'
const Modal = ({onCloseModal, onAgree}) => {
    return (
        <>
        <div className={styles.Background} 
             onClick={onCloseModal}
            >
        </div>
        <div className={styles.Modal}>
            <span>
                <FontAwesomeIcon icon={faTimes} onClick={onCloseModal} />
            </span>
            <h1>Are you sure?</h1>
            <button className="Btn" 
                    onClick={onAgree}
                    >
                Yes
            </button>
        </div>
        </>
    );
}

export default Modal;
