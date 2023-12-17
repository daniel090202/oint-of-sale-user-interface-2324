import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cn = classNames.bind(styles);

function Menu({ children }) {
    return <nav className={cn("menu-items")}>{children}</nav>;
}

Menu.propsType = {
    children: PropTypes.node.isRequired,
}; 

export default Menu;
