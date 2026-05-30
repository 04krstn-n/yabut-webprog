import { useEffect, useCallback, useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const getApiUrl = () => {
  try {
    const meta = Function("return import.meta")();
    return meta?.env?.VITE_API_URL || "http://localhost:8000/api";
  } catch {
    return "http://localhost:8000/api";
  }
};

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

const DashArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [newArticle, setNewArticle] = useState({
    id: "",
    slug: "",
    title: "",
    preview: "",
    image: "",
    paragraphs: [],
    status: "enabled",
  });

  const getHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  };

  const loadArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await axios.get(
        `${getApiUrl()}/articles?includeDisabled=true`,
        getHeaders()
      );
      setArticles(data.articles || []);
    } catch (requestError) {
      console.error("Error fetching articles:", requestError);
      setError("Unable to load articles from the database.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const normalizeParagraphInput = (value) =>
    value
      .split("\n")
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

  const nextNumericId = useMemo(() => {
    const numericIds = articles
      .map((article) => Number(article.id))
      .filter((value) => Number.isFinite(value));

    return numericIds.length ? Math.max(...numericIds) + 1 : 1;
  }, [articles]);

  const handleOpen = () => {
    setIsEditing(false);
    setEditingArticleId(null);
    setNewArticle({
      id: String(nextNumericId),
      slug: "",
      title: "",
      preview: "",
      image: "",
      paragraphs: [],
      status: "enabled",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditingArticleId(null);
  };

  const handleEdit = (article) => {
    setNewArticle({
      id: article.id ?? "",
      slug: article.slug ?? "",
      title: article.title ?? "",
      preview: article.preview ?? "",
      image: article.image ?? "",
      paragraphs: Array.isArray(article.paragraphs) ? article.paragraphs : [],
      status: article.status ?? "enabled",
    });
    setIsEditing(true);
    setEditingArticleId(article._id);
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...newArticle,
        id: newArticle.id === "" ? undefined : Number(newArticle.id),
        paragraphs: Array.isArray(newArticle.paragraphs)
          ? newArticle.paragraphs
          : normalizeParagraphInput(String(newArticle.paragraphs || "")),
      };

      if (isEditing && editingArticleId) {
        await axios.put(`${getApiUrl()}/articles/${editingArticleId}`, payload, 
        getHeaders());
      } else {
        await axios.post(`${getApiUrl()}/articles`, payload, getHeaders());
      }

      await loadArticles();
      handleClose();
    } catch (saveError) {
      console.error("Error saving article:", saveError);
    }
  };

  const handleToggleStatus = async (article) => {
    try {
      const nextStatus = article.status === "enabled" ? "disabled" : "enabled";

      await axios.put(
        `${getApiUrl()}/articles/${article._id}`,
        { status: nextStatus },
        getHeaders()
      );

      await loadArticles();
    } catch (toggleError) {
      console.error("Error updating article status:", toggleError);
    }
  };

  const handleDelete = async (articleId) => {
    try {
      await axios.delete(`${getApiUrl()}/articles/${articleId}`, getHeaders());
      await loadArticles();
    } catch (deleteError) {
      console.error("Error deleting article:", deleteError);
    }
  };

  const filteredArticles = articles.filter((a) => {
    const q = searchQuery.toLowerCase();
    const paragraphCount = Array.isArray(a.paragraphs) ? a.paragraphs.length : a.paragraphs;
    
    const matchesSearch = String(a.id || "").toLowerCase().includes(q) ||
      (a.title || "").toLowerCase().includes(q) ||
      (a.slug || "").toLowerCase().includes(q) ||
      (a.preview || "").toLowerCase().includes(q) ||
      String(paragraphCount || "").toLowerCase().includes(q) ||
      (a.status || "").toLowerCase().includes(q);
      
    const matchesFilter = filterStatus === "all" || a.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const paginated = filteredArticles.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      {/* HEADER */}
      <Stack
        direction="row"
        sx={{
          mb: 4,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ color: '#ffffff' }}>
          Articles Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={handleOpen}
        >
          Add Article
        </Button>
      </Stack>

      {/* SEARCH AND FILTER */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <Box sx={{ position: "relative", flex: 1 }}>
          <SearchIcon sx={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'text.secondary', pointerEvents: 'none' }} />
          <TextField
            fullWidth
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(0);
            }}
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
          />
        </Box>
        <FormControl sx={{ minWidth: 200, backgroundColor: '#ffffff', borderRadius: 1 }}>
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
            <MenuItem value="enabled">Enabled</MenuItem>
            <MenuItem value="disabled">Disabled</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {error ? (
        <Box sx={{ mb: 3, color: "error.main" }}>
          {error}
        </Box>
      ) : null}

      {/* TABLE */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Slug</strong></TableCell>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Paragraphs</strong></TableCell>
              <TableCell><strong>Preview</strong></TableCell>
              <TableCell align="center"><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                    <CircularProgress size={20} />
                    <span>Loading articles...</span>
                  </Stack>
                </TableCell>
              </TableRow>
            ) : paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  No articles found
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((a) => {
                const paragraphCount = Array.isArray(a.paragraphs) ? a.paragraphs.length : a.paragraphs;
                return (
                  <TableRow key={a._id || a.slug} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                    <TableCell sx={{ fontWeight: 500 }}>{a.id ?? a._id}</TableCell>
                    <TableCell sx={{ color: '#666' }}>{a.slug}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{a.title}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{paragraphCount}</TableCell>
                    <TableCell sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {a.preview}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={a.status === "enabled" ? "Enabled" : "Disabled"}
                        color={a.status === "enabled" ? "success" : "default"}
                        size="small"
                        variant="contained"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Button 
                          variant="contained" 
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleEdit(a)}
                        >
                          Edit
                        </Button>
                        <Button 
                          size="small" 
                          variant="contained"
                          color={a.status === "enabled" ? "error" : "success"}
                          onClick={() => handleToggleStatus(a)}
                        >
                          {a.status === "enabled" ? "Disable" : "Enable"}
                        </Button>
                        <IconButton
                          color="error"
                          aria-label="delete article"
                          onClick={() => handleDelete(a._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        <TablePagination
          count={filteredArticles.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, p) => setPage(p)}
          onRowsPerPageChange={(e) =>
            setRowsPerPage(parseInt(e.target.value, 10))
          }
        />
      </TableContainer>

      {/* MODAL */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h5">
            {isEditing ? "Edit Article" : "Add Article"}
          </Typography>

          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="ID"
              type="number"
              value={newArticle.id}
              onChange={(e) =>
                setNewArticle({ ...newArticle, id: e.target.value })
              }
            />

            <TextField
              label="Slug"
              value={newArticle.slug}
              onChange={(e) =>
                setNewArticle({ ...newArticle, slug: e.target.value })
              }
            />

            <TextField
              label="Title"
              value={newArticle.title}
              onChange={(e) =>
                setNewArticle({ ...newArticle, title: e.target.value })
              }
            />

            <TextField
              label="Preview"
              multiline
              rows={2}
              value={newArticle.preview}
              onChange={(e) =>
                setNewArticle({
                  ...newArticle,
                  preview: e.target.value,
                })
              }
            />

            <TextField
              label="Image URL"
              value={newArticle.image}
              onChange={(e) =>
                setNewArticle({ ...newArticle, image: e.target.value })
              }
            />

            <TextField
              label="Paragraphs (one per line)"
              multiline
              rows={4}
              value={Array.isArray(newArticle.paragraphs) ? newArticle.paragraphs.join("\n") : ""}
              onChange={(e) =>
                setNewArticle({
                  ...newArticle,
                  paragraphs: normalizeParagraphInput(e.target.value),
                })
              }
            />

            <Stack direction="row" spacing={2}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" onClick={handleSave}>
                {isEditing ? "Save" : "Create"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default DashArticleListPage;