import React from 'react'
import EditAlumniProfileContent from '../../components/alumni-company/EditAlumniProfileContent';


const A_EditProfile = () => {

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto flex flex-col justify-center sm:flex-row py-4 gap-2">
        <div className="flex flex-col sm:w-[80%]">
          <EditAlumniProfileContent />
        </div>
      </div>
    </div>
  );
}

export default A_EditProfile