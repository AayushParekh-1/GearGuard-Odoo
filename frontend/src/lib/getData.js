import {departments,equipmentCategories,equipments,teams,users,workCenter, tickets} from '@/lib/MockData.js'

//helper function to fetch data so
export function getUsers(){
    return users;
}

export function getTickets(){
    return tickets;
}

export function getEquipments(){
    return equipments;
}

export function getUserByID(id){
    return users.find(user => user._id === id);
}

export function getTeams(){
    return teams;
}

export function getTeamMembers(teamId){
    const team = teams.find(t => t._id === teamId);
    if (!team) return [];
    
    return team.members.map(memberId => {
        const user = users.find(u => u._id === memberId);
        return user ? user.name : null;
    }).filter(name => name !== null);
}

export function getTeamByID(id){
    return teams.find(team => team._id === id);
}

export function getEquipmentCategories(){
    return equipmentCategories;
}

export function getEquipmentCategoryByID(id){
    return equipmentCategories.find(category => category._id === id);
}

export function getDepartments(){
    return departments;
}

export function getDepartmentByID(id){
    return departments.find(dept => dept._id === id);
}

export function getWorkCenters(){
    return workCenter;
}

export function getWorkCenterByID(id){
    return workCenter.find(wc => wc._id === id);
}

