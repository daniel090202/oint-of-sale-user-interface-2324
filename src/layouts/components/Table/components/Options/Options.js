import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faDeleteLeft,
  faCircleInfo,
  faBoxArchive,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import config from "../../../../../config";

const options = {
  update: {
    title: "Update",
    icon: <FontAwesomeIcon icon={faPenToSquare} />,
  },
  details: {
    to: config.routes.details,
    title: "Details",
    icon: <FontAwesomeIcon icon={faCircleInfo} />,
  },
  archive: {
    title: "Archive",
    icon: <FontAwesomeIcon icon={faBoxArchive} />,
  },
  delete: {
    title: "Delete",
    icon: <FontAwesomeIcon icon={faDeleteLeft} />,
  },
  up: {
    title: "Up",
    icon: <FontAwesomeIcon icon={faArrowUp} />,
  },
  down: {
    title: "Down",
    icon: <FontAwesomeIcon icon={faArrowDown} />,
  },
};

export default options;
