-- phpMyAdmin SQL Dump
-- version 5.2.0-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 09, 2023 at 09:20 PM
-- Server version: 10.6.11-MariaDB-log
-- PHP Version: 8.2.2

--
-- Table structure for table `Products`
--
CREATE TABLE Products (
  productID int NOT NULL AUTO_INCREMENT,
  productName varchar(255) NOT NULL,
  productType varchar(255) NOT NULL,
  productPrice float NOT NULL,
  productDescription text,
  PRIMARY KEY (productID)
);

--
-- Dumping data for table `Products`
--
INSERT INTO `Products` (`productID`, `productName`, `productType`, `productPrice`, `productDescription`) VALUES
(1, 'Meta Portal', 'monitor', 120, 'When working from home, Meta Portal can be your dedicated video calling device. Use Zoom and your other trusted apps, sync calendars and always be heard with voice enhancing audio.'),
(2, 'VR Arcade Games 5D Car Driving', 'seat', 7850, 'VR Arcade Games 5D Car Driving Simulator Seats Racing VR Car with VR Glasses'),
(3, 'Meta Quest 2', 'glass', 349, 'Quest 2 is the all-in-one system that truly sets you free to roam in VR. With no wires or cables to limit your experience, simply put on the headset, draw out your play space, and jump into fully-immersive, imagination-defying worlds');

--
-- Table structure for table `Users`
--
CREATE TABLE Users (
  usersID int NOT NULL AUTO_INCREMENT,
  firstName varchar(255) NOT NULL,
  lastName varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  currentAddress varchar(255) NOT NULL,
  PRIMARY KEY (usersID)
);

--
-- Dumping data for table `Users`
--
INSERT INTO Users (firstName, lastName, email, currentAddress) VALUES
('John', 'Doe', 'johndoe@example.com', '123 Main St'),
('Jane', 'Doe', 'janedoe@example.com', '456 Elm St'),
('Bob', 'Smith', 'bobsmith@example.com', '789 Oak St');

--
-- Table structure for table `Interaction`
--
CREATE TABLE Interaction (
  interactionsID int(11) NOT NULL AUTO_INCREMENT,
  productID int(11) NOT NULL,
  interactionType varchar(255) DEFAULT NULL,
  timeStamp datetime DEFAULT NULL,
  PRIMARY KEY (interactionsID),
  FOREIGN KEY (productID) REFERENCES Products (productID) ON DELETE CASCADE
);

--
-- Dumping data for table `Interaction`
--
INSERT INTO Interaction (interactionsID, productID, interactionType, timeStamp) VALUES
(1, 1, 'view', '2023-03-02 12:00:00'),
(2, 1, 'purchase', '2023-03-02 14:30:00'),
(3, 2, 'view', '2023-03-02 13:00:00');

--
-- Table structure for table `InteractionRecords`
--
CREATE TABLE InteractionRecords (
  RecordID INT PRIMARY KEY,
  InteractionID INT,
  UserID INT,
  Timestamp DATETIME,
  FOREIGN KEY (InteractionID) REFERENCES Interaction (interactionsID) ON DELETE CASCADE,
  FOREIGN KEY (UserID) REFERENCES Users (usersID) ON DELETE CASCADE

);

-- Dumping data for table InteractionRecords
INSERT INTO InteractionRecords (RecordID, InteractionID, UserID, Timestamp)
VALUES
(1, 1, 1, '2023-03-02 12:30:00'),
(2, 2, 2, '2023-03-02 13:45:00'),
(3, 3, 3, '2023-03-02 15:20:00');

--

-- Table structure for table Feedbacks
CREATE TABLE Feedbacks (
FeedbackID INT PRIMARY KEY,
usersID INT,
Comment TEXT,
Rating INT,
FOREIGN KEY (usersID) REFERENCES Users (usersID) ON DELETE CASCADE
);

--

-- Dumping data for table Feedbacks
INSERT INTO Feedbacks (FeedbackID, usersID, Comment, Rating) VALUES
(1, 1, 'Great product!', 5),
(2, 2, 'Could be better', 3),
(3, 3, 'Awesome!', 4);

--

-- Table structure for table Orders
CREATE TABLE Orders (
OrderID INT PRIMARY KEY,
UserID INT,
OrderDate DATETIME,
FOREIGN KEY (UserID) REFERENCES Users (usersID) ON DELETE CASCADE
);

--

-- Dumping data for table Orders
INSERT INTO Orders (OrderID, UserID, OrderDate) VALUES
(1, 1, '2023-03-01 12:30:00'),
(2, 2, '2023-03-02 10:15:00'),
(3, 3, '2023-03-02 16:45:00');

--

-- Table structure for table ProductsHasOrders
CREATE TABLE ProductsHasOrders (
ProductID INT,
OrderID INT,
PRIMARY KEY (ProductID, OrderID),
FOREIGN KEY (ProductID) REFERENCES Products (productID) ON DELETE CASCADE,
FOREIGN KEY (OrderID) REFERENCES Orders (orderID) ON DELETE CASCADE
);

--

-- Dumping data for table ProductsHasOrders
INSERT INTO ProductsHasOrders (ProductID, OrderID) VALUES
(1, 1),
(2, 1),
(2, 2),
(3, 3);
