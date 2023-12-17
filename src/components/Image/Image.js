import PropTypes from 'prop-types';

import { useState, forwardRef } from 'react';

import classNames from 'classnames/bind';
import styles from './Image.module.scss';

import images from '../../assets/images';

const cn = classNames.bind(styles);

const Image = forwardRef(({ src, alt, fallback = images.noImage, className, ...props }, ref) => {
    const [fallBack, setFallBack] = useState('');

    const handleError = () => {
        setFallBack(fallback);
    };

    return (
        <img
            className={cn('wrapper', className)}
            ref={ref}
            src={fallBack || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    fallback: PropTypes.string,
    className: PropTypes.string,
};
export default Image;
