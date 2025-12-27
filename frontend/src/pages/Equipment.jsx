import React, { useState, useMemo } from 'react'
import { getEquipments, getEquipmentCategories } from '@/lib/getData'
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
import { FolderOpen } from 'lucide-react'
import Navbar from '@/components/Navbar'

const Equipment = () => {
  const equipments = getEquipments()
  const equipmentCategories = getEquipmentCategories()
  
  // State for search
  const [searchQuery, setSearchQuery] = useState('')

  // Filter equipments by name or serial number
  const filteredEquipments = useMemo(() => {
    if (!searchQuery.trim()) {
      return equipments
    }

    const query = searchQuery.toLowerCase().trim()
    return equipments.filter(equipment => {
      const nameMatch = equipment.name?.toLowerCase().includes(query)
      const serialMatch = equipment.serialNumber?.toLowerCase().includes(query)
      return nameMatch || serialMatch
    })
  }, [equipments, searchQuery])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Equipment Management</h1>
          <p className="text-gray-600">View and manage all equipment</p>
        </div>

        {/* Equipment Categories Section */}
        <div className="bg-white rounded-lg shadow-sm border border-purple-100 overflow-hidden mb-6">
          <div className="p-6 border-b border-purple-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-purple-600" />
              Equipment Categories ({equipmentCategories.length})
            </h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {equipmentCategories.map((category) => (
                <div
                  key={category._id}
                  className="p-4 rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-white hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Company:</span>
                      <span className="font-medium text-gray-900">{category.companyName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Team:</span>
                      <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300">
                        {category.teamName}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-6 mb-6">
          <div className="max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Equipment
            </label>
            <Input
              type="text"
              placeholder="Search by equipment name or serial number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-2">
              {filteredEquipments.length} equipment{filteredEquipments.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        {/* Equipment Table */}
        <div className="bg-white rounded-lg shadow-sm border border-purple-100 overflow-hidden">
          <div className="p-6 border-b border-purple-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Equipment List ({filteredEquipments.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-purple-50">
                  <TableHead className="font-semibold text-gray-900">Equipment Name</TableHead>
                  <TableHead className="font-semibold text-gray-900">Employee</TableHead>
                  <TableHead className="font-semibold text-gray-900">Department</TableHead>
                  <TableHead className="font-semibold text-gray-900">Serial Number</TableHead>
                  <TableHead className="font-semibold text-gray-900">Technician</TableHead>
                  <TableHead className="font-semibold text-gray-900">Equipment Category</TableHead>
                  <TableHead className="font-semibold text-gray-900">Company</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquipments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      {searchQuery 
                        ? `No equipment found matching "${searchQuery}"`
                        : 'No equipment available.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEquipments.map((equipment) => (
                    <TableRow key={equipment._id} className="hover:bg-purple-50/50">
                      <TableCell className="font-medium text-gray-900">
                        {equipment.name || '-'}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {equipment.employeeName || '-'}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {equipment.departmentName || '-'}
                      </TableCell>
                      <TableCell className="text-gray-700 font-mono text-sm">
                        {equipment.serialNumber || '-'}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {equipment.technicianName || '-'}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {equipment.categoryName || '-'}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {equipment.companyName || '-'}
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

export default Equipment

