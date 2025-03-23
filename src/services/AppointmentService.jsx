import { CONFIG } from  "../configurations/configuration"

// ServiceCategory
const SERVICE_CATEGORY_BASE_URL    = '/api/v1/appointment/service-category'
export const searchServiceCategories          = `${CONFIG.API_GATEWAY}${SERVICE_CATEGORY_BASE_URL}/search`

// Service
const SERVICE_BASE_URL    = '/api/v1/appointment/service'
export const searchServices         = `${CONFIG.API_GATEWAY}${SERVICE_BASE_URL}/search`