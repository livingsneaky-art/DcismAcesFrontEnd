import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetAllEvents, GetCompanyProfile } from "../../../services/company";
import CompanyUser from "../../../components/userCard/companyCard";
import EventsCard from "../../../components/cards/eventCard";

const CompanyEvents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const eventsPerPage = 5;

  const dispatch = useDispatch();

  const events = useSelector((state) => state.companyUserSlice.events);
  const userData = useSelector(
    (state) => state.companyUserSlice.companyProfile,
  );

  useEffect(() => {
    GetCompanyProfile(dispatch);
    GetAllEvents(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (events.length > 0) {
      const totalPagesCount = Math.ceil(events.length / eventsPerPage);
      setTotalPages(totalPagesCount);
    }
  }, [events]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto flex flex-col sm:flex-row py-4 gap-2">
        <div className="flex flex-col sm:w-[25%]">
          {userData && <CompanyUser user={userData} />}
        </div>
        <div className="sm:w-[75%]">
          {currentEvents.length === 0 ? (
            <p className="mx-4 sm:mx-2">No scheduled events available</p>
          ) : (
            currentEvents.map((event, index) => (
              <EventsCard key={index} events={event} />
            ))
          )}
          {events.length > 0 && (
            <div className="pagination flex items-center gap-3">
              <label>Page Number: </label>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`${
                      currentPage === number
                        ? "bg-[#221769] text-white"
                        : "bg-gray-300 text-gray-700"
                    } font-semibold px-3 py-1 rounded-full mx-1`}
                  >
                    {number}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyEvents;
