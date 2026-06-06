import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Chip,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  fetchUsers,
  addUser,
  updateUser,
} from "../services/userService";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// ANTI-AUTOFILL CONFIG (IMPORTANT FIX)
const disableAutoFill = {
  autoComplete: "off",
  inputProps: {
    autoComplete: "off",
    spellCheck: false,
  },
};

const UsersPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterGender, setFilterGender] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchFieldName] = useState(() => `users-search-${Math.random().toString(36).slice(2,10)}`);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    contactNumber: "",
    email: "",
    username: "",
    password: "",
    address: "",
    type: "editor",
    isActive: true,
  });

  const getHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  };

  const loadUsers = useCallback(async () => {
  try {
    setLoading(true);

    const { data } = await fetchUsers(
      getHeaders()
    );

    setUsers(
      data.users || data || []
    );
  } catch (error) {
    console.error(
      "Error fetching users:",
      error
    );
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleOpen = () => {
    setIsEditing(false);
    setNewUser({
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      contactNumber: "",
      email: "",
      username: "",
      password: "",
      address: "",
      type: "editor",
      isActive: true,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditUserId(null);
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((u) => u._id === id);
    if (userToEdit) {
      setNewUser({ ...userToEdit, password: "" });
      setEditUserId(id);
      setIsEditing(true);
      setOpen(true);
    }
  };

  const handleToggleActive = async (
  id,
  isActive
) => {
  try {
    await updateUser(
      id,
      { isActive: !isActive },
      getHeaders()
    );

    loadUsers();
  } catch (error) {
    console.error(
      "Error toggling user:",
      error
    );
  }
};

  const handleSaveUser = async () => {
  try {
    if (isEditing) {
      const updatedUser = {
        ...newUser,
      };

      if (!updatedUser.password) {
        delete updatedUser.password;
      }

      await updateUser(
        editUserId,
        updatedUser,
        getHeaders()
      );
    } else {
      await addUser(
        newUser,
        getHeaders()
      );
    }

    await loadUsers();
    handleClose();
  } catch (error) {
    console.error(
      "Error saving user:",
      error.response?.data ||
        error
    );
  }
};

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const filteredUsers = users.filter((user) => {
    const fullName =
      `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();
    const q = searchQuery.toLowerCase();

    const matchesSearch =
      fullName.includes(q) ||
      (user.email || "").toLowerCase().includes(q) ||
      (user.username || "").toLowerCase().includes(q);

    const matchesType = filterType === "all" || user.type === filterType;
    const matchesGender = filterGender === "all" || user.gender === filterGender;
    
    // Check if user is active; if active is not explicitly false, considering it true
    const isActive = user.isActive !== false;
    const matchesStatus = filterStatus === "all" || (filterStatus === "active" ? isActive : !isActive);

    return matchesSearch && matchesType && matchesGender && matchesStatus;
  });

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Stack
        direction="row"
        sx={{
          mb: 5,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ color: '#ffffff' }}>
          Users Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={handleOpen}
        >
          Add User
        </Button>
      </Stack>

      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ position: 'relative', flex: 1, minWidth: '300px' }}>
          <SearchIcon sx={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'text.secondary', pointerEvents: 'none' }} />
          <TextField
            fullWidth
            variant="outlined"
            type="text"
            placeholder="Search users by name, email..."
            value={searchQuery}
            name={searchFieldName}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(0);
            }}
            autoComplete="new-password"
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: '#ffffff',
                borderRadius: 1,
              },
              "& .MuiInputBase-input": {
                pl: 6,
                color: '#000000',
              },
            }}
            slotProps={{
              htmlInput: {
                autoComplete: "new-password",
                autoCorrect: "off",
                autoCapitalize: "off",
                spellCheck: false,
              },
            }}
          />
        </Box>
        <FormControl sx={{ minWidth: 150, backgroundColor: '#ffffff', borderRadius: 1 }}>
          <Select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setPage(0);
            }}
            displayEmpty
            sx={{ color: '#000000' }}
          >
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="editor">Editor</MenuItem>
            <MenuItem value="viewer">Viewer</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150, backgroundColor: '#ffffff', borderRadius: 1 }}>
          <Select
            value={filterGender}
            onChange={(e) => {
              setFilterGender(e.target.value);
              setPage(0);
            }}
            displayEmpty
            sx={{ color: '#000000' }}
          >
            <MenuItem value="all">All Genders</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150, backgroundColor: '#ffffff', borderRadius: 1 }}>
          <Select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setPage(0);
            }}
            displayEmpty
            sx={{ color: '#000000' }}
          >
            <MenuItem value="all">All Statuses</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="disabled">Disabled</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} sx={{ mb: 5, boxShadow: 3, borderRadius: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <Typography>Loading users...</Typography>
                </TableCell>
              </TableRow>
            ) : paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <Typography color="text.secondary">No users found.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>
                    {row.firstName} {row.lastName}
                  </TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    <Chip label={row.type} />
                  </TableCell>
                  <TableCell>{row.contactNumber}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.isActive !== false ? 'Active' : 'Disabled'}
                      color={row.isActive !== false ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <Button variant="contained" size="small" startIcon={<EditIcon />} onClick={() => handleEdit(row._id)}>Edit</Button>
                      <Button variant="contained" size="small" color={row.isActive !== false ? 'error' : 'success'} onClick={() => handleToggleActive(row._id, row.isActive !== false)}>
                        {row.isActive !== false ? 'Disable' : 'Enable'}
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        count={filteredUsers.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            color: '#ffffff',
            '& .MuiTablePagination-selectLabel': { color: '#ffffff' },
            '& .MuiTablePagination-displayedRows': { color: '#ffffff' },
            '& .MuiTablePagination-select': { color: '#ffffff' },
            '& .MuiIconButton-root': { color: '#ffffff' },
          }}
      />

      {/* MODAL */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h5">
            {isEditing ? "Edit User" : "Add User"}
          </Typography>

          {/* ✅ IMPORTANT: extra protection */}
          <form autoComplete="off">
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField
                label="First Name"
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
                {...disableAutoFill}
              />

              <TextField
                label="Last Name"
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
                {...disableAutoFill}
              />

              <TextField
                label="Age"
                type="number"
                value={newUser.age}
                onChange={(e) =>
                  setNewUser({ ...newUser, age: e.target.value })
                }
                {...disableAutoFill}
              />

              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={newUser.gender}
                  onChange={(e) =>
                    setNewUser({ ...newUser, gender: e.target.value })
                  }
                  IconComponent={ExpandMoreIcon}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Contact Number"
                value={newUser.contactNumber}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    contactNumber: e.target.value,
                  })
                }
                {...disableAutoFill}
              />

              <TextField
                label="Address"
                value={newUser.address}
                onChange={(e) =>
                  setNewUser({ ...newUser, address: e.target.value })
                }
                {...disableAutoFill}
              />

              <TextField
                label="Email"
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                {...disableAutoFill}
              />

              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={newUser.type}
                  onChange={(e) =>
                    setNewUser({ ...newUser, type: e.target.value })
                  }
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="editor">Editor</MenuItem>
                  <MenuItem value="viewer">Viewer</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Username"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                autoComplete="off"
                inputProps={{
                  autoComplete: "off",
                  name: "random-user-field",
                }}
              />

              <TextField
                label="Password"
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                autoComplete="new-password"
                inputProps={{
                  autoComplete: "new-password",
                  name: "random-pass-field",
                }}
              />

              <Stack direction="row" spacing={2}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSaveUser}>
                  {isEditing ? "Save" : "Add"}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default UsersPage;