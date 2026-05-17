import { useState, useMemo } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import usersSeed from "../../assets/users.json?raw";

const roles = ["admin", "editor", "viewer"];
const genders = ["male", "female", "other"];

const blankForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  role: "editor",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : "";

const loadUsers = () => {
  try {
    return {
      users: JSON.parse(usersSeed).map((user, index) => ({
        id: Number(user.id) || index + 1,
        firstName: String(user.firstName ?? "").trim(),
        lastName: String(user.lastName ?? "").trim(),
        age: String(user.age ?? "").trim(),
        gender: genders.includes(
          String(user.gender ?? "")
            .trim()
            .toLowerCase(),
        )
          ? String(user.gender ?? "")
              .trim()
              .toLowerCase()
          : "",
        contactNumber: String(user.contactNumber ?? "").trim(),
        email: String(user.email ?? "")
          .trim()
          .toLowerCase(),
        role: roles.includes(
          String(user.role ?? "")
            .trim()
            .toLowerCase(),
        )
          ? String(user.role ?? "")
              .trim()
              .toLowerCase()
          : "editor",
        username: String(user.username ?? "")
          .trim()
          .toLowerCase(),
        password: String(user.password ?? ""),
        address: String(user.address ?? "").trim(),
        isActive: typeof user.isActive === "boolean" ? user.isActive : true,
      })),
      error: "",
    };
  } catch {
    return { users: [], error: "Unable to read users." };
  }
};

const seed = loadUsers();

