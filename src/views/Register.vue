
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
      <h2 class="text-2xl font-bold text-center text-blue-700 mb-6">Create Account</h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Full Name</label>
          <input v-model="form.fullName" type="text" required class="mt-1 w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="form.email" type="email" required class="mt-1 w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="form.password" type="password" required class="mt-1 w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
        <label>
          <input type="checkbox" v-model="isDRole" />
          Is Doctor?
        </label>
      </div>
        <div>
          <button type="submit" :disabled="loading" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl">
            {{ loading ? 'Registering...' : 'Register' }}
          </button>
        </div>

        <p class="text-center text-sm text-gray-600">
          Already have an account?
          <router-link to="/login" class="text-blue-600 hover:underline">Login here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { registerUser } from '@/store/api.js';

const router = useRouter();
const loading = ref(false);

const role = this.isDRole ? 'D' : 'P';
const form = reactive({
  fullName: '',
  email: '',
  password: '',
  role: role 
});
const handleRegister = async () => {
  try {
    loading.value = true;
    await registerUser(form); // Replace with your actual endpoint
    router.push('/login');
  } catch (error) {
    alert('Registration failed. Please check your inputs.');
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>