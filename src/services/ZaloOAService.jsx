import { CONFIG } from  "../configurations/configuration"

// ZaloUser
const ZALO_USER_BASE_URL    = '/api/v1/zalo-oa/user'
export const searchUsers           = `${CONFIG.API_GATEWAY}${ZALO_USER_BASE_URL}/search`
export const getById               = `${CONFIG.API_GATEWAY}${ZALO_USER_BASE_URL}`

// Tag
const TAG_BASE_URL  = '/api/v1/zalo-oa/tag'
export const getTags       = `${CONFIG.API_GATEWAY}${TAG_BASE_URL}`
export const createTag     = `${CONFIG.API_GATEWAY}${TAG_BASE_URL}`
export const getTagById    = `${CONFIG.API_GATEWAY}${TAG_BASE_URL}`
export const getTagByName  = `${CONFIG.API_GATEWAY}${TAG_BASE_URL}/by-name`