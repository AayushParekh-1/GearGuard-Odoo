import React, { useState, useMemo, useEffect } from 'react'
import {
  equipmentAPI,
  equipmentCategoryAPI,
  teamAPI,
  departmentAPI,
  workCenterAPI,
} from '@/lib/api'
import {
  getEquipments,
  getEquipmentCategories,
  getTeams,
  getDepartments,
  getWorkCenters,
} from '@/lib/getData'
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
import { FolderOpen, Plus } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { isAdminOrManager } from '@/lib/authUtils'

const Equipment = () => {
  const canEdit = isAdminOrManager()

  const [equipments, setEquipments] = useState([])
  const [equipmentCategories, setEquipmentCategories] = useState([])
  const [teams, setTeams] = useState([])
  const [departments, setDepartments] = useState([])
  const [workCenters, setWorkCenters] = useState([])

  const [searchQuery, setSearchQuery] = useState('')
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [isEquipmentDialogOpen, setIsEquipmentDialogOpen] = useState(false)

  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    companyName: 'My Company',
    teamId: 'none',
  })

  const [equipmentFormData, setEquipmentFormData] = useState({
    name: '',
    serialNumber: '',
    categoryId: '',
    departmentId: '',
    location: '',
    workCenterId: '',
    maintenanceTeamId: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  /* ---------------- FETCH ---------------- */

  useEffect(() => {
    Promise.all([
      equipmentAPI.getAll().catch(() => getEquipments()),
      equipmentCategoryAPI.getAll().catch(() => getEquipmentCategories()),
      teamAPI.getAll().catch(() => getTeams()),
      departmentAPI.getAll().catch(() => getDepartments()),
      workCenterAPI.getAll().catch(() => getWorkCenters()),
    ]).then(
      ([e, c, t, d, w]) => {
        setEquipments(e)
        setEquipmentCategories(c)
        setTeams(t)
        setDepartments(d)
        setWorkCenters(w)
      }
    )
  }, [])

  /* ---------------- SUBMIT CATEGORY ---------------- */

  const handleCategorySubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await equipmentCategoryAPI.create({
        ...categoryFormData,
        teamId:
          categoryFormData.teamId === 'none'
            ? null
            : categoryFormData.teamId,
      })

      setCategoryFormData({
        name: '',
        companyName: 'My Company',
        teamId: 'none',
      })

      setIsCategoryDialogOpen(false)
      setEquipmentCategories(await equipmentCategoryAPI.getAll())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- SUBMIT EQUIPMENT ---------------- */

  const handleEquipmentSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await equipmentAPI.create(equipmentFormData)
      setIsEquipmentDialogOpen(false)
      setEquipments(await equipmentAPI.getAll())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- FILTER ---------------- */

  const filteredEquipments = useMemo(() => {
    if (!searchQuery.trim()) return equipments
    return equipments.filter(
      (e) =>
        e.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.serialNumber?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [equipments, searchQuery])

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Equipment Management</h1>

        {/* CATEGORY SECTION */}
        <div className="bg-white p-6 rounded-lg mb-6 border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold flex items-center gap-2">
              <FolderOpen className="text-purple-600" />
              Categories
            </h2>

            {canEdit && (
              <Dialog
                open={isCategoryDialogOpen}
                onOpenChange={setIsCategoryDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Category
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
                    <DialogDescription>
                      Team is optional
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleCategorySubmit} className="space-y-4">
                    <Input
                      placeholder="Category name"
                      value={categoryFormData.name}
                      onChange={(e) =>
                        setCategoryFormData({
                          ...categoryFormData,
                          name: e.target.value,
                        })
                      }
                      required
                    />

                    <Select
                      value={categoryFormData.teamId}
                      onValueChange={(v) =>
                        setCategoryFormData({
                          ...categoryFormData,
                          teamId: v,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select team (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {teams.map((t) => (
                          <SelectItem key={t._id} value={t._id}>
                            {t.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {error && (
                      <p className="text-sm text-red-600">{error}</p>
                    )}

                    <DialogFooter>
                      <Button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {equipmentCategories.map((c) => (
              <div key={c._id} className="p-3 border rounded-lg">
                <p className="font-medium">{c.name}</p>
                <Badge>{c.teamName || 'No Team'}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* SEARCH */}
        <Input
          placeholder="Search equipment..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 max-w-md"
        />

        {/* EQUIPMENT TABLE */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Serial</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredEquipments.map((e) => (
              <TableRow key={e._id}>
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.serialNumber}</TableCell>
                <TableCell>{e.departmentName}</TableCell>
                <TableCell>{e.categoryName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Equipment
