import supabase from '../../../supabase'; // Import Supabase client
import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, Button, TextField, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const BillManager = () => {
  // State to hold form input values
  const [billName, setBillName] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [billDate, setBillDate] = useState('');
  const [billStatus, setBillStatus] = useState('paid');
  
  // State to hold the list of bills fetched from Supabase
  const [bills, setBills] = useState([]);
  
  // State for Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Fetch bills from Supabase when the component mounts
  useEffect(() => {
    fetchBills();
  }, []);

  // Function to fetch bills from Supabase
  const fetchBills = async () => {
    const { data, error } = await supabase.from('BillManager').select('*');
    if (error) {
      setSnackbarMessage('Error fetching bills: ' + error.message);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } else {
      setBills(data);
    }
  };

  // Function to add a new bill to Supabase
  const addBill = async () => {
    if (!billName || !billAmount || !billDate || !billStatus) {
      setSnackbarMessage('Please fill in all fields.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    const newBill = {
      billname: billName,
      billamount: billAmount,
      duedate: billDate,
      status: billStatus,
    };

    const { data, error } = await supabase.from('BillManager').insert([newBill]);

    if (error) {
      setSnackbarMessage('Error adding bill: ' + error.message);
      setSnackbarSeverity('error');
    } else {
      // Refresh the bill list after adding a new bill
      if (data && data.length > 0) {
        setBills([...bills, data[0]]);
      }
      setBillName('');
      setBillAmount('');
      setBillDate('');
      setBillStatus('paid');
      setSnackbarMessage('Bill added successfully!');
      setSnackbarSeverity('success');
    }
    setOpenSnackbar(true);
  };

  // Function to return status class based on bill status
  const getStatusClass = (status) => {
    switch (status) {
      case 'paid':
        return 'status-paid';
      case 'unpaid':
        return 'status-unpaid';
      case 'pending':
        return 'status-pending';
      default:
        return '';
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Bill Manager</h1>
      <form noValidate autoComplete="off">
        <div className="form-group">
          <TextField
            label="Bill Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={billName}
            onChange={(e) => setBillName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <TextField
            label="Amount"
            variant="outlined"
            fullWidth
            margin="normal"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <TextField
            label="Due Date"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={billDate}
            onChange={(e) => setBillDate(e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <div className="form-group">
          <Select
            label="Status"
            variant="outlined"
            fullWidth
            margin="normal"
            value={billStatus}
            onChange={(e) => setBillStatus(e.target.value)}
          >
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="unpaid">Unpaid</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </div>
        <Button variant="contained" color="primary" onClick={addBill} style={buttonStyle}>
          Add Bill
        </Button>
      </form>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={thTdStyle}>Bill Name</TableCell>
              <TableCell style={thTdStyle}>Amount</TableCell>
              <TableCell style={thTdStyle}>Due Date</TableCell>
              <TableCell style={thTdStyle}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.map((bill) => (
              <TableRow key={bill.id}>
                <TableCell style={thTdStyle}>{bill.billname}</TableCell>
                <TableCell style={thTdStyle}>{bill.billamount}</TableCell>
                <TableCell style={thTdStyle}>{bill.duedate}</TableCell>
                <TableCell style={{ ...thTdStyle, ...statusStyle, ...statusClasses[getStatusClass(bill.status)] }}>
                  {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

// Inline styles
const containerStyle = {
  width: '90%',
  maxWidth: '1200px',
  padding: '20px',
  background: '#fff',
  boxShadow: '0 0 15px #6a1b9a',
  borderRadius: '8px',
  overflow: 'hidden',
  margin: '20px auto',
  background: 'linear-gradient(to right, #f8c2ef, #acb6e5)',
};

const titleStyle = {
  textAlign: 'center',
  color: '#6a1b9a',
};

const buttonStyle = {
  backgroundColor: '#6a1b9a',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
  borderRadius: '4px',
};

const thTdStyle = {
  padding: '12px',
  border: '1px solid #ddd',
  textAlign: 'left',
};

const statusStyle = {
  padding: '10px',
  borderRadius: '4px',
};

// Status-specific background colors
const statusClasses = {
  'status-paid': { backgroundColor: '#d4edda' },
  'status-unpaid': { backgroundColor: '#f8d7da' },
  'status-pending': { backgroundColor: '#fff3cd' },
};

export default BillManager;
