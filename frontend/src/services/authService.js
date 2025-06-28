import axiosInstance from '../api/axiosInstance';

export const login = async (email, password) => {
    try {
        const response = await axiosInstance.post('/login', { email, password });
        console.log(response.data);

        return response.data;
    } catch (error) {
        const message = error.response?.data?.errors?.[0]?.message || 'Something went wrong during login';
        throw new Error(message);
    }
};

export const register = async (userName, email, password) => {
    try {
        const response = await axiosInstance.post('/register', { userName, email, password });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.errors?.[0]?.message || 'Something went wrong during register';
        throw new Error(message);
    }
};
export const logout = () => {
    localStorage.removeItem('token');
};
