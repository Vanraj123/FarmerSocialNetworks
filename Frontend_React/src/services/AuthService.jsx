import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const login = async (email, password, role) => {
    try {
        // const formData = new FormData();
        // formData.append('username', email);
        // formData.append('password', password);

        const response = await axios.get(`${BASE_URL}/users`);
        
        // const res = await fetch("http://localhost:5000/api/user/login", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: formData,
        //   });
        // const res = await axios.get(`http://localhost:5000/api/user/login`, formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        // });

        //   if (!res.ok) {
        //     throw new Error(`Error: ${res.status}`);
        //   }

    //       const responseData = await res.json();
    //   const { token, user } = responseData;
    //     localStorage.setItem("token", token);
    //   localStorage.setItem("userId", user._id);
    //   localStorage.setItem("email", user.email);
    //   localStorage.setItem("password", userData.password);

        const users = response.data;
        const userr = users.find(user => user.email === email && user.password === password && user.role === role);
        
        if (userr) {
            // console.log("aaply");
            console.log(email);
            console.log(password);
            // console.log("jfjfjf");
            localStorage.setItem("username", email);
            localStorage.setItem("password", password);
            return userr;
        } else {
            throw new Error('Invalid credentials or role');
        }
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const register = async (userData) => {
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('role', userData.role);
    formData.append('location', userData.location);
    formData.append('contactInfo', userData.contactInfo);
    formData.append('dateOfJoining', userData.dateOfJoining);

    //for mongodb user registration 

    const formDataToSend = new FormData();
    formDataToSend.append('username',  userData.name);
    formDataToSend.append('email', userData.email);
    formDataToSend.append('phoneNo', userData.contactInfo);
    formDataToSend.append('password', userData.password);
    formDataToSend.append('language', "English");
    formDataToSend.append('bio', " ");

    if (userData.profileImage) {
        formData.append('profileImage', userData.profileImage);
        formDataToSend.append('profilePicture', userData.profileImage);
    }

    try {
        const response = await axios.post(`${BASE_URL}/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        const response1 = await axios.post(`http://localhost:5000/api/user/signup`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (err) {
        throw new Error(err.response ? err.response.data : 'Error during registration');
    }
    
    
};

