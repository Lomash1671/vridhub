import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import supabase from '../../../supabase'; // Adjust the path as needed

const BalanceTracker = () => {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionType, setTransactionType] = useState('deposit');
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

  useEffect(() => {
    fetchBalance();
  }, []);

  // Function to fetch the current balance from Supabase
  const fetchBalance = async () => {
    const { data, error } = await supabase
      .from('Balance')
      .select('Availablebalance')
      .single();

    if (error) {
      setAlert({ show: true, message: 'Error fetching balance: ' + error.message, variant: 'danger' });
    } else {
      setCurrentBalance(data ? data.Availablebalance : 0);
    }
  };

  // Function to handle balance update or insert
  const handleBalanceUpdate = async () => {
    const amount = parseFloat(transactionAmount);

    if (isNaN(amount) || amount <= 0) {
      setAlert({ show: true, message: 'Please enter a valid amount.', variant: 'danger' });
      return;
    }

    let newBalance;
    if (transactionType === 'deposit') {
      newBalance = currentBalance + amount;
    } else if (transactionType === 'withdrawal') {
      if (amount > currentBalance) {
        setAlert({ show: true, message: 'Insufficient balance for withdrawal.', variant: 'danger' });
        return;
      }
      newBalance = currentBalance - amount;
    }

    // Insert or update the balance in Supabase
    const { data: existingBalance, error: fetchError } = await supabase
      .from('Balance')
      .select('Availablebalance')
      .single();

    if (fetchError) {
      setAlert({ show: true, message: 'Error checking balance record: ' + fetchError.message, variant: 'danger' });
      return;
    }

    let result;
    if (existingBalance) {
      // Update the existing balance
      result = await supabase
        .from('Balance')
        .update({ Availablebalance: newBalance })
        .eq('id', 1); // Assuming there is only one record with id 1
    } else {
      // Insert a new balance record
      result = await supabase
        .from('Balance')
        .insert([{ id: 1, Availablebalance: newBalance }]);
    }

    if (result.error) {
      setAlert({ show: true, message: 'Error updating balance: ' + result.error.message, variant: 'danger' });
    } else {
      setCurrentBalance(newBalance);
      setAlert({ show: true, message: 'Balance updated successfully!', variant: 'success' });
      setTransactionAmount('');
      setTransactionType('deposit');
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh', background: 'linear-gradient(to right, #e4cffa, #e2b0ff)' }}>
      <div className="bg-white text-primary rounded shadow p-4" style={{ width: '90%', maxWidth: '600px' }}>
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
        <Form>
          <Form.Group controlId="transactionAmount">
            <Form.Label>Transaction Amount:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="transactionType">
            <Form.Label>Transaction Type:</Form.Label>
            <Form.Control
              as="select"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdrawal</option>
            </Form.Control>
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleBalanceUpdate}
            className="w-100"
            style={{ backgroundColor: '#6a1b9a', borderColor: '#6a1b9a' }}
          >
            Update Balance
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default BalanceTracker;
