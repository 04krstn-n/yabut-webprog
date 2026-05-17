/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { Typography, Stack, Box, Button } from "@mui/material";
import { BarChart, PieChart, LineChart } from "@mui/x-charts";

const sharedSlotProps = {
  legend: {
    direction: "row",
    position: {
      vertical: "top",
      horizontal: "middle",
    },
    padding: 0,
    itemGap: 20,
    labelStyle: {
      fontSize: 12,
      fontWeight: 700,
    },
  },
};

function ReportsPage() {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank", "width=1200,height=900");

    const exportedAt = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date());

    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          if (styleSheet.href) {
            return `<link rel="stylesheet" href="${styleSheet.href}">`;
          } else if (styleSheet.cssRules) {
            return `
              <style>
                ${Array.from(styleSheet.cssRules)
                  .map((rule) => rule.cssText)
                  .join("")}
              </style>
            `;
          }
        } catch (e) {
          return "";
        }
        return "";
      })
      .join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>Draft & Drift Analytics Report</title>

          ${styles}

          <style>
            @page {
              size: A4;
              margin: 12mm;
            }

            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
              box-sizing: border-box;
            }

            body {
              font-family: 'Inter', 'Segoe UI', sans-serif;
              background: #ffffff !important;
              color: #0f172a;
              padding: 20px;
            }

            /* HEADER */
            .header {
              background: linear-gradient(
                135deg,
                #1e293b 0%,
                #0f172a 100%
              );

              border-radius: 18px;
              padding: 24px;

              margin-bottom: 28px;

              display: flex;
              justify-content: space-between;
              align-items: center;

              color: white;
            }

            .header h1 {
              margin: 0;
              font-size: 26px;
              font-weight: 900;
              letter-spacing: 1px;
              text-transform: uppercase;
            }

            .header-subtitle {
              margin-top: 6px;
              font-size: 12px;
              color: #cbd5e1;
            }

            .prepared {
              text-align: right;
              font-size: 11px;
              color: #e2e8f0;
            }

            /* SUMMARY */
            .summary-box {
              background: #f8fafc;
              border-left: 6px solid #3b82f6;
              border-radius: 14px;
              padding: 18px;
              margin-bottom: 24px;

              box-shadow:
                0 6px 18px rgba(0,0,0,0.08);
            }

            /* PDF DESCRIPTION */
            .pdf-description {
              display: block !important;
              font-size: 11px !important;
              color: #64748b !important;
              line-height: 1.6 !important;
              margin-bottom: 14px !important;
            }

            /* CARD */
            .MuiBox-root {
              break-inside: avoid !important;

              background: #ffffff !important;

              border: 2px solid #0f172a !important;
              border-radius: 18px !important;

              padding: 18px !important;

              margin-bottom: 18px !important;

              box-shadow:
                0 10px 28px rgba(0,0,0,0.12),
                0 3px 10px rgba(0,0,0,0.08) !important;

              overflow: hidden !important;
            }

            /* CARD TITLE */
            .card-title {
              font-weight: 900 !important;
              font-size: 15px !important;
              color: #0f172a !important;

              margin-bottom: 5px !important;

              text-transform: uppercase;

              border-left: 5px solid #3b82f6;
              padding-left: 10px;
            }

            /* SVG */
            svg {
              max-width: 100% !important;
              height: auto !important;
              max-height: 260px !important;

              display: block !important;
              margin: 0 auto !important;

              overflow: visible !important;
            }

            /* LEGEND */
            .MuiChartsLegend-root {
              transform: scale(0.72)
                translateY(-8px) !important;

              transform-origin: center top !important;

              display: flex !important;
              justify-content: center !important;
              align-items: center !important;

              width: 100% !important;
            }

            .MuiChartsLegend-series {
              display: inline-flex !important;
              flex-direction: row !important;
            }

            /* FORCE COLORS */
            .MuiChartsLegend-root svg *,
            .MuiChartsLegend-root path,
            .MuiChartsLegend-root rect,
            .MuiChartsLegend-root circle {
              opacity: 1 !important;
              fill-opacity: 1 !important;
              stroke-opacity: 1 !important;
            }

            /* LEGEND TEXT */
            .MuiChartsLegend-root text {
              font-size: 15px !important;
              font-weight: 800 !important;
              fill: #1e293b !important;
            }

            /* STACK FIX */
            .MuiStack-root {
              display: block !important;
              width: 100% !important;
            }

            @media print {
              body {
                zoom: 96%;
              }

              * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
          </style>
        </head>

        <body>
          <div class="header">
            <div>
              <h1>Draft & Drift Analytics</h1>

              <div class="header-subtitle">
                Official Business Intelligence Report
              </div>
            </div>

            <div class="prepared">
              <strong>Prepared:</strong><br />
              ${exportedAt}
            </div>
          </div>

          <div>
            ${printContent.innerHTML}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();

    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 1200);
  };

  const cardStyle = {
    bgcolor: "#f8fafc",
    color: "#0f172a",
    borderRadius: "24px",
    p: 3,
    boxShadow: "0 12px 35px rgba(0,0,0,0.22)",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <Box sx={{ color: "#f8fafc" }}>
      <Box
        sx={{
          mb: 4,
          p: 4,
          borderRadius: "24px",
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: "#f8fafc",
            }}
          >
            Reports
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              mt: 0.5,
            }}
          >
            Draft & Drift performance summary.
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1.5}
          flexWrap="wrap"
          useFlexGap
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "#3b82f6",
              color: "#ffffff",
              fontWeight: 900,
              px: 3,
              py: 1.1,
              borderRadius: "12px",
              textTransform: "none",
              boxShadow: "0 6px 16px rgba(59,130,246,0.35)",

              "&:hover": {
                bgcolor: "#2563eb",
              },
            }}
          >
            Generate
          </Button>

          <Button
            variant="contained"
            onClick={handlePrint}
            sx={{
              bgcolor: "#e6c27a",
              color: "#0f172a",
              fontWeight: 900,
              px: 3,
              py: 1.1,
              borderRadius: "12px",
              textTransform: "none",
              boxShadow: "0 6px 16px rgba(230,194,122,0.35)",

              "&:hover": {
                bgcolor: "#f6d98f",
              },
            }}
          >
            Export PDF
          </Button>

          <Button
            variant="outlined"
            sx={{
              borderColor: "#64748b",
              color: "#f8fafc",
              fontWeight: 800,
              px: 3,
              py: 1.1,
              borderRadius: "12px",
              textTransform: "none",

              "&:hover": {
                borderColor: "#94a3b8",
                backgroundColor: "rgba(255,255,255,0.05)",
              },
            }}
          >
            Filter
          </Button>
        </Stack>
      </Box>

      <Stack ref={printRef} spacing={3}>
        <Box className="summary-box pdf-description" sx={{ display: "none" }}>
          <Typography variant="h6" className="card-title">
            Reports Summary
          </Typography>

          <Typography variant="body2">
            Comprehensive analytics overview for generated reports, category
            distribution, and completion performance for the active fiscal
            period.
          </Typography>
        </Box>

        <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
          <Box sx={{ ...cardStyle, flex: 2 }}>
            <Typography variant="h6" className="card-title">
              Monthly Revenue and Orders
            </Typography>

            <Typography
              variant="body2"
              className="pdf-description"
              sx={{ display: "none" }}
            >
              This visualization tracks the relationship between total monthly
              revenue and successful order volume.
            </Typography>

            <BarChart
              series={[
                {
                  data: [1200, 1800, 1500, 2200],
                  label: "Revenue ($)",
                  color: "#3b82f6",
                },
                {
                  data: [800, 1200, 1000, 1500],
                  label: "Orders",
                  color: "#e6c27a",
                },
              ]}
              height={300}
              xAxis={[
                {
                  data: ["Jan", "Feb", "Mar", "Apr"],
                  scaleType: "band",
                },
              ]}
              slotProps={sharedSlotProps}
            />
          </Box>

          <Box sx={{ ...cardStyle, flex: 1 }}>
            <Typography variant="h6" className="card-title">
              Sales by Category
            </Typography>

            <Typography
              variant="body2"
              className="pdf-description"
              sx={{ display: "none" }}
            >
              Percentage breakdown of report requests across main digital asset
              types.
            </Typography>

            <PieChart
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: 45,
                      label: "Templates",
                      color: "#3b82f6",
                    },
                    {
                      id: 1,
                      value: 30,
                      label: "Graphics",
                      color: "#e6c27a",
                    },
                    {
                      id: 2,
                      value: 25,
                      label: "Branding",
                      color: "#1e293b",
                    },
                  ],

                  innerRadius: 40,
                  paddingAngle: 5,
                },
              ]}
              height={280}
              slotProps={sharedSlotProps}
            />
          </Box>
        </Stack>

        <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
          <Box sx={{ ...cardStyle, flex: 1 }}>
            <Typography variant="h6" className="card-title">
              Website Visits vs Downloads
            </Typography>

            <Typography
              variant="body2"
              className="pdf-description"
              sx={{ display: "none" }}
            >
              Weekly traffic analysis comparing landing page visits against
              conversion downloads.
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
                  color: "#3b82f6",
                },
                {
                  data: [5, 12, 9, 18, 15, 24, 32],
                  label: "Downloads",
                  color: "#e6c27a",
                },
              ]}
              height={300}
              slotProps={sharedSlotProps}
            />
          </Box>

          <Box sx={{ ...cardStyle, flex: 1 }}>
            <Typography variant="h6" className="card-title">
              Monthly Report Output
            </Typography>

            <Typography
              variant="body2"
              className="pdf-description"
              sx={{ display: "none" }}
            >
              Historical performance data showing the volume of reports
              generated versus completed.
            </Typography>

            <BarChart
              series={[
                {
                  data: [18, 24, 20, 27],
                  label: "Generated",
                  color: "#1e293b",
                },
                {
                  data: [12, 19, 17, 23],
                  label: "Completed",
                  color: "#3b82f6",
                },
              ]}
              height={300}
              xAxis={[
                {
                  data: ["Jan", "Feb", "Mar", "Apr"],
                  scaleType: "band",
                },
              ]}
              slotProps={sharedSlotProps}
            />
          </Box>
        </Stack>

        <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
          <Box sx={{ ...cardStyle, flex: 1 }}>
            <Typography variant="h6" className="card-title">
              Report Category Share
            </Typography>

            <Typography
              variant="body2"
              className="pdf-description"
              sx={{ display: "none" }}
            >
              Distribution of generated reports across primary service
              categories for the current reporting cycle.
            </Typography>

            <PieChart
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: 40,
                      label: "Financial",
                      color: "#3b82f6",
                    },
                    {
                      id: 1,
                      value: 30,
                      label: "Marketing",
                      color: "#e6c27a",
                    },
                    {
                      id: 2,
                      value: 20,
                      label: "Operational",
                      color: "#1e293b",
                    },
                    {
                      id: 3,
                      value: 10,
                      label: "Customer",
                      color: "#64748b",
                    },
                  ],

                  innerRadius: 45,
                  paddingAngle: 4,
                },
              ]}
              height={300}
              slotProps={sharedSlotProps}
            />
          </Box>

          <Box sx={{ ...cardStyle, flex: 1 }}>
            <Typography variant="h6" className="card-title">
              Completion Rate
            </Typography>

            <Typography
              variant="body2"
              className="pdf-description"
              sx={{ display: "none" }}
            >
              Comparative monthly completion efficiency analysis based on
              generated versus finalized reports.
            </Typography>

            <BarChart
              series={[
                {
                  data: [82, 88, 79, 93],
                  label: "Completion %",
                  color: "#3b82f6",
                },
              ]}
              height={300}
              xAxis={[
                {
                  data: ["Jan", "Feb", "Mar", "Apr"],
                  scaleType: "band",
                },
              ]}
              yAxis={[
                {
                  min: 0,
                  max: 100,
                },
              ]}
              slotProps={sharedSlotProps}
            />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

export default ReportsPage;
