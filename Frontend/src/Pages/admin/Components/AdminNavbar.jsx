import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LeftDrawer from './LeftDrawer';
import { useNavigate } from 'react-router-dom';

export default function AdminNavbar() {
    const navigate = useNavigate();

    const onLogout = () => {
        alert('logging out');
        localStorage.clear()
        localStorage.removeItem("token")
        navigate('/bookwormdenn/admin')
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <LeftDrawer className="my-2" />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ADMIN DASHBOARD
                    </Typography>
                    <Button color="inherit" onClick={onLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
