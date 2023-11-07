import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import AnnouncementCard from '../../../components/announcementCard';
import { GetAlumniProfile } from '../../../services/alumni';
import AlumniUser from '../../../components/userCard/alumniCard';


const LandingPageAlumni = () => {
    const announcements = useSelector((state) => state.alumniUserSlice.announcements);

    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const data = await GetAlumniProfile(dispatch);
    //             console.log(data);
    //             setUserData(data);
    //         } catch (error) {
    //             console.error('Error fetching user profile:', error);
    //         }
    //     };

    //     fetchUserData();
    //     //  GetAllAnnouncements(dispatch);
    // }, [dispatch]);


    return (
        <div className='bg-slate-100 min-h-screen'>
            <div className='container mx-auto flex flex-col sm:flex-row py-4 gap-2'>
                <div className="flex flex-col sm:w-[25%]">
                    {userData && (
                        <AlumniUser user={userData} />
                    )}
                </div>
                <div className='sm:w-[75%]'>
                    {announcements.length === 0 ? (
                        <p className='mx-4 sm:mx-2'>No announcements available</p>
                    ) : (
                        announcements.map((announcement, index) => (
                            <AnnouncementCard key={index} announcement={announcement} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default LandingPageAlumni;
