import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../Components/utils/axiosInstance';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const Dashboard = () => {
    const [user, setUser] = useState([]);
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [order, setOrder] = useState([]);

    const dataFetch = async () => {
        try {
            const [userRes, productRes, categoryRes, orderRes] = await Promise.all([
                axiosInstance.get('/getalluserstoadmin'),
                axiosInstance.get('/totalproducts'),
                axiosInstance.get('/getallcategory'),
                axiosInstance.get('/getallorder'),
            ]);
            setUser(userRes.data.data);
            setProduct(productRes.data.data);
            setCategory(categoryRes.data.data);
            setOrder(orderRes.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        dataFetch();
    }, []);

    const stats = [
        { title: 'Users', count: user.length, icon: <PersonIcon sx={{ fontSize: 50, color: 'primary.main' }} /> },
        { title: 'Products', count: product.length, icon: <InventoryIcon sx={{ fontSize: 50, color: 'primary.main' }} /> },
        { title: 'Categories', count: category.length, icon: <CategoryIcon sx={{ fontSize: 50, color: 'primary.main' }} /> },
        { title: 'Orders', count: order.length, icon: <ShoppingCartCheckoutIcon sx={{ fontSize: 50, color: 'primary.main' }} /> },
    ];

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Admin Dashboard
            </Typography>
            <Grid container spacing={3}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ textAlign: 'center', padding: 2, boxShadow: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                                    {stat.icon}
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {stat.title}
                                </Typography>
                                <Typography variant="h4" sx={{ mt: 1, fontWeight: 'medium', color: 'text.secondary' }}>
                                    {stat.count}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Dashboard;
