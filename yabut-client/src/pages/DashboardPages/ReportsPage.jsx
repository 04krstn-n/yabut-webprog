import React from "react";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";

function ReportsPage() {
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
          Sales Reports
        </Typography>

        <Typography sx={{ color: "#cbd5e1", mt: 1 }}>
          Performance summary for Draft & Drift digital products.
        </Typography>
      </Box>

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
            Monthly Revenue and Orders
          </Typography>

          <BarChart
            series={[
              { data: [1200, 1800, 1500, 2200], label: "Revenue" },
              { data: [8, 12, 10, 15], label: "Orders" },
            ]}
            height={320}
            xAxis={[
              {
                data: ["Jan", "Feb", "Mar", "Apr"],
                scaleType: "band",
              },
            ]}
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
            Sales by Category
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
          boxShadow: "0 12px 35px rgba(0,0,0,0.22)",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
          Website Visits vs Downloads
        </Typography>

        <LineChart
          xAxis={[
            {
              data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              scaleType: "point",
            },
          ]}
          series={[
            { data: [20, 45, 35, 70, 60, 90, 120], label: "Visits" },
            { data: [5, 12, 9, 18, 15, 24, 32], label: "Downloads" },
          ]}
          height={320}
        />
      </Box>
    </Box>
  );
}

export default ReportsPage;