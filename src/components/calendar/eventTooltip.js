import React, { useEffect, useState } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { DeleteOutline, Edit } from "@mui/icons-material";
import PopUp from "../popup";
import EventForm from "../forms/EventForm";
import { DeleteEvent, GetAllEvents } from "../../services/events";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationDialog from "../popup/confirmationDialog";
import { formatDate } from "../constant/helper";

const EventWithTooltip = ({ event }) => {
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [deleteOccurred, setDeleteOccurred] = useState(false);
  const user = useSelector((state) => state.alumniSlice.adminProfile);

  const dispatch = useDispatch();

  const handleEditEvent = () => {
    setOpenEditPopup(false);
  };

  const handleDeleteEvent = () => {
    setOpenDeletePopup(false);
  };

  const handleDelete = (id) => {
    DeleteEvent(dispatch, id)
      .then(() => {
        setDeleteOccurred(true);
      })
      .catch((error) => {
        console.error("Error deleting announcement:", error);
      });

    setOpenDeletePopup(false);
  };

  useEffect(() => {
    if (deleteOccurred) {
      GetAllEvents(dispatch);
      setDeleteOccurred(false);
    }
  }, [deleteOccurred, dispatch]);

  return (
    <Tooltip
      title={
        !(openEditPopup || openDeletePopup) && (
          <div>
            <Typography variant="h6">{`Venue: ${event.venue}`}</Typography>
            <Typography variant="h6">
              Start {formatDate(event.start)}
            </Typography>

            <Typography variant="h6">Start {formatDate(event.end)}</Typography>
          </div>
        )
      }
      placement="bottom"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
        >
          <div
            style={{
              maxWidth: "100px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {event.title}
          </div>
        </Box>
        <Box display="flex">
          <IconButton onClick={() => setOpenEditPopup(true)}>
            <Edit
              style={{
                fontSize: "20px",
                color: "#ffef62",
              }}
            />
          </IconButton>
          <IconButton
            onClick={() => {
              setOpenDeletePopup(true);
              setSelectedItemId(event.id);
            }}
            disabled={event.admin.email !== user.email}
          >
            <DeleteOutline
              style={{
                fontSize: "20px",
                // color: "#e2726e",
                color: event.admin.email !== user.email ? "#aaa" : "#e2726e",
              }}
            />
          </IconButton>
        </Box>
        <PopUp
          title="EDIT EVENT"
          openPopup={openEditPopup}
          setOpenup={setOpenEditPopup}
        >
          <EventForm onSubmit={handleEditEvent} initialEvent={event} />
        </PopUp>
        <ConfirmationDialog
          open={openDeletePopup}
          onClose={handleDeleteEvent}
          onConfirm={() => {
            if (selectedItemId) {
              handleDelete(selectedItemId);
            }
          }}
        />
      </Box>
    </Tooltip>
  );
};

export default EventWithTooltip;
