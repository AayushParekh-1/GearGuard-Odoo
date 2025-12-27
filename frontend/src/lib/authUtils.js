// Helper function to check if user is ADMIN or MANAGER
export function isAdminOrManager() {
  try {
    const stored = localStorage.getItem('user')
    if (!stored) return false
    
    const userData = JSON.parse(stored)
    const role = userData.role || ''
    
    return role === 'ADMIN' || role === 'MANAGER'
  } catch (error) {
    console.error('Error checking user role:', error)
    return false
  }
}

// Helper function to get user role
export function getUserRole() {
  try {
    const stored = localStorage.getItem('user')
    if (!stored) return ''
    
    const userData = JSON.parse(stored)
    return userData.role || ''
  } catch (error) {
    console.error('Error getting user role:', error)
    return ''
  }
}

