# TalentSphere_Frontend

![alt text](<Copy of Reci-.png>)

## Date : 03/2024

## Overview

[Talent Sphere] consists of two main repositories:

- [Frontend](https://github.com/fsky99/project4_Frontend)
- [Backend](https://github.com/fsky99/project4_Backend)

## Live Version (UNDER DEVELOPMENT)

Click the following link to be redirected to the live version of the code. [Talent Sphere](link of project)

## About the Project

TalentSphere is a comprehensive HR Management System web application designed to streamline HR processes at a software company. The system provides a user-friendly interface for both HR Admins and Employees to manage various HR-related tasks.

[Trello Board](https://trello.com/b/ZpscjDPo/project4)

## Functionality

### HR Admin:

- Full CRUD access to the database
- Manage employee accounts, vacations, and requests
- Oversee company events and activities

### Employee:

- View personal information and performance
- Request updates and days off
- Access company directory and events

### CRUD Operations

- **Create:** Add new employees, events, and requests
- **Read:** View employee profiles, remuneration details, and event schedules
- **Update:** Modify employee information, approve requests, and update event details
- **Delete:** Remove employee accounts and events from the system

## Screenshots:
## Login Page ![Login Page](login.png)
## My Activity Page ![My ACtivity Page](myActivity.png)
## Employee Remmuniration Page ![Emp Page](emplooyeeRemmuniration.png)
## Add Employee  Page ![Add emp Page](addEmp.png)



### Hierarchy Diagram:

- [Link to Diagram] (https://lucid.app/lucidchart/3557353f-8d1e-4038-8495-074e3cc97969/edit?viewport_loc=-4688%2C-298%2C2528%2C1282%2C0_0&invitationId=inv_2abaf856-b787-402b-a848-e779cfb82900)

### wireframe:
## Wireframe ![Home Page](Home.png)

### Real website:

## Technologies used

- [x] VSCode (Editor for Writing the Code)
- [x] Node Js (Backend)
- [x] Express (API Calls)
- [x] postgresql (Databse)
- [x] Angular TS (Frontend)
- [x] Trelllo (Managment for the work)
- [x] lucidchart (ERD for the database)

---

## What we are most proud of is :

### function

```
combineData() {
   
   if (this.usersData.length > 0 && this.leaves.length > 0 && this.employeeJobInfo.length > 0) {
 
     this.combinedData = [];
     this.usersData.forEach((user: any) => {
      
       const emplJIfo = this.employeeJobInfo.find((job: any) => job.userID === user.id);
       const leaves = this.leaves.filter((leave:any)=>leave.userID === user.id)
       const activity = this.activities.filter((act:any)=>act.userID === user.id)
       if(leaves && leaves.length >0){
         this.combinedData.push({ ...user, emplJIfo ,activity,leaves });
       }
     });

     console.log(this.combinedData);
   }
```

---

### Future plans:

- [] Include a message system where users can message HR Admin both with their name and anonymously.
- [] Introduce a mobile application.
- [] Import a charts for the Admin HR to view. 

---

Our team:

- Fatima Fouad ([github repo](https://github.com/fsky99))
- Shaika Ebrahim ([github repo](https://github.com/Shaikhask))
- Shaika Abdulla ([github repo](https://github.com/Shaikha277))
- Ahmed RAli ([github repo](https://github.com/Ahmedrali1))
