import React, { useState, useEffect } from 'react';
import { Button, Container, Alert, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Ensure to import this for navigation
import supabase from '../../../supabase'; // Adjust the path as needed
import { Helmet } from 'react-helmet';
import { Box } from '@mui/material';

const BalanceTracker = () => {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const navigate = useNavigate(); // Initialize navigate for navigation

  useEffect(() => {
    fetchBalance();
    fetchRecentTransactions();
  }, []);

  // Function to fetch the current balance from Supabase
  const fetchBalance = async () => {
    const { data, error } = await supabase
      .from('Balance')
      .select('balance')
      .single();

    if (error) {
      setAlert({ show: true, message: `Error fetching balance: ${error.message}`, variant: 'danger' });
    } else if (data) {
      setCurrentBalance(parseFloat(data.balance) || 0);
    }
  };

  // Function to fetch recent transactions from Supabase
  const fetchRecentTransactions = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('amount, transaction_type, timestamp')
      .order('timestamp', { ascending: false })
      .limit(5);

    if (error) {
      setAlert({ show: true, message: `Error fetching transactions: ${error.message}`, variant: 'danger' });
    } else {
      setRecentTransactions(data || []);
    }
  };

  // Handler for "Go Back" button
  const handleBack = () => {
    navigate('/finance');
  };

  const buttonStyle = {
    marginBottom: '20px',
  };

  return (
    <>
      <Helmet>
        <title>Finance - Balance Tracker</title>
      </Helmet>
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="bg-white text-primary rounded shadow p-4" style={{ width: '90%', maxWidth: '800px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between', // Align items to left and center
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            {/* Button on the extreme left */}
            <Box sx={{ flexShrink: 0 }}>
              <Button
                variant="contained"
                color="primary"
                className="btn btn-primary"
                onClick={handleBack}
                style={buttonStyle}
              >
                Go Back
              </Button>
            </Box>

            {/* Balance Tracker title in the center */}
            <h1 className="text-center text-primary" style={{ flexGrow: 1, margin: 0 }}>
              Balance Tracker
            </h1>
          </div>

          <div className="text-center mb-4">
            <h2 id="currentBalance">Rs. {currentBalance.toFixed(2)}</h2>
            <p>Current Balance</p>
          </div>
          {alert.show && (
            <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
              {alert.message}
            </Alert>
          )}
          <h3 className="text-center text-primary mt-4">Recent Transactions</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.transaction_type.charAt(0).toUpperCase() + transaction.transaction_type.slice(1)}</td>
                    <td>Rs. {parseFloat(transaction.amount).toFixed(2)}</td>
                    <td>{new Date(transaction.timestamp).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">No recent transactions</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};

export default BalanceTracker;
