import React, { useState } from 'react'
import { getTeams, getTeamMembers } from '@/lib/getData'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, Users } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { cn } from '@/lib/utils'

const Teams = () => {
  const teams = getTeams()
  const [expandedTeams, setExpandedTeams] = useState(new Set())

  const toggleTeam = (teamId) => {
    const newExpanded = new Set(expandedTeams)
    if (newExpanded.has(teamId)) {
      newExpanded.delete(teamId)
    } else {
      newExpanded.add(teamId)
    }
    setExpandedTeams(newExpanded)
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
          <div className="p-6 border-b border-purple-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              Teams List ({teams.length})
            </h2>
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
                    const members = getTeamMembers(team._id)
                    
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

