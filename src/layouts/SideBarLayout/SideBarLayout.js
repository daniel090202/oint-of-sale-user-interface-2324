import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './SideBarLayout.module.scss';
import Header from '../../layouts/components/Header';
import SideBar from '../components/SideBar';

const cn = classNames.bind(styles);

function SideBarLayout({ sideBarRoutes, children }) {
    return (
        <div className={cn('wrapper')}>
            <Header />
            <div className={cn('container')}>
                <SideBar data={sideBarRoutes} />
                <div className={cn('content')}>{children}</div>
            </div>
        </div>
    );
}

SideBarLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default SideBarLayout;
