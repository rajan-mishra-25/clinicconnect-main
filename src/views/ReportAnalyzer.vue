<template>
  <div class="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
    <h1 class="text-2xl font-bold text-gray-800 mb-4 text-center">📊 Report Analyser</h1>

    <!-- Upload Widget -->
    <div class="border-2 border-dashed border-blue-400 p-6 rounded-lg bg-blue-50 text-center hover:bg-blue-100 transition">
      <label class="block mb-2 text-sm font-medium text-blue-700">Choose a CSV or Excel file</label>
      <input type="file" @change="onFileChange" 
  class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer" />
      <button @click="uploadReportPdf" :disabled="!selectedFile"
        class="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-300">
        Upload Report
      </button>
    </div>

    <!-- Loader -->
    <div v-if="loading" class="flex justify-center items-center mt-6">
      <div class="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-opacity-50"></div>
      <span class="ml-4 text-blue-600 font-semibold">Analyzing Report...</span>
    </div>

    <!-- Summary Table -->
    <div v-if="summary" class="mt-8">
      <h2 class="text-xl font-semibold mb-4 text-gray-700">Summary</h2>
      <table class="min-w-full bg-white border rounded-lg overflow-hidden">
        <thead class="bg-blue-600 text-white">
          <tr>
            <th class="py-2 px-4 text-left">File</th>
            <th class="py-2 px-4 text-left">Status</th>
            <th class="py-2 px-4 text-left">Records Processed</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <tr class="border-t">
            <td class="py-2 px-4">{{ summary.file }}</td>
            <td class="py-2 px-4">{{ summary.status }}</td>
            <td class="py-2 px-4">{{ summary.records }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {UploadReport} from '@/store/api.js';// Adjust the path if needed
import { toast } from 'vue3-toastify';
export default {
  data() {
    return {
      selectedFile: null,
      loading: false,
      summary: null
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
        this.selectedFile = file;
      
    },
    async uploadReportPdf() {
      if (!this.selectedFile) return;
      this.loading = true;
      this.summary = null;

        const formData = new FormData();
        formData.append('file', this.selectedFile);

        UploadReport(formData)
          .then(response => {
            if (response.status === 200) {
              // this.summary = response.data;
              toast.success('Report uploaded successfully! ClinicConnect will analyze it before your appointment.');
            } else {
              toast.error('Failed to analyze report.');
            }
          })
          .catch(error => {
            console.error('Error uploading report:', error);
            toast.error('Error uploading report. Please try again.');
          }).finally (() => {
            this.loading = false;
          });
    }
    
  }
};
</script>
