import axiosInstance from "./axiosInstance"

export const paymentMail = async (data) => {
    try {
        const response = await axiosInstance.post('/api/payments', {
            response: data
        })
        console.log(response)
        if(response.status === 200){
            console.log(response.data.data)
        }
    } catch (error) {
        console.log(error.message)
    }
}