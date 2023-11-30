import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";

const ConfirmationDialogReason = ({ open, onClose, onConfirm }) => {
    const [message, setMessage] = useState("");

    const handleReasonChange = (event) => {
        setMessage(event.target.value);
    };

    const handleConfirm = () => {
        onConfirm(message);
        setMessage("");
    };

    const isConfirmDisabled = message.trim() === "";


    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    Are you sure you want to delete this item?
                </Typography>
                <TextField
                    label="Reason for deletion"
                    value={message}
                    onChange={handleReasonChange}
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="primary" autoFocus disabled={isConfirmDisabled} >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialogReason;
