import React, { useState, useEffect } from 'react'
import { getTeams, getTeamMembers } from '@/lib/getData'
import { teamAPI } from '@/lib/api'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
import { Input } from '@/components/ui/input'
import { ChevronDown, ChevronUp, Users, Plus } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { cn } from '@/lib/utils'
import { isAdminOrManager } from '@/lib/authUtils'

const Teams = () => {
  const [teams, setTeams] = useState([])
  const canEdit = isAdminOrManager()
  const [expandedTeams, setExpandedTeams] = useState(new Set())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({ teamName: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch teams
  useEffect(() => {
    fetchTeams()
  }, [])

  const fetchTeams = async () => {
    try {
      const data = await teamAPI.getAll()
      setTeams(data)
    } catch (error) {
      console.error('Error fetching teams:', error)
      // Fallback to mock data if API fails
      setTeams(getTeams())
    }
  }

  const toggleTeam = (teamId) => {
    const newExpanded = new Set(expandedTeams)
    if (newExpanded.has(teamId)) {
      newExpanded.delete(teamId)
    } else {
      newExpanded.add(teamId)
    }
    setExpandedTeams(newExpanded)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await teamAPI.create({ teamName: formData.teamName })
      setFormData({ teamName: '' })
      setIsDialogOpen(false)
      await fetchTeams()
    } catch (error) {
      console.error('Error creating team:', error)
      setError(error.message || 'Failed to create team')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Teams Management</h1>
          <p className="text-gray-600">View all teams and their members</p>
        </div>

        {/* Teams Table */}
        <div className="bg-white rounded-lg shadow-sm border border-purple-100 overflow-hidden">
          <div className="p-6 border-b border-purple-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              Teams List ({teams.length})
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
                    <DialogTitle>Add New Team</DialogTitle>
                    <DialogDescription>
                      Create a new team. Team name is required.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="teamName" className="text-sm font-medium">
                          Team Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="teamName"
                          value={formData.teamName}
                          onChange={(e) => setFormData({ teamName: e.target.value })}
                          placeholder="e.g., Mechanical Internal Maintenance Team"
                          required
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
                        {loading ? 'Creating...' : 'Create Team'}
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
                  <TableHead className="font-semibold text-gray-900 w-12"></TableHead>
                  <TableHead className="font-semibold text-gray-900">Team Name</TableHead>
                  <TableHead className="font-semibold text-gray-900">Number of Members</TableHead>
                  <TableHead className="font-semibold text-gray-900">Team Members</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teams.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                      No teams available.
                    </TableCell>
                  </TableRow>
                ) : (
                  teams.map((team) => {
                    const isExpanded = expandedTeams.has(team._id)
                    // Handle both API response (members array with user objects) and mock data (member IDs)
                    const members = team.members 
                      ? (team.members[0]?.name ? team.members.map(m => m.name) : getTeamMembers(team._id))
                      : getTeamMembers(team._id)
                    
                    return (
                      <React.Fragment key={team._id}>
                        <TableRow className="hover:bg-purple-50/50">
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleTeam(team._id)}
                              className="h-8 w-8"
                            >
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                          <TableCell className="font-medium text-gray-900">
                            {team.name}
                          </TableCell>
                          <TableCell className="text-gray-700">
                            {members.length} member{members.length !== 1 ? 's' : ''}
                          </TableCell>
                          <TableCell className="text-gray-700">
                            {members.length > 0 ? (
                              <span className="text-sm">
                                {members.slice(0, 2).join(', ')}
                                {members.length > 2 && ` +${members.length - 2} more`}
                              </span>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                        </TableRow>
                        {isExpanded && (
                          <TableRow className="bg-purple-50/30">
                            <TableCell colSpan={4} className="py-4">
                              <div className="pl-8">
                                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                                  Team Members ({members.length}):
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {members.map((memberName, index) => (
                                    <div
                                      key={index}
                                      className="inline-flex items-center px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium border border-purple-200"
                                    >
                                      {memberName}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Teams

