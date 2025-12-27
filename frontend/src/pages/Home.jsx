import React, { useState, useMemo } from 'react'
import { getTickets } from '@/lib/getData'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Navbar from '@/components/Navbar'

const Home = () => {
  const tickets = getTickets()
  
  localStorage.setItem('user', JSON.stringify({
    name: "Alice Admin",
    email: "alice@company.com",
    _id: "123",
    role: "ADMIN",
    department: "IT",
    avatar: "",
    status: "active",
    teamId: null
  }))
  // State for filters
  const [maintenanceForFilter, setMaintenanceForFilter] = useState('ALL')
  const [maintenanceTypeFilter, setMaintenanceTypeFilter] = useState('ALL')
  const [equipmentFilter, setEquipmentFilter] = useState('ALL')
  const [workCenterFilter, setWorkCenterFilter] = useState('ALL')

  // Get unique equipment names and work center names for filters
  const equipmentNames = useMemo(() => {
    const unique = [...new Set(tickets
      .filter(t => t.equipmentName)
      .map(t => t.equipmentName))]
    return unique.sort()
  }, [tickets])

  const workCenterNames = useMemo(() => {
    const unique = [...new Set(tickets
      .filter(t => t.workCenterName)
      .map(t => t.workCenterName))]
    return unique.sort()
  }, [tickets])

  // Filter and sort tickets
  const filteredTickets = useMemo(() => {
    let filtered = [...tickets]

    // Filter by maintenanceFor (EQUIPMENT/WORKCENTER)
    if (maintenanceForFilter !== 'ALL') {
      filtered = filtered.filter(t => t.maintenanceFor === maintenanceForFilter)
    }

    // Filter by maintenanceType (PREVENTIVE/CORRECTIVE)
    if (maintenanceTypeFilter !== 'ALL') {
      filtered = filtered.filter(t => t.maintenanceType === maintenanceTypeFilter)
    }

    // Filter by equipment
    if (equipmentFilter !== 'ALL') {
      filtered = filtered.filter(t => t.equipmentName === equipmentFilter)
    }

    // Filter by work center
    if (workCenterFilter !== 'ALL') {
      filtered = filtered.filter(t => t.workCenterName === workCenterFilter)
    }

    // Sort by newest first (requestDate)
    filtered.sort((a, b) => {
      const dateA = new Date(a.requestDate)
      const dateB = new Date(b.requestDate)
      return dateB - dateA
    })

    return filtered
  }, [tickets, maintenanceForFilter, maintenanceTypeFilter, equipmentFilter, workCenterFilter])

  // Status badge variant mapping
  const getStatusVariant = (status) => {
    const statusMap = {
      'NEW': 'default',
      'IN_PROGRESS': 'secondary',
      'REPAIRED': 'outline',
      'SCRAPPED': 'destructive'
    }
    return statusMap[status] || 'default'
  }

  // Status color mapping for light purple theme
  const getStatusColor = (status) => {
    const colorMap = {
      'NEW': 'bg-purple-100 text-purple-700 border-purple-200',
      'IN_PROGRESS': 'bg-blue-100 text-blue-700 border-blue-200',
      'REPAIRED': 'bg-green-100 text-green-700 border-green-200',
      'SCRAPPED': 'bg-red-100 text-red-700 border-red-200'
    }
    return colorMap[status] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Maintenance Dashboard</h1>
          <p className="text-gray-600">View and manage all maintenance tickets</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Maintenance For Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maintenance For
              </label>
              <Select value={maintenanceForFilter} onValueChange={setMaintenanceForFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Types</SelectItem>
                  <SelectItem value="EQUIPMENT">Equipment</SelectItem>
                  <SelectItem value="WORKCENTER">Work Center</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Maintenance Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maintenance Type
              </label>
              <Select value={maintenanceTypeFilter} onValueChange={setMaintenanceTypeFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Types</SelectItem>
                  <SelectItem value="PREVENTIVE">Preventive</SelectItem>
                  <SelectItem value="CORRECTIVE">Corrective</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Equipment Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Equipment
              </label>
              <Select value={equipmentFilter} onValueChange={setEquipmentFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Equipment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Equipment</SelectItem>
                  {equipmentNames.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Work Center Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Center
              </label>
              <Select value={workCenterFilter} onValueChange={setWorkCenterFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Work Centers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Work Centers</SelectItem>
                  {workCenterNames.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-lg shadow-sm border border-purple-100 overflow-hidden">
          <div className="p-6 border-b border-purple-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Maintenance Tickets ({filteredTickets.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-purple-50">
                  <TableHead className="font-semibold text-gray-900">Subject</TableHead>
                  <TableHead className="font-semibold text-gray-900">Employee Responsible</TableHead>
                  <TableHead className="font-semibold text-gray-900">Technician</TableHead>
                  <TableHead className="font-semibold text-gray-900">Category</TableHead>
                  <TableHead className="font-semibold text-gray-900">Status</TableHead>
                  <TableHead className="font-semibold text-gray-900">Company Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No tickets found matching the selected filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTickets.map((ticket) => (
                    <TableRow key={ticket._id} className="hover:bg-purple-50/50">
                      <TableCell className="font-medium text-gray-900">
                        {ticket.subject}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {ticket.responsibleEmployeeName || '-'}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {ticket.technicianName || '-'}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {ticket.categoryName || '-'}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={`${getStatusColor(ticket.status)} border`}
                        >
                          {ticket.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {ticket.companyName}
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

export default Home
