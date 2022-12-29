import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { DataGrid, GridToolbar} from '@mui/x-data-grid'
import { Box, Button } from '@mui/material'



function CohortSubmissions() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const submissions = useSelector(store => store.submissions.cohortSubmissionsReducer);

    console.log('💜submissions for cohort are ', submissions.cohortSubmissionsReducer);

    useEffect(() => {
        dispatch({
            type: 'FETCH_ASSIGNMENT_SUBMISSIONS',
            payload: {
                cohortId:params.cohortId,
                assignmentId:params.assignmentId
            }
        })
    },[])

    const columns = [
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
          },
        {
          field: 'firstName',
          headerName: 'First name',
          width: 150,
          editable: true,
        },
        {
          field: 'lastName',
          headerName: 'Last name',
          width: 150,
          editable: true,
        },
        {
          field: 'file',
          headerName: 'File',
          width: 110,
        },
        {
            field: 'text',
            headerName: 'Text',
            width: 110,
          },
          {
            field: 'video',
            headerName: 'Video',
            width: 110,
          },
        {
          field: 'notes',
          headerName: 'Notes',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 250,
          editable: true,
        },
      ];
      
      const rows = [];

      submissions.map(submission => {

          console.log('submission is ', submission)
          if(submission.assignmentId == params.assignmentId ){
            let studentSubmission =  {
                id: submission.studentId,
                status: '✅',
                firstName: submission.firstName,
                lastName: submission.lastName,
                file: submission.file,
                text: submission.text,
                video: submission.video
              } 
            rows.push(studentSubmission) 
          } else if(submission.assignmentId == null){
            let missingSubmission =  {
                id: submission.studentId,
                status: '❌',
                firstName: submission.firstName,
                lastName: submission.lastName,
                file: submission.file,
                text: submission.text,
                video: submission.video
              } 
            rows.push(missingSubmission)
          }
       
      })

    return(
        <>
            <h1>Submissions</h1>
            {submissions.map( submission => {
                <a href={submission.file}></a>
            })}
            <Box sx={{ height: 400, width: '90%', margin: 10 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[8]} 
              components={{
                Toolbar: GridToolbar
              }} 
            />
            </Box>
            
        </>

    )
}

export default CohortSubmissions;