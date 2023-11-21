import { Button, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import placeholder from "../../assets/placeholder.png"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { EditProfile, GetAlumniProfile } from "../../services/alumni";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { programs } from '../constant/helper';
import { FirstPage, Save } from "@mui/icons-material";
import { differenceInYears, parseISO } from 'date-fns';



const EditAlumniProfile = ({ profileData }) => {
    const [currentlySelectedImage, setCurrentlySelectedImage] = useState(null);
    const [genderError, setGenderError] = useState(false);
    const [birthdayError, setBirthdayError] = useState(false);
    const [ageError, setAgeError] = useState(false);
    const [employedError, setEmployedError] = useState(false);


    const [formValid, setFormValid] = useState(true);
    const [skillsInput, setSkillsInput] = useState('');
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        middleName: profileData.middleName || '',
        email: profileData.email || '',
        birthday: profileData.birthday || '',
        gender: profileData.gender || '',
        alumniAddress: profileData.alumniAddress || '',
        idNum: profileData.idNum || '',
        programCode: profileData?.courses[0]?.programCode || '',
        programDescription: profileData?.courses[0]?.programDescription || '',
        educationLevel: profileData?.courses[0]?.educationalLevel || '',
        skills: profileData.skills || [{ skill: '' }],
        resume: profileData.resume,
        picture: profileData.profileImage || '',
        syGraduated: profileData.syGraduated || '',
        mobileNumber: profileData.mobileNumber || '',
        isEmployed: profileData.isEmployed !== undefined ? profileData.isEmployed : false,
        companyName: profileData.isEmployed ? profileData.companyName || '' : '',
        companyAddress: profileData.isEmployed ? profileData.companyAddress || '' : '',
        occupation: profileData.isEmployed ? profileData.occupation || '' : '',
    });

    useEffect(() => {
        setSkillsInput(profileData.skills.map(skill => skill.skill).join(','));
    }, [profileData.skills]);


    const handleImageInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageData = event.target.result;
                setCurrentlySelectedImage(imageData);
                setUserData((prevUserData) => ({
                    ...prevUserData,
                    picture: file,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const finalValue = value === '' ? '' : value;

        const isMobileNumberEmpty = name === 'mobileNumber' && finalValue.trim() === '';
        const isAlumniAddressEmpty = name === 'alumniAddress' && finalValue.trim() === '';
        const isGenderEmpty = name === 'gender' && finalValue.trim() === '';
        const isBirthdayEmpty = name === 'birthday' && finalValue.trim() === '';
        const isSYGraduated = name === 'syGraduated' && finalValue.trim() === '';
        const isMiddleNameEmpty = name === 'middleName' && finalValue.trim() === '';
        const isEmployed = name === 'isEmployed' ? value === 'true' : userData.isEmployed;
        setGenderError(isGenderEmpty);
        setEmployedError(!isEmployed);


        if (name === 'gender') {
            setGenderError(false);
        }

        if (name === 'birthday') {
            setBirthdayError(false);
        }

        const isFormValid =
            !isMiddleNameEmpty &&
            !isMobileNumberEmpty &&
            !isAlumniAddressEmpty &&
            !isBirthdayEmpty &&
            !isSYGraduated &&
            !isGenderEmpty &&
            !isEmployed;


        setUserData(prevUserData => ({ ...prevUserData, [name]: finalValue }));

        if (name === 'isEmployed') {
            const isEmployed = finalValue === 'true';
            setUserData(prevUserData => ({
                ...prevUserData,
                isEmployed,
                companyName: isEmployed ? prevUserData.companyName : '',
                companyAddress: isEmployed ? prevUserData.companyAddress : '',
                occupation: isEmployed ? prevUserData.occupation : '',
            }));
            setEmployedError(false);
        }

        if (name === 'programCode') {
            const selectedProgram = programs.find(program => program.code === finalValue);
            if (selectedProgram) {
                let educationalLevel = "Bachelor";
                if (selectedProgram.description.startsWith("Master")) {
                    educationalLevel = "Master";
                } else if (selectedProgram.description.startsWith("Doctor")) {
                    educationalLevel = "Doctor";
                }
                setUserData(prevUserData => ({
                    ...prevUserData,
                    programDescription: selectedProgram.description,
                    programCode: selectedProgram.code,
                    educationLevel: educationalLevel,
                }));
            }
        }


        if (finalValue !== '') {
            setFormValid(isFormValid);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const isGenderEmpty = userData.gender?.trim() === '';
        const isBirthdayEmpty = userData.birthday?.trim() === '';
        const isEmployedEmpty = typeof userData.isEmployed !== 'boolean';
        const isBirthdayBelow18 = differenceInYears(new Date(), parseISO(userData.birthday)) < 18;

        if (isGenderEmpty || isBirthdayEmpty || isBirthdayBelow18 || isEmployedEmpty) {
            setFormValid(false);
            setGenderError(isGenderEmpty);
            setBirthdayError(isBirthdayEmpty);
            setAgeError(isBirthdayBelow18);
            setEmployedError(isEmployedEmpty);
            return;
        }

        setFormValid(true);
        const skillsArray = skillsInput.split(/[,\n]/);
        const updatedSkills = skillsArray.map((skill) => ({ skill: skill.trim() }));
        const filteredSkills = updatedSkills.filter((skill) => skill.skill !== '');

        const updatedFormData = {
            ...userData,
            skills: filteredSkills,
        };
        console.log(updatedFormData);
        const isEditSucceed = await EditProfile(dispatch, updatedFormData);

        if (isEditSucceed) {
            const profileData = await GetAlumniProfile(dispatch);
            setUserData({
                ...userData,
                skills: profileData.skills,
                picture: profileData.profileImage,
            });
            await new Promise(resolve => setTimeout(resolve, 3000));
            navigate('/alumni/profile');
        }
    };

    const navigate = useNavigate();

    const handleSkillsChange = (e) => {
        setSkillsInput(e.target.value);
    };


    return (
        <form>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
                <div className="flex flex-col mx-auto justify-center items-center text-center">
                    <>
                        <label htmlFor="fileInput">
                            <input
                                type="file"
                                id="fileInput"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleImageInputChange}
                            />
                            <img
                                src={currentlySelectedImage || `data:image/jpeg;base64,${userData.picture}` || placeholder}
                                alt="User Profile"
                                style={{ width: 100, height: 100, borderRadius: "50%", cursor: "pointer" }}
                            />

                        </label>
                        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1, marginLeft: "2rem" }}>
                            Click the placeholder for adding image.
                        </Typography>
                    </>
                </div>

                <div className="flex flex-col text-[12px] space-y-2">
                    <div className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg">
                        <p className="font-bold ">Personal Information</p>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">First Name: </label>
                            <div className="flex-1">
                                <TextField
                                    type="text"
                                    name="firstName"
                                    placeholder='Input your First Name'
                                    value={userData?.firstName}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    fullWidth
                                    className="mb-2"
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Last Name: </label>
                            <div className="flex-1">
                                <TextField
                                    type="text"
                                    name="lastName"
                                    placeholder='Input your Last Name'
                                    value={userData?.lastName}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    fullWidth
                                    className="mb-2"
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Middle Name: </label>
                            <div className="flex-1">
                                <TextField
                                    type="text"
                                    name="middleName"
                                    placeholder="Input your Middle Name"
                                    value={userData?.middleName || ''}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    fullWidth
                                    error={!formValid && userData.middleName === ''}
                                    helperText={!formValid && userData.middleName === '' && 'Middle Name is required'}
                                    className="mb-2"
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Gender: </label>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    name="gender"
                                    value={userData.gender}
                                    onChange={handleInputChange}
                                >
                                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                </RadioGroup>
                            </FormControl>

                            {genderError && (
                                <p className="text-red-500 text-xs">Please select a gender.</p>
                            )}
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Date of Birth: </label>
                            <div className="flex-col flex-1 items-start">
                                <input
                                    type="date"
                                    value={userData?.birthday ? userData.birthday.split("T")[0] : ""}
                                    onChange={(e) => setUserData({ ...userData, birthday: e.target.value })}
                                    className="w-[100%] h-[50px] bg-white border border-slate-200 p-5 rounded-md"
                                    name="birthday"
                                />
                                {birthdayError && (
                                    <p className="text-red-500 text-xs">Please select a date.</p>
                                )}
                                {ageError && (
                                    <p className="text-red-500 text-xs">Age must be 18 or above.</p>
                                )}
                            </div>

                        </div>

                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Address: </label>
                            <div className="flex-1">
                                <TextField
                                    type="text"
                                    name="alumniAddress"
                                    placeholder="Input your Current Address"
                                    value={userData?.alumniAddress || ''}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    fullWidth
                                    error={!formValid && userData.alumniAddress === ''}
                                    helperText={!formValid && userData.alumniAddress === '' && 'Your Address is required'}
                                    className="mb-2"
                                />
                            </div>
                        </div>
                        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
                        <p className="font-bold ">Account Information</p>

                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">USC ID: </label>
                            <p className="font-bold "> {userData?.idNum}</p>
                        </div>

                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Email Address: </label>
                            <p className="font-bold "> {userData?.email}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Contact Number: </label>
                            <div className="flex-1">
                                <TextField
                                    type="text"
                                    name="mobileNumber"
                                    placeholder="Input your Contact Number"
                                    value={userData?.mobileNumber || ''}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    fullWidth
                                    error={!formValid && userData.mobileNumber === ''}
                                    helperText={!formValid && userData.mobileNumber === '' && 'Contact Number is required'}
                                    className="mb-2"
                                />
                            </div>
                        </div>
                        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
                        <p className="font-bold ">Academic Information</p>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Course Program: </label>
                            <div className="flex-1">

                                {(userData?.courses?.length === 0) ? (
                                    <Select
                                        id="program"
                                        value={userData.programCode || ''} // Update this line
                                        onChange={(e) => {
                                            const selectedProgramDescription = e.target.value;
                                            const selectedProgram = programs.find(program => program.description === selectedProgramDescription);
                                            if (selectedProgram) {
                                                let educationalLevel = "Bachelor";
                                                if (selectedProgramDescription.startsWith("Master")) {
                                                    educationalLevel = "Master";
                                                } else if (selectedProgramDescription.startsWith("Doctor")) {
                                                    educationalLevel = "Doctor";
                                                }
                                                setUserData({
                                                    ...userData,
                                                    programDescription: selectedProgram.description,
                                                    programCode: selectedProgram.code,
                                                    educationLevel: educationalLevel,
                                                });
                                            }
                                        }}
                                        variant="outlined"
                                        fullWidth
                                        required
                                    >
                                        {programs.map((program) => (
                                            <MenuItem key={program.code} value={program.code}>
                                                {program.description}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                ) : (
                                    <p className="font-bold">
                                        {userData.programDescription}
                                    </p>

                                )}
                            </div>
                        </div>
                        <div className="flex items-center my-2">
                            <label className="text-[12px] w-[100px]">Year Graduated: </label>
                            <div className="flex-1">
                                <TextField
                                    type="number"
                                    placeholder='What class batch you graduated'
                                    name="syGraduated"
                                    value={userData?.syGraduated || ''}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    fullWidth
                                    error={!formValid && userData.syGraduated === ''}
                                    helperText={!formValid && userData.syGraduated === '' && 'School Year is required'}
                                    className="mb-2"
                                />
                            </div>
                        </div>

                        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
                        <p className="font-bold ">Work Information</p>


                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Employment Status: </label>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    row
                                    aria-label="isEmployed"
                                    name="isEmployed"
                                    value={userData.isEmployed}
                                    onChange={handleInputChange}
                                >
                                    <FormControlLabel value="true" control={<Radio />} label="Employed" />
                                    <FormControlLabel value="false" control={<Radio />} label="Unemployed" />
                                </RadioGroup>
                            </FormControl>

                            {employedError && (
                                <p className="text-red-500 text-xs">Please select a status.</p>
                            )}
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Company Name: </label>
                            <div className="flex-1">
                                <TextField
                                    type="text"
                                    placeholder='Type the company name'
                                    name="companyName"
                                    value={userData?.companyName}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    fullWidth
                                    className="mb-2"
                                    disabled={!userData.isEmployed}

                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Company Address: </label>
                            <div className="flex-1">
                                <TextField
                                    type="text"
                                    placeholder='Type the company address'
                                    name="companyAddress"
                                    value={userData?.companyAddress}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    fullWidth
                                    className="mb-2"
                                    disabled={!userData.isEmployed}

                                />
                            </div>

                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Occupation: </label>
                            <div className="flex-1">
                                <TextField
                                    type="text"
                                    placeholder='Type your position in the company'
                                    name="occupation"
                                    value={userData?.occupation}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    fullWidth
                                    className="mb-2"
                                    disabled={!userData.isEmployed}

                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Add Skills: </label>
                            <div className="flex-1">
                                <textarea
                                    value={skillsInput}
                                    onChange={handleSkillsChange}
                                    placeholder="Enter skills separated by commas or new lines"
                                    className="w-[100%] h-[80px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
                        <div className="flex items-center">
                            <>
                                <label className="flex mr-2">{userData?.resume ? "Change Resume File" : "Add Resume"}</label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setUserData({ ...userData, resume: e.target.files[0] })}
                                />
                            </>
                        </div>

                        <div className="flex items-center px-6 mt-6">
                            <div className='flex gap-10 flex-1 justify-end'>
                                <>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        size="medium"
                                        style={{
                                            backgroundColor: "#3da58a",
                                            color: "#dbf5ee",
                                        }}
                                        onClick={handleSubmit}
                                        startIcon={<Save />}
                                    >
                                        Save Changes
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        size="medium"
                                        onClick={() => navigate(-1)}
                                        startIcon={<FirstPage />}
                                    >
                                        Back
                                    </Button>
                                </>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default EditAlumniProfile;