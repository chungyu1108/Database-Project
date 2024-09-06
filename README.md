# a. Overview
Kobeni’s Automotive is a small chain of auto repair shops throughout Northern California and Southern Oregon, with revenue in excess of 1.5 million dollars a year. With business booming after the pandemic, corporate staff have decided to implement a more service request system, as they have been keeping records on paper so far. A database-driven website will allow customers and technicians to better plan and track service requests.
# b. Database Outline, in Words
Customers: records the details of Customers who wish to have services performed on their Vehicles
·	customerID: int, auto_increment, unique, not NULL, PK
·	email: varchar, not NULL
Relationship: a 1:M relationship between Customers and Vehicles is implemented with CustomerID as a FK inside of Orders.
Locations: details the branch Locations of every automotive repair
·	BranchID: int, auto_increment, unique, not NULL, PK
·	state: char(5), not NULL
·	city: varchar(145), not NULL
Relationship: a 1:M relationship between Locations and Vehicles is implemented with Locations_Branch ID as a FK inside of Vehicles. Each vehicle can be at only one location, and multiple locations cannot have the same vehicle at once.
Technicians: details about Technicians working on cars
·	TechnicianID: int, auto_increment, unique, not NULL, PK
·	name: varchar(145), not NULL
Relationship: a 1:M relationship between Technicians and Service is implemented with Technicians_TechnicianID as a FK inside of Orders. Every service has only one Technician assigned, but a Technician may work on many Services.
Vehicles: records the details of Vehicles which need a service performed
·	VehicleID: int, auto_increment, unique, not NULL, PK
·	make: varchar, not NULL
·	model: varchar, not NULL
·	year: varchar, not NULL
·	color: varchar, not NULL ·	owner: varchar, not NULL
·	CustomerID:
·	BranchID:
Relationship: a 1:M relationship between Customers and Vehicles is implemented with Customers_Customerid as a FK inside of Orders. A Customer may have many vehicles serviced, but each vehicle only belongs to one Customer.
Service: records the details of a Service that is to be done on a Vehicle
·	ServiceID: int, auto_increment, unique, not NULL, PK
·	description: varchar, not NULL
·	service_date: date, not NULL
·	TechnicianID: INT, FK for Technicians.TechnicianID
Relationship: a M:M relationship between Services and Vehicles is implemented with the Service_has_Vehicles table. Each service may happen on multiple Vehicles, and a Vehicle may have many Services. 
# c. Entity-Relationship Diagram:
![image](https://github.com/user-attachments/assets/06a02edc-4a6b-4bbd-81f8-8dbf8c502fab)
