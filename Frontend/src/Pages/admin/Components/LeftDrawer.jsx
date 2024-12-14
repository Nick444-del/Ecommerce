import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { ListItem, IconButton } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import UserIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import { NavLink } from 'react-router-dom';

const navigation = [
    {
        icon: <UserIcon />,
        url: '/bookwormdenn/admin/dashboard/userslist',
        title: 'Users List',
        iconcolor: 'text-blue'
    },
    {
        icon: <CategoryIcon />,
        url: '/bookwormdenn/admin/dashboard/categorieslist',
        title: 'Categories List',
        iconcolor: 'text-red'
    },
    {
        icon: <InventoryIcon />,
        url: '/bookwormdenn/admin/dashboard/productslist',
        title: 'Products List',
        iconcolor: 'text-brown'
    }
]

export default function LeftDrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {
                    navigation.map((index) => (
                        <ListItem key={index.title} disablePadding>
                            <ListItemButton component={NavLink} to={index.url}>
                                <ListItemIcon className={index.iconcolor}>
                                    {index.icon}
                                </ListItemIcon>
                                <ListItemText primary={index.title} />
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    );

    return (
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <IconButton onClick={toggleDrawer(anchor, true)}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
