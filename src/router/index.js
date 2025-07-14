import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import DoctorDashboard from '../views/DoctorDashboard.vue';
import PatientDashboard from '../views/PatientDashboard.vue';
import BookAppointment from '../views/BookAppointment.vue';
import ReportAnalyzer from '../views/ReportAnalyzer.vue';

const isAuthenticated = () => {
  return !!localStorage.getItem('authToken'); // or 'user'
};

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/doctor-dashboard', component: DoctorDashboard, meta: { requiresAuth: true } },
  { path: '/patient-dashboard', component: PatientDashboard, meta: { requiresAuth: true } },
  { path: '/book-appointment', component: BookAppointment, meta: { requiresAuth: true } },
  { path: '/report-analyser', component: ReportAnalyzer, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');
    //next();
  } else {
    next(); // allow to proceed
  }
});

export default router;