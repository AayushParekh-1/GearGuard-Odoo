import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const Navbar = () => {
  // Get user data from localStorage
  let userData = {}
  try {
    const stored = localStorage.getItem('user')
    if (stored) {
      userData = JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error)
  }
  const userRole = userData.role || ''

  // Role-based menu items
  const menuItems = [
    {
      label: 'Dashboard',
      path: '/',
      roles: ['ADMIN', 'MANAGER', 'EMPLOYEE']
    },
    {
      label: 'Monthly Calendar',
      path: '/calendar',
      roles: ['TECHNICIAN']
    },
    {
      label: 'Equipment',
      path: '/equipment',
      roles: ['MANAGER', 'ADMIN']
    },
    {
      label: 'Report',
      path: '/report',
      roles: ['MANAGER', 'ADMIN']
    },
    {
      label: 'Teams',
      path: '/teams',
      roles: ['MANAGER', 'ADMIN']
    },
    {
      label: 'Department',
      path: '/department',
      roles: ['MANAGER', 'ADMIN']
    },
    {
      label: 'Work Center',
      path: '/work-center',
      roles: ['MANAGER', 'ADMIN']
    }
  ]

  // Filter menu items based on user role
  const visibleMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  )

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-purple-600">GearGuard</h1>
          </div>
          
          <div className="flex items-center gap-1">
            {visibleMenuItems.map((item) => (
              <Button
                key={item.path}
                asChild
                variant="ghost"
                className={cn(
                  "text-sm font-medium transition-colors hover:bg-purple-50 hover:text-purple-600"
                )}
              >
                <Link to={item.path}>{item.label}</Link>
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {userData.avatar && (
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="h-8 w-8 rounded-full"
                />
              )}
              <div className="text-sm">
                <p className="font-medium text-gray-900">{userData.name}</p>
                <p className="text-xs text-gray-500">{userData.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

