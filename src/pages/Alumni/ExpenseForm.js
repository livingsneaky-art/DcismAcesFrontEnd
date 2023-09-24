import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { EditExpense, NewExpense, DeleteExpense } from '../../services/expenses';

const ExpenseForm = ({ expense, setIsEditing }) => {
    const descriptions = ['Groceries', 'Credit Card', 'Student Loans', 'Eating out', 'Gas'];
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState(descriptions[0]);
    const [isNewExpense, setIsNewExpense] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (expense !== undefined) {
            setIsNewExpense(false);
            setAmount(expense.amount);
        } else {
            setIsNewExpense(true);
        }
    }, [expense]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isNewExpense) {
            NewExpense(dispatch, { description: description, amount: Number(amount) });
        } else {
            EditExpense(dispatch, { id: expense.id, description: description, amount: Number(amount) });
            setIsEditing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack direction="row" spacing={2}>
                <FormControl fullWidth>
                    <InputLabel>Description</InputLabel>
                    <Select
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    >
                        {descriptions.map((d, idx) => (
                            <MenuItem key={idx} value={d}>
                                {d}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    label="Amount"
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                />
                <Stack spacing={1} direction="row" alignItems="center">
                    {isNewExpense ? (
                        <Button variant="contained" type="submit">
                            Add
                        </Button>
                    ) : (
                        <>
                            <Button variant="contained" color="error" onClick={() => DeleteExpense(dispatch, expense)}>
                                Delete
                            </Button>
                            <Button variant="contained" color="success" type="submit">
                                Save
                            </Button>
                            <Button variant="contained" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                        </>
                    )}
                </Stack>
            </Stack>
        </form>
    );
};

export default ExpenseForm;
