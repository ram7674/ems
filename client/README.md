----------client-------------
==>create react app
    npm create vite@latest my-app
==>packages: 
    npm install react-router-dom
-----------------*----------------



----------server-------------
==>packages
   npm install cors express bcrypt jsonwebtoken mysql2 nodemon multer
-----------------*----------------


------------mysql------------
==>Register talbe (users):
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'employee') NOT NULL,
        profile_image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
-----------------*----------------




----------doutes-----------
==> Why EMS Typically Has Only a Login Page?
    In most corporate or admin-controlled systems, employees do not self-register. Instead
    Admins (or HR) create accounts for new employees.
    Employees are only given login access with their pre-assigned credentials.
    This ensures better security and control over who enters the system.
-----------------*----------------




-----------------*----------------
 ==>   authcontroller = login

    all doen check this pages only
    1) context (authcontext.jsx)
    2) authcontext.jsx is wrap the main.jsx ----here (Children) is Capatal edite the small letter (capital) letter.
    3) add the employe-dashboard 
    4) middleware ----authmeddleware.js
-----------------*----------------



-----------------*----------------
  ==> in dashboard first create the department department => employee => leaves => salary => 
-----------------*----------------



departmentList.jsx = department.jsx




----------------- pages information ----------------
==> Department
   1) first create the Department.Jsx
     inside this there is several page like
     1) create-new-Department, 
     2) after create new department show the data below like table.(using DepartmentColumns.jsx) component.
     3) edit-Btn,
     4) delete-Btn

     1.1) create-new-Department if i click the create-new-Department btn show the (DepartmentAdd.jsx) page and shows the form to enter the data here maintain the server.js files also  (DepartmentAdd.js)
     
     1.2) DepartmentHealper.jsx this is the saparate folder to create the DataTable to show the tables data. this is import the Department.Jsx 

     1.3)  edit-Btn
          step-1 ==> create the basic editeDepartment.jsx page
          step-2 ==> department.jsx component pass the id params to the "action: <DepartmentButtons id={dep.id} /> like this"
          step-3 ==> departmentColumns.jsx passing props to the DepartmentButtons component {id} like this. and the onClick event to navigate based to the "id" like this onClick={() => navigate(`/admin-dashboard/departments/${id}`)}
          step-4 ==>routers/department.js component create the route so its already privious data show the inputs so first create the get router the data to the editDepartment.js if i click the edit button shows the editDepartment.jsx component.
          step-5 ==> what we addDepartment.jsx form data is added edit button based on id show the data to the inputs based on id
          step-6 ==> after handleSubmin button to eddited data save to the same id update that data.

    2) delete btn
       step-1 ==>move to the departmentColumns.jsx page and inplement the handleDelete function pass id to write the handleDelete funtion implement the try catch block.
       step-2 ==> Department.jsx page implement the onDepartmentDelete function to fileter the deleted id to store the data variable.
       step-3 ==>
       step-4 ==>
       step-5 ==>
       step-6 ==>


==> Employee page
    1) Add new Employee
        step-1 => add new employee form inside all inputs fill the data but the department we can't do that so fetch the backend department(EmployeeHelper.jsx) data and and using the inside the (employeeAdd.jsx) component inside the select option map to get the all departments data  
    
    2) fetch the employee data
       step-1 => 

-----------------*----------------






























