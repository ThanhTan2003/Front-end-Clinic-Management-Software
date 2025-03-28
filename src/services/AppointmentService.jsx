import { CONFIG } from  "../configurations/configuration"

// ServiceCategory
const SERVICE_CATEGORY_BASE_URL         = '/api/v1/appointment/service-category'
export const searchServiceCategories    = `${CONFIG.API_GATEWAY}${SERVICE_CATEGORY_BASE_URL}/search`

// Service
const SERVICE_BASE_URL      = '/api/v1/appointment/service'
export const searchServices = `${CONFIG.API_GATEWAY}${SERVICE_BASE_URL}/search`

// Doctor
const DOCTOR_BASE_URL       = '/api/v1/appointment/doctor'
export const searchDoctors  = `${CONFIG.API_GATEWAY}${DOCTOR_BASE_URL}/search`

// DoctorService
const DOCTOR_SERVICE_BASE_URL               = '/api/v1/appointment/doctor-service'
export const searchDoctorServiceByService   = `${CONFIG.API_GATEWAY}${DOCTOR_SERVICE_BASE_URL}/search-by-service`
export const searchDoctorServiceByDoctor    = `${CONFIG.API_GATEWAY}${DOCTOR_SERVICE_BASE_URL}/search-by-doctor`
export const getDoctorServiceById           = `${CONFIG.API_GATEWAY}${DOCTOR_SERVICE_BASE_URL}`

// DoctorSchedule
const DOCTOR_SCHEDULE_BASE_URL                  = '/api/v1/appointment/doctor-schedule'
export const getListDayOfWeekByDoctor           = `${CONFIG.API_GATEWAY}${DOCTOR_SCHEDULE_BASE_URL}/get-day-of-week-by-doctor`
export const getListDayOfWeekByDoctorService    = `${CONFIG.API_GATEWAY}${DOCTOR_SCHEDULE_BASE_URL}/get-day-of-week-by-doctor-service`
export const getScheduleByDoctorAndDate         = `${CONFIG.API_GATEWAY}${DOCTOR_SCHEDULE_BASE_URL}/doctor`
export const getDoctorScheduleById                    = `${CONFIG.API_GATEWAY}${DOCTOR_SCHEDULE_BASE_URL}`

// Patient
const PATIENT_BASE_URL                  = '/api/v1/appointment/patient'
export const searchPatients             = `${CONFIG.API_GATEWAY}${PATIENT_BASE_URL}/search`
export const createPatient              = `${CONFIG.API_GATEWAY}${PATIENT_BASE_URL}`
export const getPatientById             = `${CONFIG.API_GATEWAY}${PATIENT_BASE_URL}`