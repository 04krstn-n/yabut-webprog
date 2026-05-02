import React from "react";
import { Typography, Card, CardContent, Chip } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { DataGrid } from "@mui/x-data-grid";

const orders = [
  { id: 1, customer: "Jon Snow", product: "Resume Template", category: "Templates", price: 199, status: "Completed" },
  { id: 2, customer: "Cersei Lannister", product: "Brand Kit", category: "Branding", price: 499, status: "Completed" },
  { id: 3, customer: "Arya Stark", product: "Social Media Pack", category: "Graphics", price: 299, status: "Pending" },
  { id: 4, customer: "Daenerys Targaryen", product: "Portfolio Layout", category: "Templates", price: 399, status: "Completed" },
  { id: 5, customer: "Jaime Lannister", product: "Icon Bundle", category: "Graphics", price: 149, status: "Completed" },
];

const columns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "customer", headerName: "Customer", width: 180 },
  { field: "product", headerName: "Product", width: 210 },
  { field: "category", headerName: "Category", width: 140 },
  {
    field: "price",
    headerName: "Price",
    width: 120,
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

function DashboardPage() {
  const totalSales = orders.reduce((sum, order) => sum + order.price, 0);

  return (
    <Box
      sx={{
        bgcolor: "#0f172a",
        color: "#f8fafc",
        borderRadius: "24px",
        p: 3,
        minHeight: "100%",
      }}
    >
      <Box
        sx={{
          mb: 4,
          p: 3,
          borderRadius: "24px",
          background:
            "linear-gradient(135deg, #111827 0%, #1e293b 55%, #334155 100%)",
          boxShadow: "0 20px 45px rgba(0,0,0,0.25)",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          Draft & Drift Dashboard
        </Typography>

        <Typography sx={{ color: "#cbd5e1", mt: 1 }}>
          Digital product sales, downloads, and customer activity overview.
        </Typography>
      </Box>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 4 }}>
        <StatCard title="Total Sales" value={`₱${totalSales}`} subtitle="+12% this month" />
        <StatCard title="Total Orders" value={orders.length} subtitle="5 recent purchases" />
        <StatCard title="Downloads" value="128" subtitle="+24 new downloads" />
        <StatCard title="Conversion Rate" value="8.4%" subtitle="Strong performance" />
      </Stack>

      <Stack direction={{ xs: "column", lg: "row" }} spacing={3} sx={{ mb: 4 }}>
        <Box
          sx={{
            flex: 2,
            bgcolor: "#f8fafc",
            color: "#0f172a",
            borderRadius: "24px",
            p: 3,
            boxShadow: "0 12px 35px rgba(0,0,0,0.22)",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
            Monthly Sales Summary
          </Typography>

          <BarChart
            series={[
              { data: [1200, 1800, 1500, 2200], label: "Sales" },
              { data: [8, 12, 10, 15], label: "Orders" },
            ]}
            xAxis={[
              {
                data: ["Jan", "Feb", "Mar", "Apr"],
                scaleType: "band",
              },
            ]}
            height={320}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            bgcolor: "#f8fafc",
            color: "#0f172a",
            borderRadius: "24px",
            p: 3,
            boxShadow: "0 12px 35px rgba(0,0,0,0.22)",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
            Product Categories
          </Typography>

          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 45, label: "Templates" },
                  { id: 1, value: 30, label: "Graphics" },
                  { id: 2, value: 25, label: "Branding" },
                ],
                arcLabel: (item) => `${item.value}%`,
              },
            ]}
            width={300}
            height={300}
            slotProps={{
              legend: { hidden: true },
            }}
          />
        </Box>
      </Stack>

      <Box
        sx={{
          bgcolor: "#f8fafc",
          color: "#0f172a",
          borderRadius: "24px",
          p: 3,
          mb: 4,
          boxShadow: "0 12px 35px rgba(0,0,0,0.22)",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
          Website Visits and Downloads
        </Typography>

        <LineChart
          xAxis={[
            {
              data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              scaleType: "point",
            },
          ]}
          series={[
            {
              data: [20, 45, 35, 70, 60, 90, 120],
              label: "Visits",
            },
            {
              data: [5, 12, 9, 18, 15, 24, 32],
              label: "Downloads",
            },
          ]}
          height={320}
        />
      </Box>

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
          Recent Digital Product Orders
        </Typography>

        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={orders}
            columns={columns}
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

export default DashboardPage;