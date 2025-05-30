import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { ListItem, IconButton } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import UserIcon from '@mui/icons-material/Person';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
// import routes from '../routes';

const navigation = [
    {
        icon: <UserIcon />,
        url: '/bookwormdenn/admin/userslist',
        title: 'Users List',
        iconcolor: 'text-blue'
    },
    {
        icon: <CategoryIcon />,
        url: '/bookwormdenn/admin/categorieslist',
        title: 'Categories List',
        iconcolor: 'text-red'
    },
    {
        icon: <InventoryIcon />,
        url: '/bookwormdenn/admin/productslist',
        title: 'Products List',
        iconcolor: 'text-brown'
    },
    {
        icon: <ShoppingCartCheckoutIcon />,
        url: '/bookwormdenn/admin/orderslist',
        title: 'Orders List',
        iconcolor: 'text-green'
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

                    // routes.map((index) => (
                    //     <ListItem key={index.title} disablePadding>
                    //         <ListItemButton component={NavLink} to={index.urL}>
                    //             <ListItemIcon className={index.iconcolor}>
                    //                 {index.icon}
                    //             </ListItemIcon>
                    //             <ListItemText primary={index.title} />
                    //         </ListItemButton>
                    //     </ListItem>
                    // ))
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
