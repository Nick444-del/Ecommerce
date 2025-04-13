import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import UserIcon from '@mui/icons-material/Person';


const routes = [
    {
        urL: '/bookwormdenn/admin/userslist',
        title: 'Users',
        icon: <UserIcon />,
        iconcolor: 'text-blue',
        hasChild: false,
    },
    {
        urL: 'bookwormdenn/admin/categorieslist',
        title: 'Categories',
        icon: <CategoryIcon />,
        iconcolor: 'text-blue',
        hasChild: false,
    },
    {
        urL: 'bookwormdenn/admin/productslist',
        title: 'Products',
        icon: <InventoryIcon />,
        iconcolor: 'text-blue',
        hasChild: false,
    }
]

export default routes