const UsersPage = () => {
  const theme = useTheme();
  // eslint-disable-next-line no-unused-vars
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [users, setUsers] = useState(seed.users);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterGender] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = [
        user.firstName,
        user.lastName,
        user.email,
        user.username,
      ].some((field) =>
        field.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      const matchesRole = filterRole === "all" || user.role === filterRole;
      const matchesGender =
        filterGender === "all" || user.gender === filterGender;
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "active" ? user.isActive : !user.isActive);

      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [users, searchQuery, filterRole, filterGender, filterStatus]);

  const resetForm = () => {
    setForm(blankForm);
    setErrors({});
  };

  const openModal = (user) => {
    setModal({ open: true, id: user?.id || null });
    setForm(user ? { ...blankForm, ...user } : { ...blankForm });
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    const email = form.email.trim().toLowerCase();
    const username = form.username.trim();

    [
      ["firstName", "First name"],
      ["lastName", "Last name"],
      ["age", "Age"],
      ["gender", "Gender"],
      ["contactNumber", "Contact number"],
      ["email", "Email"],
      ["role", "Role"],
      ["username", "Username"],
      ["password", "Password"],
      ["address", "Address"],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) nextErrors[key] = `${label} is required.`;
    });

    if (!nextErrors.password && form.password.length < 8)
      nextErrors.password = "Password must be at least 8 characters.";
    if (!nextErrors.contactNumber && !/^\d{11}$/.test(form.contactNumber))
      nextErrors.contactNumber = "Contact number must be exactly 11 digits.";
    if (!nextErrors.age && isNaN(form.age))
      nextErrors.age = "Age must be a number only.";
    if (!nextErrors.username && /\s/.test(username))
      nextErrors.username = "Username must not contain spaces.";
    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = "Enter a valid email address.";

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const newUser = {
      ...form,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
    };

    setUsers((prev) =>
      modal.id
        ? prev.map((u) => (u.id === modal.id ? { ...u, ...newUser } : u))
        : [
            ...prev,
            {
              id:
                prev.reduce((max, u) => Math.max(Number(u.id) || 0, max), 0) +
                1,
              ...newUser,
            },
          ],
    );
    closeModal();
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u)),
    );
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      minWidth: 150,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
      renderCell: (params) => (
        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
          {params.value}
        </Typography>
      ),
    },
    { field: "username", headerName: "Username", width: 130 },
    {
      field: "role",
      headerName: "Role",
      width: 120,
      renderCell: ({ row }) => (
        <Chip
          label={labelize(row.role)}
          size="small"
          sx={{ fontWeight: 800, bgcolor: "#f1f5f9", color: "#334155" }}
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? "Active" : "Inactive"}
          color={row.isActive ? "success" : "default"}
          sx={{ fontWeight: 800 }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => openModal(row)}
            sx={{ borderRadius: "8px", fontWeight: 700 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            size="small"
            color={row.isActive ? "warning" : "success"}
            onClick={() => toggleStatus(row.id)}
            sx={{ borderRadius: "8px", fontWeight: 700 }}
          >
            {row.isActive ? "Disable" : "Activate"}
          </Button>
        </Stack>
      ),
    },
  ];

  const premiumCardStyle = {
    p: 3,
    borderRadius: "24px",
    bgcolor: "#f8fafc",
    boxShadow: "0 12px 35px rgba(0,0,0,0.22)",
  };

  return (
    <Box sx={{ width: "100%", color: "#f8fafc" }}>
      <Box
        sx={{
          mb: 4,
          p: 4,
          borderRadius: "24px",
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          boxShadow: "0 20px 45px rgba(0,0,0,0.3)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h3"
            sx={{ fontWeight: 900, letterSpacing: "-1px" }}
          >
            User Management
          </Typography>
          <Typography sx={{ color: "#94a3b8", mt: 1, fontWeight: 500 }}>
            Review, filter, and manage your Draft & Drift team members.
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => openModal()}
          startIcon={<AddIcon />}
          sx={{
            bgcolor: "#e6c27a",
            color: "#0f172a",
            fontWeight: 900,
            px: 4,
            py: 1.5,
            borderRadius: "12px",
            "&:hover": { bgcolor: "#f6d98f" },
          }}
        >
          Add User
        </Button>
      </Box>

      <Paper sx={{ ...premiumCardStyle, mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 900,
            color: "#0f172a",
            mb: 2,
            textTransform: "uppercase",
            fontSize: "14px",
            letterSpacing: "1px",
          }}
        >
          Quick Filters
        </Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField
            placeholder="Search by name, email, or username..."
            size="small"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ color: "action.active", mr: 1 }} />
              ),
              sx: { borderRadius: "12px", bgcolor: "#ffffff" },
            }}
          />
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={filterRole}
              label="Role"
              onChange={(e) => setFilterRole(e.target.value)}
              sx={{ borderRadius: "12px", bgcolor: "#ffffff" }}
            >
              <MenuItem value="all">All Roles</MenuItem>
              {roles.map((r) => (
                <MenuItem key={r} value={r}>
                  {labelize(r)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              label="Status"
              onChange={(e) => setFilterStatus(e.target.value)}
              sx={{ borderRadius: "12px", bgcolor: "#ffffff" }}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      <Paper sx={{ ...premiumCardStyle, height: 600, p: 2 }}>
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          sx={{
            border: "none",
            "& .MuiDataGrid-cell": { borderBottom: "1px solid #f1f5f9" },
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "#f8fafc",
              color: "#64748b",
              fontWeight: 900,
              textTransform: "uppercase",
              fontSize: "12px",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #f1f5f9",
            },
          }}
        />
      </Paper>

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { borderRadius: "24px" } }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontWeight: 900, fontSize: "24px", pt: 3 }}>
            {modal.id ? "Edit System User" : "Register New User"}
          </DialogTitle>
          <DialogContent dividers sx={{ borderTop: "1px solid #f1f5f9" }}>
            <Stack spacing={2} sx={{ pt: 2 }}>
              <Stack direction="row" spacing={2}>
                <TextField {...fieldProps("firstName", "First Name")} />
                <TextField {...fieldProps("lastName", "Last Name")} />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField {...fieldProps("age", "Age")} />
                <TextField
                  {...fieldProps("gender", "Gender", { select: true })}
                >
                  {genders.map((g) => (
                    <MenuItem key={g} value={g}>
                      {labelize(g)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField {...fieldProps("contactNumber", "Contact Number")} />
                <TextField {...fieldProps("email", "Email Address")} />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField {...fieldProps("role", "Role", { select: true })}>
                  {roles.map((r) => (
                    <MenuItem key={r} value={r}>
                      {labelize(r)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps("username", "Username")} />
              </Stack>
              <TextField
                {...fieldProps("password", "Password", {
                  type: showPassword ? "text" : "password",
                })}
              />
              <TextField
                {...fieldProps("address", "Address", {
                  multiline: true,
                  rows: 2,
                })}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={form.isActive}
                    name="isActive"
                    onChange={handleChange}
                  />
                }
                label="Set as Active Account"
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={closeModal}
              sx={{ fontWeight: 700, color: "#64748b" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#0f172a",
                fontWeight: 900,
                px: 4,
                borderRadius: "10px",
              }}
            >
              {modal.id ? "Update User" : "Save User"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
