import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import {
  GetAllAnnouncements,
  GetAlumniProfile,
} from "../../../services/alumni";
import AlumniUser from "../../../components/userCard/alumniCard";
import AnnouncementCard from "../../../components/cards/announcementCard";

const LandingPageAlumni = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const announcementsPerPage = 5;

  const announcements = useSelector(
    (state) => state.alumniUserSlice.announcements,
  );
  const userData = useSelector((state) => state.alumniUserSlice.alumniProfile);

  const dispatch = useDispatch();

  useEffect(() => {
    GetAlumniProfile(dispatch);
    GetAllAnnouncements(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (announcements.length > 0) {
      const totalPagesCount = Math.ceil(
        announcements.length / announcementsPerPage,
      );
      setTotalPages(totalPagesCount);
    }
  }, [announcements]);

  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement =
    indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = announcements.slice(
    indexOfFirstAnnouncement,
    indexOfLastAnnouncement,
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto flex flex-col sm:flex-row py-4 gap-2">
        <div className="flex flex-col sm:w-[25%]">
          {userData && <AlumniUser user={userData} />}
        </div>
        <div className="sm:w-[75%]">
          {currentAnnouncements.length === 0 ? (
            <p className="mx-4 sm:mx-2">No announcements available</p>
          ) : (
            currentAnnouncements.map((announcement, index) => (
              <AnnouncementCard key={index} announcement={announcement} />
            ))
          )}

          {announcements.length > 0 && (
            <div className="pagination flex items-center gap-3 ml-5">
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

export default LandingPageAlumni;
