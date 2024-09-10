import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Typography,
  TextField,
  Box,
  InputAdornment,
  Drawer,
  Button,
  Select,
  MenuItem,
  Grid,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CreateLeadModal from './Leads';

const TableComponent = () => {
  const [leads, setLeads] = useState([]);
  const [callers, setCallers] = useState([]);

  const [filteredLeads, setFilteredLeads] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [role, setRole] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const statusColors = {
    Enquiry: 'grey',
    Enc: 'blue',
    Cold: 'lightblue',
    Dead: 'black',
    Connected: 'green',
    Warm: 'orange',
    Hot: 'red',
    Register: 'purple',
    Enroll: 'pink',
    Pending: 'gold',
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    setRole(storedRole || '');

    const fetchData = async () => {
      try {
        const endpoint =
          storedRole === 'caller'
            ? 'https://api.thelearnskills.com/api/v1/ug/caller-leads'
            : 'https://api.thelearnskills.com/api/v1/ug/undergraduates';
        const response = await fetch(endpoint, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const sortedData = data.reverse();
        setLeads(sortedData);
        setFilteredLeads(sortedData);

        if (storedRole === 'teamLeader') {
          const fetchCallersResponse = await fetch(
            'https://api.thelearnskills.com/api/v1/ug/callers',
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const callerData = await fetchCallersResponse.json();
          const callerArray = callerData.callers;
          if (Array.isArray(callerArray)) {
            const callerNames = callerArray.map((caller) => ({
              _id: caller._id,
              name: caller.name,
            }));
            setCallers(callerNames);
          } else {
            console.error('Data is not an array:', callerArray);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit item with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete item with id: ${id}`);
  };

  const handleStatusChange = async (id, status) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        `https://api.thelearnskills.com/api/v1/ug/update-lead-status/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      const data = await response.json();
      if (data.message === 'Status updated successfully') {
        setLeads((prevLeads) =>
          prevLeads.map((lead) => (lead._id === id ? { ...lead, status } : lead))
        );
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleAssign = async (leadId, callerId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        `https://api.thelearnskills.com/api/v1/ug/assign-lead/${leadId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ callerId }),
        }
      );
      const data = await response.json();
      if (data.message === 'Lead assigned successfully') {
        setLeads((prevLeads) =>
          prevLeads.map((lead) =>
            lead._id === leadId ? { ...lead, assignedTo: callerId } : lead
          )
        );
      }
    } catch (error) {
      console.error('Error assigning lead:', error);
    }
  };

  useEffect(() => {
    filterLeads();
  }, [searchQuery, startDate, endDate, leads]);

  const filterLeads = () => {
    let filteredData = leads;

    if (searchQuery) {
      filteredData = filteredData.filter(
        (lead) =>
          (lead.name &&
            lead.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (lead.location &&
            lead.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (lead.courseName &&
            lead.courseName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (startDate && endDate) {
      filteredData = filteredData.filter((lead) => {
        const leadDate = new Date(lead.date);
        return leadDate >= startDate && leadDate <= endDate;
      });
    }

    setFilteredLeads(filteredData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleCreateLead = (leadData) => {
    const token = localStorage.getItem('token');
    fetch('https://api.thelearnskills.com/api/v1/ug/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(leadData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Lead created successfully') {
          setLeads((prevLeads) => [data.lead, ...prevLeads]);
          setFilteredLeads((prevLeads) => [data.lead, ...prevLeads]);
        }
      })
      .catch((error) => console.error('Error creating lead:', error));
  };

  return (
    <Paper sx={{ marginTop: { xs: '1rem', md: '3rem' }, padding: '1rem' }}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={12} md={4}>
          <Typography
            variant={isSm ? 'h5' : 'h4'}
            fontWeight="bold"
            textAlign={isSm ? 'center' : 'left'}
          >
            College Leads
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          container
          spacing={2}
          justifyContent={isSm ? 'center' : 'flex-end'}
        >
          {role === 'admin' && (
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setModalOpen(true)}
                fullWidth={isSm}
              >
                Create Lead
              </Button>
            </Grid>
          )}
          <Grid item>
            <Button
              variant="contained"
              startIcon={<FilterListIcon />}
              onClick={toggleDrawer(true)}
              fullWidth={isSm}
            >
              Filter
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 300 },
            padding: '1rem',
          },
        }}
      >
        <Box>
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Search by name, location, or course"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ mb: 2 }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => (
                <TextField {...params} fullWidth sx={{ mb: 2 }} />
              )}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => (
                <TextField {...params} fullWidth sx={{ mb: 2 }} />
              )}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setSearchQuery('');
              setStartDate(null);
              setEndDate(null);
            }}
            fullWidth
          >
            Clear Filters
          </Button>
        </Box>
      </Drawer>

      <TableContainer
        sx={{
          mt: 3,
          boxShadow: 3,
          maxHeight: '60vh',
          overflowX: 'auto',
        }}
      >
        <Table stickyHeader aria-label="college table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#EEEDEB' }}>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  padding: '5px',
                  textTransform: 'uppercase',
                  minWidth: 70,
                }}
              >
                Sr. No
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  padding: '5px',
                  textTransform: 'uppercase',
                  minWidth: 150,
                }}
              >
                Name
              </TableCell>
              {!isSm && (
                <>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                      padding: '5px',
                      textTransform: 'uppercase',
                      minWidth: 130,
                    }}
                  >
                    Phone Number
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                      padding: '5px',
                      textTransform: 'uppercase',
                      minWidth: 200,
                    }}
                  >
                    Email ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                      padding: '5px',
                      textTransform: 'uppercase',
                      minWidth: 200,
                    }}
                  >
                    College Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                      padding: '5px',
                      textTransform: 'uppercase',
                      minWidth: 100,
                    }}
                  >
                    12th %
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                      padding: '5px',
                      textTransform: 'uppercase',
                      minWidth: 150,
                    }}
                  >
                    Location
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                      padding: '5px',
                      textTransform: 'uppercase',
                      minWidth: 150,
                    }}
                  >
                    Course Name
                  </TableCell>
                </>
              )}
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  padding: '5px',
                  textTransform: 'uppercase',
                  minWidth: 100,
                }}
              >
                Status
              </TableCell>
              {role === 'teamLeader' && !isSm && (
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    padding: '5px',
                    textTransform: 'uppercase',
                    minWidth: 150,
                  }}
                >
                  Assigned
                </TableCell>
              )}
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  padding: '5px',
                  textTransform: 'uppercase',
                  minWidth: 100,
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeads
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((lead, index) => (
                <TableRow key={lead._id}>
                  <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                  <TableCell sx={{ color: 'blue' }}>{lead.name}</TableCell>
                  {!isSm && (
                    <>
                      <TableCell>{lead.phoneNumber}</TableCell>
                      <TableCell>{lead.emailId}</TableCell>
                      <TableCell>{lead.collegeName}</TableCell>
                      <TableCell>{lead.twelfthPercentage}</TableCell>
                      <TableCell>{lead.location}</TableCell>
                      <TableCell>{lead.courseName}</TableCell>
                    </>
                  )}
                  <TableCell>
                    {role === 'caller' ? (
                      <Select
                        value={lead.status}
                        onChange={(e) =>
                          handleStatusChange(lead._id, e.target.value)
                        }
                        sx={{
                          width: '100px',
                          backgroundColor: statusColors[lead.status],
                        }}
                      >
                        {Object.keys(statusColors).map((status) => (
                          <MenuItem key={status} value={status}>
                            {status}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      <Typography
                        style={{ color: statusColors[lead.status] }}
                        variant="body2"
                      >
                        {lead.status.charAt(0).toUpperCase() +
                          lead.status.slice(1)}
                      </Typography>
                    )}
                  </TableCell>
                  {role === 'teamLeader' && !isSm && (
                    <TableCell sx={{ padding: '8px' }}>
                      <Select
                        value={lead.assignedTo || ''}
                        onChange={(e) =>
                          handleAssign(lead._id, e.target.value)
                        }
                        displayEmpty
                        fullWidth
                      >
                        <MenuItem value="" disabled>
                          Select Caller
                        </MenuItem>
                        {callers.map((caller) => (
                          <MenuItem key={caller._id} value={caller._id}>
                            {caller.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  )}
                  <TableCell>
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        onClick={() => handleEdit(lead._id)}
                        size="small"
                      >
                        <EditIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        onClick={() => handleDelete(lead._id)}
                        size="small"
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{
          mt: 2,
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-input, & .MuiTablePagination-caption':
            {
              fontWeight: 'bold',
            },
          '& .MuiTablePagination-select, & .MuiTablePagination-actions': {
            fontWeight: 'bold',
          },
        }}
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredLeads.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <CreateLeadModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        handleSubmit={handleCreateLead}
      />
    </Paper>
  );
};

export default TableComponent;
