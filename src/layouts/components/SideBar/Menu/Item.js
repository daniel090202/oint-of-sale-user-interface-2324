import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cn = classNames.bind(styles);

function Item({ title, to, icon, activeIcon }) {
    return (
        <NavLink to={to} className={(classes) => cn('menu-item', { active: classes.isActive })}>
            <span className={cn('icon')}>{icon}</span>
            <span className={cn('active-icon')}>{activeIcon}</span>
            <span className={cn('title')}>{title}</span>
        </NavLink>
    );
}

Item.propsType = {
    titles: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
};

export default Item;
