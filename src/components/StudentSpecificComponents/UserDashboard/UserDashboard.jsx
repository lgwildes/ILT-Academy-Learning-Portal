import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Card, Box, Button } from '@mui/material';
import CalendarList from '../../Calendar/CalendarList/CalendarList';
import Announcements from '../../Announcements/Announcements';


function UserDashboard(){
    //get user info for cohortId
    const user = useSelector((store) => store.user);
    const orientationList = useSelector((store) => store.orientation.orientationReducer);
    //setup dispatch and useHistory
    const dispatch = useDispatch();
    const history = useHistory();

    let username = user.username;
    let cohortId = user.cohortId;
    
    //reroute to hipster hacker hustler / orientation if it isnt complete
    {
        user.oriented <= orientationList.length 
        && user.hipsterInterest === 0 
        && user.hipsterSkill === 0 
        && user.hackerInterest === 0 
        && user.hackerSkill === 0 
        && user.hustlerInterest === 0 
        && user.hustlerSkill === 0
        ? history.push('/user') 
        : null
    };

    useEffect(() => {
        //get assigned series for the render;
        dispatch({
            type: 'FETCH_ORIENTATION'
        });
    },[])


;
    return(
        // <div className="container">
        <Box sx={{ flexGrow: 1 }}>
        <Grid2 container spacing={2} >
            <Grid2 item xs={4}>
                <Box sx={{ minWidth: 200, maxWidth: 325, maxHeight: 500, margin: 'auto', }}>
                    <Button
                    variant='contained'
                    onClick={() => history.push(`/profile/${username}/${cohortId}`)}
                    >My Profile</Button>
                    <p>Hacker (todo: connect this to usertable!)</p>
                </Box>
                <Box sx={{ backgroundColor: 'grey', maxHeight: 400, width: .8, maxHeight: 400, marginLeft: 'auto', marginRight: 'auto', marginTop:0, padding:1}}>
                    <h2>Office Hours</h2>
                    <ul>
                        <li>Ramirez: M 2-4, R 3-5</li>
                        <li>Jamison: T 1-2, F 3-5</li>
                    </ul>
                </Box>
                <Box sx={{ minWidth: 200, maxWidth: 325, minHeight: 400, maxHeight: 500, margin: 'auto', }}>
                    <CalendarList />
                </Box>
            </Grid2>
            <Grid2 item xs={6.5} className='cohortCard'>     
                <Box sx={{ backgroundColor: 'grey', height: 'fit-content', minWidth: 200, width: 1, marginLeft: 'auto', marginRight: 'auto', marginTop:1, }}>
                    <Announcements />
                </Box>
            </Grid2>
        <Grid2 item xs={1.5}>
            <Button 
            variant='outlined'
            onClick={()=> {
                window.location.href = "https://gather.town/app/QUkwAkENtpBq8fvW/ILTAcademy"
            }}>
                Live Virtual Academy
            </Button>
            <Button 
             variant='outlined'
            onClick={()=> {
                window.location.href = "https://app.mural.co/invitation/mural/iltstudios1127/1643835923197?sender=uad537750285006409c4e5090&key=41cede5b-6c1a-4e08-bafe-7f708491dcc2"
            }}>
                Community Board
            </Button>
            <Button 
             variant='outlined'
            onClick={()=> {
                window.location.href = "https://iltacademy-founders.slack.com/"
            }}>
                Slack
            </Button>

        </Grid2>
        </Grid2>
        </Box>
        // </div>
    )
};

export default UserDashboard;