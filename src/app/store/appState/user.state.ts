
export interface UserManage {
    userInfor: User[];  // Fix the property name here
}


export interface User {
    access_token: string,
    email: string,
    groupWithRoles: {},
    refresh_token: string,
    username: string
}








