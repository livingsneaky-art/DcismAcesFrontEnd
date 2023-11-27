import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import Close from "@mui/icons-material/Close";

const PopUp = ({ title, children, openPopup, setOpenup }) => {
  return (
    <Dialog open={openPopup}>
      <DialogTitle sx={{ backgroundColor: "#221769" }}>
        <div className="flex">
          <Typography variant="h4" sx={{ color: "white", flexGrow: 1 }}>
            {title}
          </Typography>
          <Button onClick={() => setOpenup(false)}>
            <Close style={{ color: "white" }} />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default PopUp;
