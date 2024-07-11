# Project Plan

Pod Members: **Jazlyn Jones,Roxana Cruz, Sydney Brown**

## Problem Statement and Description

Insert the latest summary of your problem statement and app description.

## User Roles and Personas

Include the most up-to-date user roles and personas.

## User Stories

List the current user stories you will implement.

## Pages/Screens

List all the pages and screens in the app. Include wireframes for at least 3 of them.

## Data Model

Describe your app's data model using diagrams or tables

### User

| Column Title| Type        | Description |
| ----------- | ----------- |-----------  |
| userId      | int         | primary key |
| name        | str         | name of the user |
| location    | str         | location of the user |
| allListings | listing     | Listings created by the user (relation userId) 
| reviews     | review[]    | Reviews created by the user (relation userId)
| saved       | listing[]   | Listings saved by the user (relation listingId)
| createdAt   | DateTime    | DateTime of the user's account creation |

### Listing

| Column Title| Type        | Description |
| ----------- | ----------- |-----------  |
| listingId   | int         | primary key |
| title       | str         | title of the listing  |
| userId      | User        | Associates the listing to it's belonging user (relation userId) |
| description | str         | The user specified description of the listing 
| category    | str         | The Listing user selected category of the listing
| subCategory | str         | The Listing user specified description of the listing 
| priceHourly | str         | The Listing user selected sub- category of the listing
| photo       | str         | Url of the Listing user uploaded image(s)
| location    | string      | The user specified location of the listing
| reviews     | review[]    | An array of reviews with the associated listing id
| createdAt   | DateTime    | DateTime of the listing's creation |
| availability| dates[]     | An array of pairs containing to and from dates |

### Review

| Column Title| Type        | Description |
| ----------- | ----------- |-----------  |
| reviewId    | int         | primary key |
| userId      | User        | Associates the review to it's belonging user (relation userId) |
| message     | str         | The created review message
| rating      | int         | A 1-5 rating of the listing that will be depicted as stars
| listingId   | str         | The associated Id of the listing being reviewed
| createdAt   | DateTime    | DateTime of the review's creation |

## Endpoints
### User Endpoints
| Crud         | HTTP Verb  | Route        | Description|
| ----------- | ----------- |-----------   |----------------
| Read        | GET         | users        |List all users
| Read        | GET         |users/userId  |Fetch user by ID
| Delete      | DELETE      | users/userId |Delete user by ID
| Update      | PUT         | users/userId |Update user by ID
| Create      | POST        | users         |Create new user

### Review Endpoints 
| Crud         | HTTP Verb  | Route              | Description|
| ----------- | ----------- |-----------         |----------------
| Read        | GET         | reviews            |List all review
| Read        | GET         | reviews/reviewId   |Fetch review by ID
| Delete      | DELETE      | reviews/reviewId   |Delete review by ID
| Update      | PUT         | reviews/reviewId   |Update review by ID
| Create      | POST        | reviews/reviewId   |Create new review

### Listing Endpoints
| Crud         | HTTP Verb  | Route                 | Description|
| ----------- | ----------- |-----------            |----------------
| Read        | GET         | listings              |List all review
| Read        | GET         | listings/listingsId   |Fetch review by ID
| Read        | GET         | listings/equipment    |List all review
| Read        | GET         | listings/space        |List all review
| Read        | GET         | listing/service       |List all review
| Delete      | DELETE      | listings/listingId    |Delete review by ID
| Update      | PUT         | listings/listingId    |Update review by ID



***Don't forget to set up your Issues, Milestones, and Project Board!***
