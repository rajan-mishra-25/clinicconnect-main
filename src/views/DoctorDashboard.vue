<template>
  <div class="flex h-screen p-4 space-x-4 bg-gray-100">
    <!-- Sidebar: Patient List -->
    <div class="w-1/4 min-w-[250px] bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col">
      <div class="bg-blue-600 text-white px-4 py-2 rounded-t-lg">
        <h2 class="font-semibold text-base">Patients</h2>
      </div>
      <div class="p-4 flex-1 overflow-y-auto">
        <ul class="flex flex-col gap-4">
          <li v-for="patient in patients" :key="patient.id" class="bg-blue-100 rounded-xl p-4 text-center shadow cursor-pointer hover:bg-blue-200 transition-colors" @click="showPatientDetails(patient)">
            {{ patient.name }}
          </li>
        </ul>
      </div>
    </div>
    <!-- Main Content: Details -->
    <div class="flex-1 flex flex-col space-y-4">
      <div class="flex-1">
        <div v-if="selectedItem" class="bg-white rounded-lg shadow-lg border border-gray-200 h-full flex flex-col">
          <div class="bg-yellow-600 text-white px-4 py-2 rounded-t-lg">
            <h2 class="font-semibold text-base">{{ selectedItem.type }} Details</h2>
          </div>
          <div class="p-6 flex-1 overflow-y-auto">
            <!-- Patient Summary -->
            <ul class="flex flex-col gap-1 mb-6 w-fit mx-auto">
              <li v-if="selectedItem.name" class="px-2 py-1 flex items-center">
                <span class="font-semibold text-gray-700 min-w-[80px] text-right mr-2">Name:</span>
                <span class="text-gray-900 text-lg text-left">{{ selectedItem.name }}</span>
              </li>
              <li v-if="selectedItem.notes" class="px-2 py-1 flex items-center">
                <span class="font-semibold text-gray-700 min-w-[80px] text-right mr-2">Notes:</span>
                <span class="text-gray-900 text-left">{{ selectedItem.notes }}</span>
              </li>
            </ul>
            <!-- Previous Appointments -->
            <div v-if="selectedItem.previousAppointments && selectedItem.previousAppointments.length" class="mt-4">
              <h3 class="font-semibold text-lg mb-2 text-gray-700">Previous Appointments</h3>
              <ul class="flex flex-col gap-3">
                <li v-for="appt in selectedItem.previousAppointments" :key="appt.id" class="bg-gray-100 rounded-lg p-3 border border-gray-200">
                  <div class="font-medium text-blue-700">{{ appt.date }} - {{ appt.reason }}</div>
                  <div class="text-sm text-gray-600">Doctor: {{ appt.doctor }}</div>
                  <div class="text-sm text-gray-500">Notes: {{ appt.notes }}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else class="bg-white rounded-lg shadow-lg border border-gray-200 border-dashed min-h-[200px] flex items-center justify-center h-full">
          <div class="text-center p-8">
            <div class="text-gray-400 mb-4">
              <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p class="text-gray-500 text-lg font-medium">Select a patient or appointment</p>
            <p class="text-gray-400 text-sm mt-2">Click on any item from above to view detailed information</p>
          </div>
        </div>
      </div>
      <div class="mt-6 text-center">
        <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">Add New Patient</button>
      </div>
    </div>
    <!-- Right Sidebar: Appointments -->
    <div class="w-1/4 min-w-[250px] bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col">
      <div class="bg-green-600 text-white px-4 py-2 rounded-t-lg">
        <h2 class="font-semibold text-base">Appointments</h2>
      </div>
      <div class="p-4 flex-1 overflow-y-auto">
        <ul class="flex flex-col gap-4">
          <li v-for="appointment in appointments" :key="appointment.id" class="bg-green-100 rounded-xl p-4 text-center shadow cursor-pointer hover:bg-green-200 transition-colors" @click="showAppointmentDetails(appointment)">
            {{ appointment.time }} - {{ appointment.name }} 
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../store/api';
export default {
  name: 'DoctorDashboard',
  data() {
    return {
      appointments: [],
      patients: [],
      selectedItem: null,
    };
  },
  mounted() {
    // Dummy data for demo
    const dummyPatients = [
      { id: 1, name: 'Marcus Stoinis', age: 45, contact: '+1-234-567-8901', notes: 'Regular checkup patient with history of hypertension' },
      { id: 2, name: 'Glenn Gilespi', age: 32, contact: '+1-234-567-8902', notes: 'New patient, first visit scheduled' },
      { id: 3, name: 'William Defoe', age: 28, contact: '+1-234-567-8903', notes: 'Follow-up appointment for ankle injury' },
      { id: 4, name: 'Sirius Black', age: 28, contact: '+1-234-567-8903', notes: 'This the test note' },
    ];
    const dummyAppointments = [
      { id: 1, patientId: 1, name: 'Dr. James Harrington', time: '9:00 AM', reason: 'Regular Checkup', notes: 'Blood pressure monitoring required' },
      { id: 5, patientId: 17, name: 'Dr. James Harrington', time: '3:00 PM', reason: 'Regular Checkup', notes: 'This the test note' },
      { id: 2, patientId: 2, name: 'Dr. Olivia Bennett', time: '11:30 AM', reason: 'First Consultation', notes: 'New patient intake and medical history review' },
      { id: 3, patientId: 3, name: 'Dr. William Hughes', time: '2:00 PM', reason: 'Follow-up', notes: 'Check ankle recovery progress' },
      { id: 4, patientId: 4, name: 'Dr. Amelia Clarke', time: '3:00 PM', reason: 'Follow-up', notes: 'Check ankle recovery progress' },
    ];
    this.patients = dummyPatients;
    this.appointments = dummyAppointments;
    // Uncomment below to use real API
    // api.get('/patients').then(res => {
    //   this.patients = res.data;
    // });
    // api.get('/appointments').then(res => {
    //   this.appointments = res.data;
    // });
  },
  methods: {
    async showPatientDetails(patient) {
      // Dummy previous appointments for demo
      let previousAppointments = [];
      if (patient.id === 1) {
        previousAppointments = [
          { id: 101, date: '2025-06-01', reason: 'Checkup', doctor: 'Dr. Smith', notes: 'Routine checkup, all good.' },
          { id: 102, date: '2025-05-15', reason: 'Consultation', doctor: 'Dr. Jones', notes: 'Discussed symptoms, prescribed medication.' },
        ];
      } else if (patient.id === 2) {
        previousAppointments = [
          { id: 201, date: '2025-04-10', reason: 'First Visit', doctor: 'Dr. Brown', notes: 'Initial assessment.' },
        ];
      } else if (patient.id === 3) {
        previousAppointments = [
          { id: 301, date: '2025-03-20', reason: 'Follow-up', doctor: 'Dr. Green', notes: 'Recovery progressing well.' },
          { id: 302, date: '2025-02-18', reason: 'Injury', doctor: 'Dr. Green', notes: 'Ankle injury, prescribed rest.' },
        ];
      }
      this.selectedItem = { ...patient, type: 'Patient', previousAppointments };
    },
    async showAppointmentDetails(appointment) {
      // Find the patient by patientId
      const patient = this.patients.find(p => p.id === appointment.patientId);
      let previousAppointments = [];
      if (patient) {
        // Dummy previous appointments for demo
        if (patient.id === 1) {
          previousAppointments = [
            { id: 101, date: '2025-06-01', reason: 'Checkup', doctor: 'Dr. Smith', notes: 'Routine checkup, all good.' },
            { id: 102, date: '2025-05-15', reason: 'Consultation', doctor: 'Dr. Jones', notes: 'Discussed symptoms, prescribed medication.' },
          ];
        } else if (patient.id === 2) {
          previousAppointments = [
            { id: 201, date: '2025-04-10', reason: 'First Visit', doctor: 'Dr. Brown', notes: 'Initial assessment.' },
          ];
        } else if (patient.id === 3) {
          previousAppointments = [
            { id: 301, date: '2025-03-20', reason: 'Follow-up', doctor: 'Dr. Green', notes: 'Recovery progressing well.' },
            { id: 302, date: '2025-02-18', reason: 'Injury', doctor: 'Dr. Green', notes: 'Ankle injury, prescribed rest.' },
          ];
        }
      }
      this.selectedItem = {
        ...patient,
        ...appointment,
        type: 'Appointment',
        previousAppointments
      };
    },
  },
};
</script>

<style scoped>
* {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
}
html, body, #app {
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden !important;
}
body {
  margin: 0;
  padding: 0;
  overflow: hidden !important;
}
:root {
  overflow: hidden !important;
}
/* Add any additional styles here if needed */
</style>