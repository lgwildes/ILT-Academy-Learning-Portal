import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Box, Button, Link, Popper, Paper, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Stack from '@mui/material/Stack';
import moment from "moment/moment";
import HHHimage from "../Hacker/HHHimage";

function StudentProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const cohortInfo = useSelector(store => store.cohorts.singleCohortReducer);
  const submissions = useSelector(store => store.assignments.studentAssignmentsReducer);
  const student = useSelector(store => store.student);
  const user = useSelector(store => store.user);

  //Name, Username, Cohort, HHH, Bio, Email, Orientation status, Submissions
  // user - firstName, lastName, username, cohortId, hipsterInterest, hackerInterest,  hustlerInterest, hipsterSkill, hackerSkill, hustlerSkill, oriented
  // submissions - all
  // cohorts - cohortName

  useEffect(() => {
    dispatch({
      type: 'FETCH_COHORT',
      payload: params.cohortId
    });
    dispatch({
      type: 'FETCH_STUDENT',
      payload: params.username
    })
    dispatch({
      type: 'FETCH_STUDENT_ASSIGNMENTS',
      payload: params.username
    })

  }, [params.username], [user.id])


  const columns = [
    {
      field: 'assignmentName',
      headerName: 'Assignment',
      width: 150,
    },
    {
      field: 'file',
      headerName: 'File',
      width: 150,
      renderCell: (params) => {
        if (params.value != null) {
          return <Link href={`${params.row.file}`}>Download File</Link>
        }

      }

    },
    {
      field: 'text',
      headerName: 'Text',
      width: 150,
    },
    {
      field: 'video',
      headerName: 'Video',
      width: 130,
      renderCell: (params) => {
        if (params.value != null) {
          return <Link href={`${params.row.video}`}>View Video</Link>
        }

      }
    },
    {
      field: 'dateSubmitted',
      headerName: 'Date Submitted',
      width: 250,
    },
  ]

  const rows = [];

  submissions.map(submission => {
    let studentSubmissions = {
      id: submission.submissionId,
      assignmentName: submission.assignmentName,
      file: submission.file,
      text: submission.textInput,
      video: submission.video,
      dateSubmitted: moment(submission.submissionDate).format('MMMM Do YYYY, h:mm:ss a'),
    }
    rows.push(studentSubmissions)
  })

  // map through student's assignments to display submitted/unsubmitted details



  return (
    <>

      

      <Box backgroundColor='secondary.light' sx={{ padding: 2, margin: 8, mt: 18}} borderRadius={2}>
        <Box backgroundColor='secondary.main' sx={{ margin: 2, padding: 2, }} borderRadius={2}>
          <Grid2 container sx={{display:'flex', flexDirection:'column', alignItems:'center' }}>
          <Grid2 item xs={8} >
          <Typography textAlign='center' sx={{margin: 'auto'}} variant="h1" color='primary.main'>{student.firstName} {student.lastName}</Typography>
          </Grid2>
          <Grid2 item xs={4} >

          <Typography textAlign='center' sx={{margin: 2, mt: 5.8}} variant="h2" color='primary.light'>Cohort: {cohortInfo.cohortName}</Typography>
          </Grid2>
          <Grid2 item xs={12} >
          <Typography textAlign='center' sx={{margin: 4, mt: 2}} variant="body1" color='primary.contrastText'>{user.aboutMe}</Typography>
          </Grid2>
          <Grid2 item xs={12} margin='auto' >
            

            {
                student.id ?
                    <HHHimage student={student}/>
                :
                null
            }

          </Grid2>
          </Grid2>
        </Box>
        <Grid2 container>
          

          {/* student's assignments */}
          <Grid2 item xs={12}>
            <Box backgroundColor='secondary.contrastText' sx={{ height: 640, margin: 2, borderRadius: 1 }}>
              <DataGrid
                sx={{
                  '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '8px' }, //this adds padding to 'auto' height
                  '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '15px' },
                  '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '22px' },
                }}
                rows={rows}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[8]}
                getRowHeight={() => 'auto'}
                components={{
                  Toolbar: GridToolbar
                }}
              />
            </Box>
          </Grid2>
        </Grid2>
      </Box>
      {user.id === 1 ?
        <Button variant="outlined" sx={{margin: 8, mt: 0}}
          onClick={() => history.push(`/admin/cohort/${cohortInfo.id}`)}>Back to Cohort</Button>
        :
        <Button variant="outlined" sx={{margin: 8, mt: 0}}
          onClick={() => history.push(`/studentportal`)}>Back to Dashboard</Button>
      }


    </>
  )
}

export default StudentProfile;