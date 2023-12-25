import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTables";
import Axios from "axios";
import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    Axios.get("http://localhost:3001/api/user")
      .then((response) => {
        setUsers(response.data.response);
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });
  };

  const addUser = (data) => {
    setSubmitted(true);
    const payload = {
      id: data.id,
      name: data.name,
    };

    Axios.post("http://localhost:3001/api/createuser", payload)
      .then(() => {
        getUsers();
        setSubmitted(false);
        isEdit(false);
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });
  };

  const updateUser = (data) => {
    setSubmitted(true);

    const payload = {
      id: data.id,
      name: data.name,
    };

    Axios.post("http://localhost:3001/api/updateuser", payload)
      .then(() => {
        getUsers();
        setSubmitted(false);
        isEdit(true);
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });

    setIsEdit(false);
  };

  const deleteUser = (data) => {
    Axios.post("http://localhost:3001/api/deleteuser", data)
      .then(() => {
        getUsers();
      })
      .catch((error) => {
        console.error("Axios Error : ", error);
      });
  };

  return (
    <Box
      sx={{
        width: "calc(100% -100px)",
        margin: "auto",
        marginTop: "100px",
        marginLeft: "30px",
        marginRight: "30px",
      }}
    >
      <UserForm
        addUser={addUser}
        submitted={submitted}
        updateUser={updateUser}
        data={selectedUser}
        isEdit={isEdit}
      />

      <UsersTable
        rows={users}
        selectedUser={(data) => {
          setSelectedUser(data);
          setIsEdit(true);
        }}
        deleteUser={(data) => {
          window.confirm("Are you sure?") && deleteUser(data);
        }}
      />
    </Box>
  );
};

export default Users;
