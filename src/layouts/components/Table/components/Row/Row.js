import Options from "../Options";
import { Button } from "../../../../../components/Button";

import { useNavigate } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./Row.module.scss";

const cn = classNames.bind(styles);

function Row({ type, data, options, showOptions }) {
  const navigate = useNavigate();
  const handleClick = (to, handleIncreaseAmount, type, row) => {
    if (handleIncreaseAmount) {
      handleIncreaseAmount(row, data);
    }

    navigate(to, { state: { data: row, type: type } });
  };

  const renderRowContent = (row) => {
    delete row.year;
    delete row.weight;
    delete row.brand;

    const tdLists = [];

    for (const element in row) {
      tdLists.push(
        <td className={cn("row")} key={element}>
          {row[element]}
        </td>
      );
    }

    return tdLists;
  };

  return data.map((row, index) => {
    const detailsData = { ...row };

    return (
      <tr className={cn("row")} key={index}>
        {renderRowContent(row)}

        {showOptions === true && (
          <td className={cn("options")}>
            {options.map((option) => {
              return (
                <div key={option.option} className={cn("my-2")}>
                  <Button
                    primary
                    key={option.option}
                    leftIcon={Options[option.option].icon}
                    onClick={() =>
                      handleClick(option.to, option.onClick, type, detailsData)
                    }
                  >
                    {Options[option.option].title}
                  </Button>
                </div>
              );
            })}
          </td>
        )}
      </tr>
    );
  });
}

export default Row;
