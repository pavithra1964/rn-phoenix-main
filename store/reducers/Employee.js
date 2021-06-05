import { CREATE_EMPLOYEE, EDIT_EMPLOYEE } from "../actions/Employee";

let DummyData =[
    { id:"1", Emp_Name: "Rajesh", Salary: "25000", D_o_Join: "15.06.2019", Gender: "Male"},
    { id:"2", Emp_Name: "Divya", Salary: "45000.5", D_o_Join: "27.04.2017", Gender: "Female"},
    { id:"3", Emp_Name: "John", Salary: "35000", D_o_Join: "07.08.2017", Gender: "Male"}
]

const initialState = {
    employeeList: DummyData
}

export default (state = initialState, action) => {
    switch (action.type) {

            case CREATE_EMPLOYEE :
            return {
                ...state,
                employeeList: state.employeeList.concat(action.employeeDetail)
            }

            case EDIT_EMPLOYEE:
                const userEmployeeIndex = state.employeeList.findIndex(Emp => Emp.id === action.employeeDetail.id)
                const availableEmployeesIndex = state.employeeList.findIndex(Emp => Emp.id === action.employeeDetail.id)
                
                const updatedEmployee = [...state.employeeList]
                updatedEmployee[userEmployeeIndex] = updatedEmployee;
                const updatedAvailableEmployee = [...state.availableEmployees]
                updatedAvailableEmployee[availableEmployeesIndex] = updatedEmployee;
                return {
                    ...state,
                    availableEmployees: updatedAvailableEmployee,
                    userEmployee: updatedEmployee
                }
        
        default:    return state;
        };
}