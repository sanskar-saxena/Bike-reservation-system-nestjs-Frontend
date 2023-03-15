# Bike Reservation System

Task functionalities
We have 2 user roles
	1. MANAGER
	2. REGULAR.
Managers can perform CRUD operations on users and bikes.

The bike will have the following details: Model, color, location, isAvailable, avgRating.

Managers Can - 
Perform CRUD on bikes.
Perform CRUD on users and managers.
See all the users who have reserved a bike, and the period of time they did it.
See all the bikes reserved by users and the period of time they did it.

Users Can - 
See the list of all bikes available for specific dates.
Filter by model, color, location, avgRating.
Reserve a bike for a specific period of time.
Rate the bike with a score of 1 to 5.
Cancel a reservation.
See a list of reservations and their status (active or cancel).
Rate an active reservation of his own with a Review ( comment, rating )
No Update Delete or Review on Reservation is required. 

NOTE: 
You don’t have to implement the backend by yourself, but you can use json-server to act as a dummy backend to server some responses. Quick tutorial on JSON Server

Since, its a mocked backend, the data consistency might be compromised for some updates for instance following exception is expected.
When adding a bike, provide the avgRating from the UI itself
When a Review is added or deleted, it might not change the avgRating of the bike
Don’t worry about the logic for bike reservation, Just reserve an available bike for valid dates. Reserved bikes can also be seen in available bike lists. 

IMPORTANT :-
Use sufficient validation in the frontend before calling API/services and BE should validate and check every edge case.
In the UI make use of toast/notification to notify the user of any changes that the user makes and submits. Also, reload data as any user the action succeeds to bring back new changes.
Use Pagination wherever list if being rendered. 

User authentication/authorization: -
Please use a token authentication method. Only logged in users will be able to access the app.
Create the signup, login, and logout flow accordingly.

![Screenshot (21)](https://user-images.githubusercontent.com/88779258/185732445-5b8522c8-9083-437f-9737-aba65313ec6a.png)
![Screenshot (22)](https://user-images.githubusercontent.com/88779258/185732448-20586e4b-6f41-4142-83d3-781dc9e03a48.png)
![Screenshot (23)](https://user-images.githubusercontent.com/88779258/185732449-b09a25e7-4c07-4768-8ce0-86800c4d19ad.png)
![Screenshot (24)](https://user-images.githubusercontent.com/88779258/185732451-3a7672b3-fab9-4f4e-94c9-f189bc0299f6.png)
![Screenshot (25)](https://user-images.githubusercontent.com/88779258/185732452-cb3fca12-d721-4977-bb21-c3fbfa3dd2b1.png)
![Screenshot (26)](https://user-images.githubusercontent.com/88779258/185732453-8b0d5a0a-220d-4935-8ecf-d747df5efcc0.png)
![Screenshot (27)](https://user-images.githubusercontent.com/88779258/185732456-b0f17ec7-ee8a-46f5-97a6-bd9f9ba08576.png)
![Screenshot (28)](https://user-images.githubusercontent.com/88779258/185732457-6a8bb258-8a3c-4ee9-be06-72f452eefbfa.png)
![Screenshot (29)](https://user-images.githubusercontent.com/88779258/185732459-ddf6293a-6481-4592-8769-6d503ad3bd58.png)
![Screenshot (30)](https://user-images.githubusercontent.com/88779258/185732461-57deda26-fe07-4b30-af76-37da0601cbef.png)
![Screenshot (31)](https://user-images.githubusercontent.com/88779258/185732462-92c92895-9a37-4d2d-b5ea-97e08f045f17.png)
![Screenshot (32)](https://user-images.githubusercontent.com/88779258/185732463-b6346183-82b2-418b-a110-dbb27f47ad8b.png)
![Screenshot (33)](https://user-images.githubusercontent.com/88779258/185732464-cec5bb42-ee9a-4775-b646-f84e46e52f1b.png)


