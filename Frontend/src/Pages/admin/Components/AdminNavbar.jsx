import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LeftDrawer from './LeftDrawer';

export default function AdminNavbar() {
    const onLogout = () => {
        alert('logging out');
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <LeftDrawer />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ADMIN DASHBOARD
                    </Typography>
                    <Button color="inherit" onClick={onLogout}>Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
