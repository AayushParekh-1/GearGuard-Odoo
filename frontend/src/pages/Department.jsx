import React, { useState, useMemo, useEffect } from 'react'
import { getDepartments } from '@/lib/getData'
import { departmentAPI } from '@/lib/api'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Building2, Plus } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { isAdminOrManager } from '@/lib/authUtils'

const Department = () => {
  const [departments, setDepartments] = useState([])
  const canEdit = isAdminOrManager()
  
  // State for search and dialog
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', description: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch departments
  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    try {
      const data = await departmentAPI.getAll()
      setDepartments(data)
    } catch (error) {
      console.error('Error fetching departments:', error)
      // Fallback to mock data if API fails
      setDepartments(getDepartments())
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await departmentAPI.create(formData)
      // Reset form and close dialog
      setFormData({ name: '', description: '' })
      setIsDialogOpen(false)
      // Refresh departments list
      await fetchDepartments()
    } catch (error) {
      console.error('Error creating department:', error)
      setError(error.message || 'Failed to create department')
    } finally {
      setLoading(false)
    }
  }

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
          <div className="p-6 border-b border-purple-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-purple-600" />
              Departments List ({filteredDepartments.length})
            </h2>
            {canEdit && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Department</DialogTitle>
                    <DialogDescription>
                      Create a new department. Department name is required.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Department Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g., IT, MECHANICAL"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">
                          Description
                        </label>
                        <Input
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Department description"
                        />
                      </div>
                    </div>
                    {error && (
                      <div className="text-sm text-red-600 mt-2">{error}</div>
                    )}
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsDialogOpen(false)
                          setError(null)
                        }}
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-purple-600 hover:bg-purple-700"
                        disabled={loading}
                      >
                        {loading ? 'Creating...' : 'Create Department'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
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

