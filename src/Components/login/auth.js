import axios from 'axios';
import API_BASE_URL from '../../Api/api';

export const validateLogin = async (formData) => {
    if (!formData.username.trim() || !formData.password.trim()) {
        return { isValid: false, errorMessage: "All fields are required" };
    } else {
        try {
            const response = await axios.post(`${API_BASE_URL}/Stafflogin`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const token = response.data;
            localStorage.setItem('logintype', token.logintype);
            localStorage.setItem('token', JSON.stringify(token));
            document.title =
                token.logintype === "staff" ? "Goolok | Staff" : "Goolok | Admin";
            return { isValid: true };
        } catch (error) {
            return { isValid: false, errorMessage: "Login failed. Please try again later." };
        }
    }
};


