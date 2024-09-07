import React, { useState, useEffect } from 'react';
import { Button, Container, Alert, Table } from 'react-bootstrap';
import supabase from '../../../supabase'; // Adjust the path as needed

const BalanceTracker = () => {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

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
      setAlert({ show: true, message: 'Error fetching balance: ' + error.message, variant: 'danger' });
    } else {
      setCurrentBalance(data ? parseFloat(data.balance) : 0);
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
      setAlert({ show: true, message: 'Error fetching transactions: ' + error.message, variant: 'danger' });
    } else {
      setRecentTransactions(data);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh', background: 'linear-gradient(to right, #e4cffa, #e2b0ff)' }}>
      <div className="bg-white text-primary rounded shadow p-4" style={{ width: '90%', maxWidth: '800px' }}>
        <h1 className="text-center text-primary">Balance Tracker</h1>
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
            {recentTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.transaction_type.charAt(0).toUpperCase() + transaction.transaction_type.slice(1)}</td>
                <td>Rs. {parseFloat(transaction.amount).toFixed(2)}</td>
                <td>{new Date(transaction.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default BalanceTracker;
