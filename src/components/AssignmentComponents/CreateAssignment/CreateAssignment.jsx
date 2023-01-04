import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios";
import FormData from "form-data";
const Swal = require('sweetalert2');

//MUI imports
import { PrimaryMainTheme } from "../../PrimaryMainTheme/PrimaryMainTheme";
import { ThemeProvider } from '@mui/system';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {
    TextareaAutosize,
    Typography,
    FormLabel,
    Radio,
    RadioGroup,
    Input,
    Box,
    OutlinedInput,
    InputLabel,
    MenuItem,
    FormControl,
    FormControlLabel,
    Select
} from '@mui/material'

function CreateAssignment() {
    //import user
    const user = useSelector(store => store.user);
    //setup
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();

    // console.log(user.accessLevel)
    // import useState and create state for selected file on video upload
    const [assignmentVideo, setAssignmentVideo] = useState('');
    //use usestate to track content of WYSIWYG
    const [assignmentContent, setAssignmentContent] = useState('');
    //useState to track assignment title
    const [assignmentTitle, setAssignmentTitle] = useState('');

    //submission types
    const [textField, setTextField] = useState(false);
    const [fileSubmission, setFileSubmission] = useState(false);
    const [postClass, setPostClass] = useState(false);
    const [videoSubmission, setVideoSubmission] = useState(false);
    const [orientation, setOrientation] = useState(false);

    const submitAssignment = (evt) => {
        evt.preventDefault();
        console.log('in submit assignment');
        //ensure there is content in the WYSIWYG
        if (assignmentContent.length <= 10) {
            alert('Must put content into the assignment');
            return
        }

        //dispatch to the SAGA for serverpost route
        dispatch({
            type: 'CREATE_ASSIGNMENT',
            payload: {
                assignmentVideo,
                assignmentContent,
                assignmentTitle,
                moduleId: params.moduleId,
                postClass,
                textField,
                // name to match database, lef as submission so there isnt confusion on this page
                file: fileSubmission,
                video: videoSubmission,
                seriesId: params.seriesId,
                ThemeProvider,

            }
        })
        //push to modules view
        Swal.fire('Success!')
            .then((result) => {
                history.push(`/admin/modules/${params.seriesId}`);
            })
    }


    // console.log('assignmentcontent', assignmentContent);


    const handleImageUploadBefore = (files, info, uploadHandler) => {
        // uploadHandler is a function
        // console.log(files, info)

        const callBack = async () => {
            let formData = new FormData();
            formData.append('image', files[0]);
            const response = await axios.post('/api/assignments/imagefield', formData, {
                //must include this header, it is what Multer uses to id file
                headers: {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            });
            console.log('response', response.data);
            uploadHandler(response.data);
        }

        callBack();
        // uploadHandler();

    }

    const handleChange = (content) => {
        setAssignmentContent(content);
    }

    console.log('postclass:', postClass);

    //testing logs
    // console.log('submission types, textfield:', textField, 'fileSubmission', fileSubmission);
    // console.log('pre class should be false:', postClass);
    // console.log('video submission', videoSubmission);
    return (
        <>
            <ThemeProvider theme={PrimaryMainTheme}>
                <Typography variant="h2" sx={{ textAlign: 'center' }}>Create New Assignment</Typography>
                <Box sx={{ backgroundColor: '#80808017', margin: '1rem', borderRadius: '10px' }}>
                    <form onSubmit={submitAssignment}>
                        <Grid2 container spacing={2}>
                            <Grid2 item sm={1}></Grid2>
                            <Grid2 item sm={4}>
                                <InputLabel
                                    color='primary'
                                    sx={{
                                        color: '#f96b61',
                                        fontWeight: 'bold',
                                        marginBottom: 0,
                                        fontSize: '22px'
                                    }}
                                >
                                    Assignment Name
                                </InputLabel>
                                <OutlinedInput
                                    sx={{ marginTop: 0, backgroundColor: 'white', fontSize: '20px' }}
                                    required
                                    type='text'
                                    placeholder="Assignment Name"
                                    onChange={(evt) => setAssignmentTitle(evt.target.value)}
                                    autoFocus
                                    variant='outligned'
                                    require
                                />
                            </Grid2>
                            <Grid2 item sm={7} >

                                <InputLabel
                                    sx={{
                                        color: '#f96b61',
                                        fontWeight: 'bold',
                                        marginBottom: 0,
                                        fontSize: '22px'
                                    }}
                                >
                                    Upload Video
                                </InputLabel>
                                <OutlinedInput
                                    sx={{
                                        marginTop: 0, backgroundColor: 'white', fontSize: '20px'
                                    }}
                                    accept="video/*"
                                    type='file'
                                    name="selectedVideo"
                                    inputProps={{ accept: 'video/*' }}
                                    onChange={(evt) => setAssignmentVideo(evt.target.files[0])}
                                    color='primary'
                                />
                            </Grid2>
                        </Grid2>
                        <Grid2 container spacing={2}>
                            <Grid2 item sm={1}></Grid2>
                            <Grid2 item sm={2}>
                            </Grid2>
                        </Grid2>
                        <Grid2 container spacing={2}>
                            <Grid2 item sm={1}></Grid2>
                            <Grid2 item sm={10}>
                                <SunEditor
                                    onChange={handleChange}
                                    setOptions={{
                                        height: 500,
                                        buttonList: [
                                            ['font', 'align'],
                                            ['fontSize'],
                                            ['italic'],
                                            ['bold'],
                                            ['underline'],
                                            ['video'],
                                            ['image'],
                                        ],
                                        // videoResizing: false,
                                        videoHeightShow: false,
                                        videoWidthShow: false,
                                        videoFileInput: false,
                                        videoUrlInput: false,
                                        videoRatioShow: false,
                                        videoWidth: "603px",
                                        videoHeight: "339px",
                                        // videoPadding: "0px",
                                        // videoIframeAttrs: {
                                        //     style: "max-width: 900px; padding-bottom: -339px;"
                                        // },
                                    }}
                                    onImageUploadBefore={handleImageUploadBefore}
                                //  setContents={content}
                                />
                            </Grid2>

                        </Grid2>
                        <FormControl>
                            <FormLabel>Pre/Post-Class?</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue=""
                                name="radio-buttons-group"
                                require
                            >
                                <FormControlLabel                                 
                                    control={<Radio required/>} 
                                    value={false}
                                    onChange={(evt) => setPostClass(evt.target.value)}
                                    label="Pre-Class" 
                                    
                                />
                                <FormControlLabel 
                                    control={<Radio required/>} 
                                    value={true}
                                    onChange={(evt) => setPostClass(evt.target.value)}
                                    label="Post-Class" 
                                    
                                />
                            </RadioGroup>

                        </FormControl>
                        {/* <div>
                            <label>Pre Class</label>
                            <input defaultChecked onClick={() => setPostClass(false)} type="radio" name="classType" className="valueRadio"></input>
                            <label>Post Class</label>
                            <input onClick={() => setPostClass(true)} type="radio" name="classType" className="valueRadio"></input>                            
                        </div> */}
                        <div>
                            <h3>Submission type</h3>
                            <label>Textfield</label>
                            <input onClick={() => setTextField(!textField)} type="checkbox" name="textField" className="valueRadio"></input>
                            <label>File</label>
                            <input onClick={() => setFileSubmission(!fileSubmission)} type="checkbox" name="fileSubmission" className="valueRadio"></input>
                            <label>Video</label>
                            <input onClick={() => setVideoSubmission(!videoSubmission)} type="checkbox" name="fileSubmission" className="valueRadio"></input>
                        </div>


                        <button type="submit">Create Assignment</button>
                    </form>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default CreateAssignment






// const getVideo = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: { width: 300 } })
//       .then(stream => {
//         let video = videoRef.current;
//         video.srcObject = stream;
//         video.play();
//       })
//       .catch(err => {
//         console.error("error:", err);
//       });
//   };

//   const videoRef = useRef(null);


// <button>Take selfie</button>
//                 <video ref={videoRef}></video>
//                 <input 
//                     capture="camera"                
//                     type='file' 
//                     name="assignment_video"
//                     // onChange = {changeHandler}
//                 />

//                 useEffect(() => {
//                     getVideo();
//                   }, [videoRef]);