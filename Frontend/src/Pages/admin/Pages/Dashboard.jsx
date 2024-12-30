import React, { useState, useEffect } from 'react'
import axiosInstance from '../../../Components/utils/axiosInstance'
import { Card, CardContent, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';

const Dashboard = () => {
    const [user, setUser] = useState([])
    const [product, setProduct] = useState([])
    const [caregory, setCategory] = useState([])

    const dataFetch = async () => {
        try {
            const userresponse = await axiosInstance.get('/getallusers')
            const categoryresponse = await axiosInstance.get('/getallcategory')
            const productresponse = await axiosInstance.get('/getallproduct')
            setUser(userresponse.data.data)
            setProduct(productresponse.data.data)
            setCategory(categoryresponse.data.data)
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }

    useEffect(() => {
        dataFetch()
    }, [])

    return (
        <div>
            <h1 className='text-3xl font-semibold text-gray-800 m-2'>Dashboard</h1>
            <div className="card-container grid lg:grid-cols-5 grid-cols-1">
                <Card className="user-card" sx={{ maxWidth: 345, margin: 2, padding: 2 }}>
                    <CardContent>
                        <div className="card-header" style={{ display: 'flex', alignItems: 'center' }}>
                            <PersonIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                            <Typography variant="h5" component="div" sx={{ marginLeft: 2 }}>
                                Users
                            </Typography>
                        </div>
                        <Typography variant="h6" sx={{ marginTop: 2 }}>
                            {user.length} Users
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="user-card" sx={{ maxWidth: 345, margin: 2, padding: 2 }}>
                    <CardContent>
                        <div className="card-header" style={{ display: 'flex', alignItems: 'center' }}>
                            <PersonIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                            {/* <AiFillProduct sx={{ fontSize: 40, color: 'primary.main' }} /> */}
                            <Typography variant="h5" component="div" sx={{ marginLeft: 2 }}>
                                Product
                            </Typography>
                        </div>
                        <Typography variant="h6" sx={{ marginTop: 2 }}>
                            {product.length} Users
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="user-card" sx={{ maxWidth: 345, margin: 2, padding: 2 }}>
                    <CardContent>
                        <div className="card-header" style={{ display: 'flex', alignItems: 'center' }}>
                            <PersonIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                            <Typography variant="h5" component="div" sx={{ marginLeft: 2 }}>
                                Category
                            </Typography>
                        </div>
                        <Typography variant="h6" sx={{ marginTop: 2 }}>
                            {caregory.length} Users
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Dashboard;
