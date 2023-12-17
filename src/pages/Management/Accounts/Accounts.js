import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBoxArchive } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "./Accounts.module.scss";

import config from "../../../config";
import Modal from "../../../components/Modal";

import { Button } from "../../../components/Button";
import { getAllUsers } from "../../../redux/apiRequest";
import { Table, Register } from "../../../layouts/components";

const cn = classNames.bind(styles);

function Accounts() {
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [accounts, setAccounts] = useState({
    type: "account",
    onShow: 3,
    showOptions: true,
    options: [
      {
        to: config.routes.details.accounts,
        option: "details",
      },
      {
        to: config.routes.details.accounts,
        option: "archive",
      },
    ],
    headers: [
      "Full Name",
      "Age",
      "Email address",
      "Address",
      "Gender",
      "Phone",
      "Status",
      "Active",
      "Options",
    ],
    rows: [],
  });

  const allUsers = useSelector((state) => {
    return state.users.users?.allUsers;
  });

  const user = useSelector((state) => {
    return state.auth.login?.currentUser;
  });

  useEffect(() => {
    getAllUsers(user.accessToken, dispatch);
    setAccounts({ ...accounts, rows: allUsers.data });
  }, []);

  const handleCreateAccount = () => {
    setModalOpen(!modalOpen);
  };

  const handleCloseModal = (isOpen) => {
    setModalOpen(isOpen);
  };

  return (
    <Fragment>
      {allUsers.data?.length > 0 && (
        <>
          <div className={cn("wrapper")}>
            <h1 className={cn("title")}>Human Resources</h1>
            <div className={cn("header")}>
              <div className={cn("mr-4")}>
                <span>There are total available:</span>
                <span>{allUsers.data.length}</span>
                <span>staff(s).</span>
              </div>
              <Button
                primary
                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                onClick={() => {
                  handleCreateAccount();
                }}
              >
                Create
              </Button>
              <Button
                primary
                leftIcon={<FontAwesomeIcon icon={faBoxArchive} />}
              >
                <span>Archive</span>
              </Button>
            </div>
            <Table data={accounts} />
          </div>
          <Modal modalOpen={modalOpen}>
            <Register handleCloseModal={handleCloseModal} />
          </Modal>
        </>
      )}
    </Fragment>
  );
}

export default Accounts;
