import React, { useState, useMemo, useEffect } from 'react'
import { getWorkCenters, getDepartments } from '@/lib/getData'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { MapPin, Plus } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { isAdminOrManager } from '@/lib/authUtils'
import { workCenterAPI, departmentAPI } from '@/lib/api'

const WorkCenter = () => {
  const [workCenters, setWorkCenters] = useState([])
  const [departments, setDepartments] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    companyName: 'My Company',
    department: '',
    location: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const canEdit = isAdminOrManager()

  /* ---------------- FETCH DATA ---------------- */

  useEffect(() => {
    fetchWorkCenters()
    fetchDepartments()
  }, [])

  const fetchWorkCenters = async () => {
    try {
      const data = await workCenterAPI.getAll()
      setWorkCenters(data)
    } catch (err) {
      console.error(err)
      setWorkCenters(getWorkCenters()) // fallback
    }
  }

  const fetchDepartments = async () => {
    try {
      const data = await departmentAPI.getAll()
      setDepartments(data)
    } catch (err) {
      console.error(err)
      setDepartments(getDepartments()) // fallback
    }
  }

  /* ---------------- CREATE ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await workCenterAPI.create(formData)

      setFormData({
        name: '',
        companyName: 'My Company',
        department: '',
        location: '',
      })

      setIsDialogOpen(false)
      fetchWorkCenters()
    } catch (err) {
      console.error(err)
      setError(err?.message || 'Failed to create work center')
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- FILTER ---------------- */

  const filteredWorkCenters = useMemo(() => {
    if (!searchQuery.trim()) return workCenters

    const q = searchQuery.toLowerCase()

    return workCenters.filter((wc) =>
      [
        wc.name,
        wc.location,
        wc.departmentName,
        wc.companyName,
      ]
        .join(' ')
        .toLowerCase()
        .includes(q)
    )
  }, [workCenters, searchQuery])

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Work Center Management</h1>

        {/* Search */}
        <Input
          placeholder="Search work centers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md mb-6"
        />

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="flex items-center gap-2 font-semibold">
            <MapPin className="text-purple-600" />
            Work Centers ({filteredWorkCenters.length})
          </h2>

          {canEdit && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Work Center</DialogTitle>
                  <DialogDescription>All fields are required</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Work Center Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />

                  <Input
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    required
                  />

                  <Select
                    value={formData.department}
                    onValueChange={(v) =>
                      setFormData({ ...formData, department: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((d) => (
                        <SelectItem key={d._id} value={d._id}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    placeholder="Location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required
                  />

                  {error && <p className="text-red-600 text-sm">{error}</p>}

                  <DialogFooter>
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? 'Creating...' : 'Create'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Company</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredWorkCenters.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              filteredWorkCenters.map((wc) => (
                <TableRow key={wc._id}>
                  <TableCell>{wc.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {wc.departmentName || '-'}
                    </Badge>
                  </TableCell>
                  <TableCell>{wc.location}</TableCell>
                  <TableCell>{wc.companyName}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default WorkCenter
