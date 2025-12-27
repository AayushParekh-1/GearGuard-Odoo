import React, { useState, useMemo } from 'react'
import { getWorkCenters } from '@/lib/getData'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { MapPin } from 'lucide-react'
import Navbar from '@/components/Navbar'

const WorkCenter = () => {
  const workCenters = getWorkCenters()
  
  // State for search
  const [searchQuery, setSearchQuery] = useState('')

  // Filter work centers by name, location, department, or company
  const filteredWorkCenters = useMemo(() => {
    if (!searchQuery.trim()) {
      return workCenters
    }

    const query = searchQuery.toLowerCase().trim()
    return workCenters.filter(wc => {
      const nameMatch = wc.name?.toLowerCase().includes(query)
      const locationMatch = wc.location?.toLowerCase().includes(query)
      const deptMatch = wc.departmentName?.toLowerCase().includes(query)
      const companyMatch = wc.companyName?.toLowerCase().includes(query)
      return nameMatch || locationMatch || deptMatch || companyMatch
    })
  }, [workCenters, searchQuery])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Work Center Management</h1>
          <p className="text-gray-600">View and manage all work centers</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-6 mb-6">
          <div className="max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Work Centers
            </label>
            <Input
              type="text"
              placeholder="Search by name, location, department, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-2">
              {filteredWorkCenters.length} work center{filteredWorkCenters.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        {/* Work Centers Table */}
        <div className="bg-white rounded-lg shadow-sm border border-purple-100 overflow-hidden">
          <div className="p-6 border-b border-purple-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              Work Centers List ({filteredWorkCenters.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-purple-50">
                  <TableHead className="font-semibold text-gray-900">Work Center Name</TableHead>
                  <TableHead className="font-semibold text-gray-900">Department</TableHead>
                  <TableHead className="font-semibold text-gray-900">Location</TableHead>
                  <TableHead className="font-semibold text-gray-900">Company</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkCenters.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                      {searchQuery 
                        ? `No work centers found matching "${searchQuery}"`
                        : 'No work centers available.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredWorkCenters.map((workCenter) => (
                    <TableRow key={workCenter._id} className="hover:bg-purple-50/50">
                      <TableCell className="font-medium text-gray-900">
                        {workCenter.name || '-'}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className="bg-purple-100 text-purple-700 border-purple-300"
                        >
                          {workCenter.departmentName || '-'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {workCenter.location || '-'}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {workCenter.companyName || '-'}
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

export default WorkCenter

