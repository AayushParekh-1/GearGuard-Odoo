import React, { useState, useMemo } from 'react'
import { getDepartments } from '@/lib/getData'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Building2 } from 'lucide-react'
import Navbar from '@/components/Navbar'

const Department = () => {
  const departments = getDepartments()
  
  // State for search
  const [searchQuery, setSearchQuery] = useState('')

  // Filter departments by name or description
  const filteredDepartments = useMemo(() => {
    if (!searchQuery.trim()) {
      return departments
    }

    const query = searchQuery.toLowerCase().trim()
    return departments.filter(dept => {
      const nameMatch = dept.name?.toLowerCase().includes(query)
      const descMatch = dept.description?.toLowerCase().includes(query)
      return nameMatch || descMatch
    })
  }, [departments, searchQuery])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Department Management</h1>
          <p className="text-gray-600">View and manage all departments</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-6 mb-6">
          <div className="max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Departments
            </label>
            <Input
              type="text"
              placeholder="Search by department name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-2">
              {filteredDepartments.length} department{filteredDepartments.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        {/* Departments Table */}
        <div className="bg-white rounded-lg shadow-sm border border-purple-100 overflow-hidden">
          <div className="p-6 border-b border-purple-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-purple-600" />
              Departments List ({filteredDepartments.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-purple-50">
                  <TableHead className="font-semibold text-gray-900">Department Name</TableHead>
                  <TableHead className="font-semibold text-gray-900">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDepartments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-8 text-gray-500">
                      {searchQuery 
                        ? `No departments found matching "${searchQuery}"`
                        : 'No departments available.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDepartments.map((department) => (
                    <TableRow key={department._id} className="hover:bg-purple-50/50">
                      <TableCell className="font-medium text-gray-900">
                        {department.name || '-'}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {department.description || '-'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Department

