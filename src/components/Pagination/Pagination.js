import React from 'react';
import { usePagination, DOTS } from '../Hooks/usePagination';

import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';

const cn = classNames.bind(styles);

function Pagination({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className }) {
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul className={cn('pagination-container', { [className]: className })}>
            <li
                className={cn('pagination-item', {
                    disabled: currentPage === 1,
                })}
                onClick={onPrevious}
                onKeyDown={onPrevious}
            >
                <div className={cn('arrow left')} />
            </li>
            {paginationRange.map((pageNumber) => {
                if (pageNumber === DOTS) {
                    return (
                        <li key={pageNumber} className={cn('pagination-item dots')}>
                            &#8230;
                        </li>
                    );
                }

                return (
                    <li
                        key={pageNumber}
                        className={cn('pagination-item', {
                            selected: pageNumber === currentPage,
                        })}
                        onClick={() => onPageChange(pageNumber)}
                        onKeyDown={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={cn('pagination-item', {
                    disabled: currentPage === lastPage,
                })}
                onClick={onNext}
                onKeyDown={onNext}
            >
                <div className={cn('arrow right')} />
            </li>
        </ul>
    );
}

export default Pagination;
