import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  setCurrentProductId,
  updateProductById,
} from "../redux/product/productSlice";
import {
  addUser,
  setCurrentUserId,
  setUserDetail,
  updateUserById,
} from "../redux/user/userSlice";

export default function UserForm(props) {
  // lấy ra currentUserId tại state init slice( userSlice)
  const currentUserId = useSelector((state) => state.user.currentUserId);

  const userDetail = useSelector((state) => state.user.userDetail);

  const [userFormData, setUserFormData] = useState({
    id: currentUserId ? currentUserId : "",
    name: "",
    email: "",
    age: "",
    phone: "",
    access: "User",
  });

  const [open, setOpen] = useState(props.open);
  const [isUserUpdate, setIsUserUpdate] = useState(false);
  const [originalFormData, setOriginalFormData] = useState({ ...userFormData });

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUserId) {
      dispatch(setUserDetail());
    } else {
      setUserFormData({
        id: "",
        name: "",
        email: "",
        age: "",
        phone: "",
        access: "",
      });
      setOriginalFormData({
        id: "",
        name: "",
        email: "",
        age: "",
        phone: "",
        access: "",
      });
    }
    setIsUserUpdate(false);
  }, [currentUserId]);

  useEffect(() => {
    if (userDetail) {
      setUserFormData({
        id: userDetail.id,
        name: userDetail.name,
        email: userDetail.email,
        age: userDetail.age,
        phone: userDetail.phone,
        access: userDetail.access,
      });
      setOriginalFormData({
        id: userDetail.id,
        name: userDetail.name,
        email: userDetail.email,
        age: userDetail.age,
        phone: userDetail.phone,
        access: userDetail.access,
      });
    }
  }, [userDetail]);

  const handleClose = () => {
    props.handleClose();
    dispatch(setCurrentUserId({ currentUserId: null }));
  };

  const handleAddUser = () => {
    const user = { ...userFormData };
    dispatch(addUser({ addedUser: user }));
    setUserFormData({
      id: "",
      name: "",
      email: "",
      age: "",
      phone: "",
      access: "",
    });
    props.handleClose();
  };

  useEffect(() => {
    setIsUserUpdate(false);
  }, [open]);

  const handleUpdateUser = () => {
    const updatedUser = {
      id: userFormData.id,
      name: userFormData.name,
      email: userFormData.email,
      age: userFormData.age,
      phone: userFormData.phone,
      access: userFormData.access,
    };
    // truyen vao gia tri Id de thay doi
    dispatch(updateUserById({ updatedUser }));
    props.handleClose();
  };

  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    if (userFormData.id) {
      handleUpdateUser(userFormData);
    } else {
      handleAddUser();
    }
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>
        {userFormData.id ? "Edit User " : "Create User"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          fullWidth
          label="name"
          name="name"
          value={userFormData.name}
          onChange={(e) =>
            setUserFormData({ ...userFormData, name: e.target.value })
          }
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          fullWidth
          label="email"
          name="email"
          value={userFormData.email}
          onChange={(e) =>
            setUserFormData({ ...userFormData, email: e.target.value })
          }
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          fullWidth
          label="age"
          name="age"
          value={userFormData.age}
          onChange={(e) =>
            setUserFormData({ ...userFormData, age: e.target.value })
          }
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          fullWidth
          label="phone"
          name="phone"
          value={userFormData.phone}
          onChange={(e) =>
            setUserFormData({ ...userFormData, phone: e.target.value })
          }
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          fullWidth
          label="access"
          name="access"
          value={userFormData.access}
          disabled
          onChange={(e) =>
            setUserFormData({ ...userFormData, access: e.target.value })
          }
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>
          {userFormData.id ? "Save Changes" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
