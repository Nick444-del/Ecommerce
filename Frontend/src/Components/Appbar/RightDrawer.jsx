import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { NavLink } from 'react-router-dom';
import { IconButton, ListItem } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import ContactsIcon from '@mui/icons-material/Contacts';

const navigation = [
    {
        icon: <HomeIcon className='text-black'/>,
        url: '/',
        title: 'Home',
        text: 'text-[30px]',
    },
    {
        icon: <ProductionQuantityLimitsIcon className='text-black'/>,
        url: '/product',
        title: 'Product',
        text: 'text-[30px]',
    },
    {
        icon: <InfoIcon className='text-black'/>,
        url: '/about',
        title: 'About us',
        text: 'text-[30px]',
    },
    {
        icon: <ContactsIcon className='text-black'/>,
        url: '/contact',
        title: 'Contact',
        text: 'text-[30px]',
    }
]

export default function RightDrawer() {
    const [state, setState] = React.useState({
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
                                <ListItemIcon className="text-yellow-600">
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
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <IconButton onClick={toggleDrawer(anchor, true)}>
                        <MenuIcon className='text-black' />
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