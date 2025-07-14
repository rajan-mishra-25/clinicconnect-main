import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default {
  get(resource) {
    return apiClient.get(resource);
  },
  
  post(resource, data) {
    return apiClient.post(resource, data);
  },
  
  put(resource, data) {
    return apiClient.put(resource, data);
  },
  
  delete(resource) {
    return apiClient.delete(resource);
  },
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/user/login`, credentials);
  return response.data;
};

export const registerUser = async (userDetails) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/user/register`, userDetails);
  return response.data;
};

// export const fetchAppointments = () => {
//   return axios.get(`${import.meta.env.VITE_API_URL}/user/getappointments`, {
//     headers: {
//     'Content-Type': 'application/json;charset=utf-8',
//     Authorization: `Bearer ${localStorage.getItem('authToken')}` // ⬅️ Also updated here
//     }
//   });
// };
export const fetchAppointments = async() => {
   const response = await apiClient.get('/user/getappointments');
    return response.data;
};

export const getDoctorList = async() => {
    return await apiClient.get('/appointment/getalldoctors');
}
export const bookAppointment = async(payload) => {
    return await apiClient.post('/appointment/book',payload);
}
export const downloadPdf =  (id) => {
   try {
    const response =  apiClient.get('/user/29/download');
    return `https://cloudconnect-appointment-s3.s3.us-east-1.amazonaws.com/appointments/29.pdf?X-Amz-Expires=600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYDWNLS3SKJJBKF7C%2F20250630%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250630T044341Z&X-Amz-SignedHeaders=host&X-Amz-Signature=b71c55bec8c605e62018dd4590915b1b304e2162b58ba0f71b7e2385fbafde1d`

  } catch (err) {
    console.error('Download failed:', err);
  }
};
export const UploadReport= async(formData) =>{ 
  return await apiClient.post('/analyzer/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
})};
