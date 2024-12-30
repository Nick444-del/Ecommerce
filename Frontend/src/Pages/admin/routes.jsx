import { MdCategory, MdDashboard, MdOutlineShoppingBag } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { FaProductHunt } from "react-icons/fa";
const routes = [
    {
        url: '/bookwormdenn/admin/dashboard',
        label: "Dashboard",
        icon: <MdDashboard size={22} />,
        hasChild:false,
    },
    {
        url: '/bookwormdenn/admin/userslist',
        label: "Users",
        icon: <FaUsers size={22} />,
        hasChild:false
    },
    {
        url: '/bookwormdenn/admin/productslist',
        label: "Products",
        icon: <FaProductHunt size={22} />,
        hasChild:false
    },
    {
        url: '/bookwormdenn/admin/categorieslist',
        label: "Categories",
        icon: <MdCategory size={22} />,
        hasChild:false
    },
    {
        url: '/bookwormdenn/admin/orderslist',
        label: "Orders",
        icon: <MdOutlineShoppingBag  size={22} />
    }

]

export default routes