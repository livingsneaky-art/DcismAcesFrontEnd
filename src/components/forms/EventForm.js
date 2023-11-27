import React, { useState } from "react";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./index.scss";
import { AddEvent, EditEvent, GetAllEvents } from "../../services/events";
import { useDispatch } from "react-redux";
import RichTextEditor from "./RichTextEditor";

const EventForm = ({ onSubmit, initialEvent }) => {
  const audiences = ["All", "Company", "Alumni"];
  // const [isDescriptionFilled, setIsDescriptionFilled] = useState(false);
  const [newEvent, setNewEvent] = useState(() => {
    if (initialEvent) {
      return {
        ...initialEvent,
      };
    } else {
      return {
        title: "",
        description: "",
        audience: "All",
        venue: "",
        start: "",
        end: "",
        file: null,
      };
    }
  });

  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialEvent) {
        const data = await EditEvent(dispatch, newEvent);
        if (data) {
          await GetAllEvents(dispatch);
          onSubmit(newEvent);
        }
      } else {
        const data = await AddEvent(dispatch, newEvent);
        if (data) {
          await GetAllEvents(dispatch);
          onSubmit(newEvent);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form>
      <Grid container spacing={1}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <InputLabel htmlFor="program-graduated-label">
            Intended Audience:{" "}
          </InputLabel>
          <Select
            labelId="program-graduated-label"
            id="program-graduated"
            value={newEvent.audience}
            onChange={(e) =>
              setNewEvent({ ...newEvent, audience: e.target.value })
            }
            style={{ maxHeight: "250px", marginLeft: "1rem", flex: 1 }}
          >
            {audiences.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            label="Event Title"
            placeholder="Type the title of the event"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            label="Venue"
            placeholder="Venue of the event"
            value={newEvent.venue}
            onChange={(e) =>
              setNewEvent({ ...newEvent, venue: e.target.value })
            }
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <label className="text-[12px] w-[100px]">Start: </label>
          <input
            type="datetime-local"
            value={newEvent.start}
            onChange={(e) =>
              setNewEvent({ ...newEvent, start: e.target.value })
            }
            className="w-[100%] h-[30px] bg-white border border-slate-200 p-2 rounded-md"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <label className="text-[12px] w-[100px]">End: </label>
          <input
            type="datetime-local"
            value={newEvent.end}
            onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
            className="w-[100%] h-[30px] bg-white border border-slate-200 p-5 rounded-md"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <label>Description: </label>
          <RichTextEditor
            value={newEvent.description}
            onChange={(value) => {
              setNewEvent({ ...newEvent, description: value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button
            type="button"
            variant="contained"
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "5rem",
              backgroundColor: "#221769",
              color: "#FFFFFF",
            }}
            onClick={handleFormSubmit}
          >
            {initialEvent ? "Update Event" : "Add Event"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EventForm;
