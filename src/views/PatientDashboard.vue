<template>
  <div class="flex h-screen p-4 space-x-4 bg-gray-100">
    <!-- Left Section (40%) -->
    <div class="w-2/5 bg-white rounded-2xl shadow overflow-hidden">
      <div class="bg-blue-600 text-white text-lg font-semibold px-4 py-3">
        Appointments
      </div>
      <div class="p-4 grid grid-cols-1 gap-4">
        <div
          v-for="appointment in appointments"
          :key="'left-' + appointment.id"
          class="bg-blue-100 rounded-xl p-4 text-center shadow"
        >
          <ul>
          <div>
            <li  :key="appointment.id" @click="selectAppointment(appointment)" >{{ appointment.date }} - {{ appointment.doctorName }}</li>
          </div>
        </ul>
        </div>
      </div>
    </div>

    <!-- Right Section (60%) -->
    <div class="w-3/5 bg-white rounded-2xl shadow overflow-hidden">
      <div class="bg-green-600 text-white text-lg font-semibold px-4 py-3">
        Appointment Details
      </div>
      <div class="p-4 grid grid-cols-1 gap-4">
        <div
          :key="'right-'"
          class="bg-green-100 rounded-xl p-4 text-left shadow"
        >
           <div v-if="selectedAppointment">
          <p><strong>Doctor Name:</strong> {{ selectedAppointment.doctorName }}</p>
          <p><strong>Status:</strong> {{ selectedAppointment.appointmentStatus }}</p>
          <p><strong>Date:</strong> {{  selectedAppointment.date }}</p>
          <p><strong>Time:</strong> {{ selectedAppointment.startTime }} - {{ selectedAppointment.endTime }} </p>
          <p><strong>Description:</strong> {{ selectedAppointment.description }}</p>
          <input type="button" value="Download Appointment" class="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer" @click="download()" />
        </div>
        <div v-else>
          <p>Please select an appointment to see the details.</p>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import {fetchAppointments, downloadPdf} from '@/store/api.js'
export default {
  data() {
    return {
      appointments: [],
      selectedAppointment: null,
    };
  },
  methods: {
     async getAppointments() {
      try {
        const response = await fetchAppointments();
        this.appointments = response; // Assuming the response structure
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    },
    selectAppointment(appointment) {
      this.selectedAppointment = appointment;
    },
async download() {
    try {
      const fileUrl = downloadPdf(this.selectedAppointment.appointmentId); // Already returns a string

      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', 'report.pdf'); // Forces download
      link.setAttribute('target', '_blank'); // Optional: opens in new tab if not downloadable
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
    }
  }
},
  mounted() {
    this.getAppointments();
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  border: 2px solid #ccc;
  padding: 10px;
}

.header {
  grid-column: span 2;
  background-color: #f0f0f0;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  border-bottom: 2px solid #ccc;
}

.grid-item {
  background-color: #e0e0e0;
  border: 1px solid #ccc;
  padding: 20px;
  text-align: center;
}
</style>