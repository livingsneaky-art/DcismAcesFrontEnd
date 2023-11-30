import axios from "axios";
import { toast } from "react-toastify";

import {
  getAllEvents,
  getAllEventsError,
  addEvent,
  addEventError,
  editEvent,
  editEventError,
  deleteEvent,
  deleteEventError,
  setErrorMessage,
} from "../app/eventsSlice";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/Admin`,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers = { authorization: "Bearer " + localStorage.getItem("token") };
  return config;
});

export const GetAllEvents = async (dispatch) => {
  try {
    const response = await axiosInstance.get("/Events");
    const eventData = response.data;
    dispatch(getAllEvents(eventData));
  } catch (error) {
    console.error("Error:", error);
    dispatch(getAllEventsError());
  }
};

export const AddEvent = async (dispatch, event) => {
  try {
    const formData = new FormData();
    formData.append("Title", event.title);
    formData.append("Description", event.description);
    formData.append("Audience", event.audience);
    formData.append("Venue", event.venue);
    formData.append("Start", event.start);
    formData.append("End", event.end);

    const response = await axiosInstance.post("/Events/Create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.isPostSucceed) {
      dispatch(addEvent(response.data));
      toast.success("Event added successfully");
    } else {
      dispatch(setErrorMessage(response.data.message));
      toast.error(response.data.message);
    }
    return response.data.isPostSucceed;
  } catch (error) {
    console.error("Error:", error);
    dispatch(
      setErrorMessage(
        error.response.data || "An error occurred on the server.",
      ),
    );
    dispatch(addEventError(error.response.data));
    toast.error("An error occurred while adding the event");
  }
};

export const EditEvent = async (dispatch, event) => {
  try {
    const formData = new FormData();
    formData.append("Title", event.title);
    formData.append("Description", event.description);
    formData.append("Audience", event.audience);
    formData.append("Venue", event.venue);
    formData.append("Start", event.start);
    formData.append("End", event.end);

    const response = await axiosInstance.put(
      `/Events/Update/${event.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    if (response.data.isEditSucceed) {
      dispatch(editEvent(response.data));
      toast.success("Event updated successfully");
    } else {
      console.log(response.data);
      dispatch(setErrorMessage(response.data.message));
      toast.error(response.data.message);
    }
    return response.data.isEditSucceed;
  } catch (error) {
    console.error("Error:", error);
    dispatch(
      setErrorMessage(
        error.response.data || "An error occurred on the server.",
      ),
    );
    dispatch(editEventError(error.response.data));
    toast.error("An error occurred while adding the event");
  }
};

export const DeleteEvent = async (dispatch, id) => {
  try {
    await axiosInstance.delete(`Events/Delete/${id}`);
    dispatch(deleteEvent(id));
    toast.success("Event deleted successfully");
  } catch (error) {
    dispatch(deleteEventError());
    toast.error("An error occurred while deleting the event");
  }
};
