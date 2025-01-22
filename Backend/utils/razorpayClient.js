import Razorpay from 'razorpay';
import { config } from 'dotenv';

const instance = new Razorpay({
    key_id: "rzp_test_cAtTQ8y0oFdwwk",
    key_secret: "mRagHIMPekNpFdQftQM8ftUA"
})

export default instance