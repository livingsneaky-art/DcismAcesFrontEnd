import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ExpenseForm from './ExpenseForm';
import { GetExpenses } from '../../services/expenses';

const ExpenseList = () => {
    const dispatch = useDispatch();
    const expenses = useSelector((state) => state.expensesSlice.expenses);

    useEffect(() => {
        GetExpenses(dispatch);
    }, [dispatch]);

    return (
        <Grid container spacing={2}>
            {expenses.map((e) => (
                <Grid item xs={12} key={e.id}>
                    <ExpenseListItem expense={e} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ExpenseList;

const ExpenseListItem = ({ expense }) => {
    const [isEditing, setIsEditing] = useState(false);
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" component="div">
                    {expense.description}
                </Typography>
                <Typography color="textSecondary">${expense.amount}</Typography>
                <Button
                    variant="contained"
                    color="warning"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    Edit
                </Button>
                <Divider sx={{ mt: 2 }} />
                {isEditing ? (
                    <ExpenseForm expense={expense} setIsEditing={setIsEditing} />
                ) : null}
            </CardContent>
        </Card>
    );
};



