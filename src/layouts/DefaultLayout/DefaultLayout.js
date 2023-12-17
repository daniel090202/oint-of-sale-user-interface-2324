import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '../../layouts/components/Header';

const cn = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cn('wrapper')}>
            <Header />
            <div className={cn('container')}>
                <div className={cn('content')}>{children}</div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;
