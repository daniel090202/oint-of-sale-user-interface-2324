import React from 'react';

import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

const cn = classNames.bind(styles);

function Modal({ modalOpen, children }) {
    let isShow = 'modal--disabled';

    if (modalOpen) {
        isShow = 'modal--active';
    }

    return (
        <div className={cn('modal', isShow)}>
            <div className={cn('modal__overlay')}></div>
            <div className={cn('modal__body')}>{children}</div>
        </div>
    );
}

export default Modal;
