import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cn = classNames.bind(styles);

function Header({ data }) {
    return data.map((header, index) => {
        return (
            <th className={cn('table-header')} key={index}>
                {header}
            </th>
        );
    });
}

export default Header;
