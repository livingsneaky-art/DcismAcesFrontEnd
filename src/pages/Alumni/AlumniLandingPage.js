import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';
import { ToastContainer } from 'react-toastify';
import Navbar from './Navbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const AlumniLandingPage = () => (
    <>
        <Navbar />
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <ToastContainer />
            <Typography variant="h4" gutterBottom>
                New Expense
            </Typography>
            <ExpenseForm />
            <Divider style={{ margin: '2rem 0' }} />
            <Typography variant="h4" gutterBottom>
                Your Expenses
            </Typography>
            <ExpenseList />
        </Container>
    </>
);

export default AlumniLandingPage;