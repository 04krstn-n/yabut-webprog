import React from "react";
import { Typography, Card, CardContent, Chip } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "customer", headerName: "Customer", width: 180, editable: true },
  { field: "email", headerName: "Email", width: 230, editable: true },
  { field: "product", headerName: "Purchased Product", width: 210, editable: true },
  { field: "category", headerName: "Category", width: 140, editable: true },
  {
    field: "totalSpent",
    headerName: "Total Spent",
    width: 130,
    type: "number",
    valueFormatter: (value) => `₱${value}`,
  },
  {
    field: "status",
    headerName: "Status",
    width: 140,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        sx={{
          fontWeight: 800,
          color: params.value === "Completed" ? "#052e16" : "#451a03",
          bgcolor: params.value === "Completed" ? "#86efac" : "#fcd34d",
        }}
      />
    ),
  },
];

const rows = [
  {
    id: 1,
    customer: "Jon Snow",
    email: "jon@example.com",
    product: "Resume Template",
    category: "Templates",
    totalSpent: 199,
    status: "Completed",
  },
  {
    id: 2,
    customer: "Cersei Lannister",
    email: "cersei@example.com",
    product: "Brand Kit",
    category: "Branding",
    totalSpent: 499,
    status: "Completed",
  },
  {
    id: 3,
    customer: "Arya Stark",
    email: "arya@example.com",
    product: "Social Media Pack",
    category: "Graphics",
    totalSpent: 299,
    status: "Pending",
  },
  {
    id: 4,
    customer: "Daenerys Targaryen",
    email: "daenerys@example.com",
    product: "Portfolio Layout",
    category: "Templates",
    totalSpent: 399,
    status: "Completed",
  },
  {
    id: 5,
    customer: "Jaime Lannister",
    email: "jaime@example.com",
    product: "Icon Bundle",
    category: "Graphics",
    totalSpent: 149,
    status: "Completed",
  },
];

const StatCard = ({ title, value, subtitle }) => (
  <Card
    sx={{
      flex: 1,
      minWidth: 180,
      bgcolor: "#111827",
      color: "#f8fafc",
      borderRadius: "22px",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 14px 30px rgba(0,0,0,0.25)",
    }}
  >
    <CardContent>
      <Typography sx={{ color: "#93c5fd", fontWeight: 800, fontSize: 14 }}>
        {title}
      </Typography>

      <Typography variant="h4" sx={{ fontWeight: 900, mt: 1 }}>
        {value}
      </Typography>

      <Typography sx={{ color: "#e6c27a", fontWeight: 800, fontSize: 13, mt: 1 }}>
        {subtitle}
      </Typography>
    </CardContent>
  </Card>
);

function UsersPage() {
  const totalCustomers = rows.length;
  const completedOrders = rows.filter((row) => row.status === "Completed").length;
  const pendingOrders = rows.filter((row) => row.status === "Pending").length;
  const totalRevenue = rows.reduce((sum, row) => sum + row.totalSpent, 0);

  return (
    <Box sx={{ bgcolor: "#0f172a", color: "#f8fafc", borderRadius: "24px", p: 3 }}>
      <Box
        sx={{
          mb: 4,
          p: 3,
          borderRadius: "24px",
          background: "linear-gradient(135deg, #111827 0%, #1e293b 55%, #334155 100%)",
          boxShadow: "0 20px 45px rgba(0,0,0,0.25)",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          Customers
        </Typography>

        <Typography sx={{ color: "#cbd5e1", mt: 1 }}>
          Customer and purchase records for Draft & Drift.
        </Typography>
      </Box>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 4 }}>
        <StatCard title="Total Customers" value={totalCustomers} subtitle="Active buyers" />
        <StatCard title="Completed Orders" value={completedOrders} subtitle="Successfully paid" />
        <StatCard title="Pending Orders" value={pendingOrders} subtitle="Needs follow-up" />
        <StatCard title="Total Revenue" value={`₱${totalRevenue}`} subtitle="From listed orders" />
      </Stack>

      <Box
        sx={{
          bgcolor: "#f8fafc",
          color: "#0f172a",
          borderRadius: "24px",
          p: 3,
          boxShadow: "0 12px 35px rgba(0,0,0,0.22)",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 900, mb: 2 }}>
          Customer Orders
        </Typography>

        <Box sx={{ height: 430, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "#e2e8f0",
                fontWeight: 900,
              },
              "& .MuiDataGrid-row:hover": {
                bgcolor: "#f1f5f9",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default UsersPage;