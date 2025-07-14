
<script>
  import { loginUser } from '@/store/api.js';
import { provide } from 'vue';

export default {
  data() {
    return {
      email: '',
      password: '',
      errors: {}
    };
  },
  methods: {
    validateInput() {
      this.errors = {};
      if (!this.email) {
        this.errors.email = 'Username is required.';
      }
      if (!this.password) {
        this.errors.password = 'Password is required.';
      }
      return Object.keys(this.errors).length === 0;
    },
    async handleLogin() {  
      if (this.validateInput()) {
        try {
          const response = await loginUser({ email: this.email, password: this.password });
          // Handle successful login (e.g., redirect or store token)
          if(response) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('userRole', response.role);
            if(response.role==="Patient")
              this.$router.push('/patient-dashboard').then(() => window.location.reload()); // Redirect to dashboard on successful login
            else
              this.$router.push('/doctor-dashboard').then(() => window.location.reload());
          }
          console.log('Login successful:', response);
        } catch (error) {
          
          // Handle login error (e.g., show error message)
          console.error('Login failed:', error);
        }
      }
    }
  }
};
</script>

<template>
     <div class="flex items-center justify-center min-h-screen bg-gray-100">
       <form @submit.prevent="handleLogin" class="bg-white p-6 rounded shadow-md w-96">
         <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
         <div class="mb-4">
           <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
           <input type="text" id="email" v-model="email" class="mt-1 block w-full p-2 border border-gray-300 rounded" required />
        <span v-if="errors.email">{{ errors.email }}</span>
         </div>
         <div class="mb-4">
           <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
           <input type="password" id="password" v-model="password" class="mt-1 block w-full p-2 border border-gray-300 rounded" required />
        <span v-if="errors.password">{{ errors.password }}</span>
         </div>
         <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
       </form>
     </div>
   </template>

