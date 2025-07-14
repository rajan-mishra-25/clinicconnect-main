
<template>
  <div id="app" class="font-sans text-gray-800">
    <header class="bg-blue-600 shadow-lg">
      <div class="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
       <div class="flex items-center space-x-2">
          <img src="./assets/logo.png" alt="Logo" class="h-12 w-auto" />
          <span class="text-xl font-semibold ">ClinicConnect</span>
        </div>
      <nav>
        <ul class="flex items-center space-x-6">
          <li v-if="!isUserLoggedIn"><router-link to="/">Login</router-link></li>
          <li v-if="!isUserLoggedIn"><router-link to="/register">Register</router-link></li>
          <li v-if="isUserLoggedIn && userRole==='Doctor'"><router-link to="/doctor-dashboard">Doctor Dashboard</router-link></li>
          <li v-if="isUserLoggedIn && userRole==='Patient'"><router-link to="/patient-dashboard">Patient Dashboard</router-link></li>
          <li v-if="isUserLoggedIn && userRole==='Patient'"><router-link to="/book-appointment">Book Appointment</router-link></li>
          <li v-if="isUserLoggedIn && userRole==='Patient'"><router-link to="/report-analyser">Report Analyzer</router-link></li>
          <!-- Add more links as needed based on your views -->
        </ul>
      </nav>
      <button
      v-if="isUserLoggedIn"
          @click="handleLogout"
          class="ml-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg"
        >
          Logout
        </button>
        </div>
    </header>
    <main class="p-4">
      <router-view />
    </main>
  </div>
</template>
<script setup>
import { provide, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Create the reactive state
const isUserLoggedIn = ref(!!localStorage.getItem('authToken'));
const userRole = ref(localStorage.getItem('userRole') || '');

// Provide this globally (once)
provide('isUserLoggedIn', isUserLoggedIn);
provide('userRole', userRole);

// Watch changes to localStorage token (simulated by watching the ref itself)
watch([isUserLoggedIn, userRole], ([newLogin, newRole]) => {
  console.log('isUserLoggedIn changed to:', newLogin);
});
 
function handleLogout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  isUserLoggedIn.value = false;
  userRole.value = '';
  router.push('/');
}
</script>

<style>
@import 'tailwindcss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  background-color: #f8f9fa;
}

.logo img {
  height: 70px; /* Adjust as needed */
  width: 100px; /* Maintain aspect ratio */
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin: 0 15px;
}

nav ul li a {
  text-decoration: none;
  color: #2c3e50;
}
</style>


