import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Header from "../../../components/header";
import PopUp from "../../../components/popup";
import Calendar from "../../../components/calendar";
import EventForm from "../../../components/forms/EventForm";
import { useDispatch, useSelector } from "react-redux";
import { GetAllEvents } from "../../../services/events";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Add } from "@mui/icons-material";

const Events = () => {
  const events = useSelector((state) => state.eventsSlice.events);
  const dispatch = useDispatch();

  useEffect(() => {
    GetAllEvents(dispatch);
  }, [dispatch]);

  const [openPopup, setOpenup] = useState(false);

  const handleEvent = () => {
    setOpenup(false);
  };

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Header title="Calendar Section" subtitle="List of Events" />
          <ToastContainer position="top-right" autoClose={3000} />

          <Box display="flex" gap="15px">
            <Button
              variant="contained"
              size="medium"
              style={{ backgroundColor: "#221769" }}
              onClick={() => {
                setOpenup(true);
              }}
              startIcon={<Add />}
            >
              Add Event
            </Button>
          </Box>
        </Box>
        <Calendar events={events} />
      </Box>
      <PopUp title="ADD EVENT FORM" openPopup={openPopup} setOpenup={setOpenup}>
        <EventForm onSubmit={handleEvent} />
      </PopUp>
    </>
  );
};

export default Events;
