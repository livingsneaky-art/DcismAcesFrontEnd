import { toast } from "react-toastify";

import {
  addAlumniError,
  deleteAlumni,
  deleteAlumniError,
  editAlumniError,
  getAllAlumniError,
} from "../app/alumniSlice";
import { rejectCompanyError, verifyCompanyError } from "../app/companiesSlice";

const ToastMiddleware = () => (next) => (action) => {
  switch (action.type) {
    // alumni
    case deleteAlumni.type:
      toast.success("Alumna deleted successfully");
      break;
    case getAllAlumniError.type:
      toast.error("Error loading alumni");
      break;
    case addAlumniError.type:
    case editAlumniError.type:
    case deleteAlumniError.type:
      toast.error(action.payload);
      break;

    // Company
    // case verifyCompany.type:
    //     toast.success('Company updated successfully');
    //     break;
    // case rejectCompany.type:
    //     toast.success('Company deleted successfully');
    //     break;
    case rejectCompanyError.type:
    case verifyCompanyError.type:
      toast.error(action.payload);
      break;

    default:
      break;
  }
  return next(action);
};

export default ToastMiddleware;
