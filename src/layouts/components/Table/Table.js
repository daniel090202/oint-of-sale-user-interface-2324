import { Header, Row } from "./components";
import { Pagination } from "../../../components/Pagination";

import React, { useState, useMemo } from "react";

import classNames from "classnames/bind";
import styles from "./Table.module.scss";

const cn = classNames.bind(styles);

let PageSize = 10;

function Table({ data }) {
  const rows = data.rows;
  const type = data.type;
  const headers = data.headers;
  const options = data.options;
  const showOptions = data.showOptions;

  PageSize = data.onShow || PageSize;

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    return rows.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, rows]);

  return (
    <div>
      <table className={cn("table")}>
        <tbody>
          <tr>
            <Header data={headers} />
          </tr>
          <Row
            type={type}
            headers={headers}
            options={options}
            data={currentTableData}
            showOptions={showOptions}
          />
        </tbody>
      </table>

      <Pagination
        className={cn("pagination")}
        currentPage={currentPage}
        totalCount={rows.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default Table;
