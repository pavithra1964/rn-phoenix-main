import Employee from "../../models/Employee"

export const CREATE_EMPLOYEE = "CREATE_EMPLOYEE";
export const EDIT_EMPLOYEE = "EDIT_EMPLOYEE";

export const addEmployee = ( Emp_Name, Salary, D_o_Join, Gender) => {
    return async (dispatch, getState) => {
         
let employee = new Employee (
    Math.random().toString(),
    Emp_Name,
    Salary,
    D_o_Join,
    Gender
)
dispatch({
    type: CREATE_EMPLOYEE,
    employeeDetail: employee
})


    }
}

export const editEmployee = (employeeId, Emp_Name, Salary, D_o_Join, Gender) => {
    return async (dispatch, getState) => {
         
let employee = new Employee (
    id = employeeId,
    Emp_Name,
    Salary,
    D_o_Join,
    Gender
)
dispatch({
    type: EDIT_EMPLOYEE,
    employeeDetail: employee
})


    }
}