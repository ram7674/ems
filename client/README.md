----------client-------------
==>create react app
    npm create vite@latest my-app
==>packages: 
    npm install react-router-dom




----------server-------------

==>packages: 
   npm install cors express bcrypt jsonwebtoken mysql2 nodemon multer




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







----------doutes-----------
==> Why EMS Typically Has Only a Login Page?
    In most corporate or admin-controlled systems, employees do not self-register. Instead:
    Admins (or HR) create accounts for new employees.
    Employees are only given login access with their pre-assigned credentials.
    This ensures better security and control over who enters the system.