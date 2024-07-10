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


| Column Title| Type        | Description |
| ----------- | ----------- |-----------  |
| userId      | int         | primary key |
| name        | str         | name of the user |
| location    | str         | location of the user |
| allListings | listing     | Listings created by the user (relation userId) 
| reviews     | review[]    | Reviews created by the user (relation userId)
| saved       | listing[]   | Listings saved by the user (relation listingId)
| createdAt   | DateTime    | DateTime of the user's account creation |

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



| Column Title| Type        | Description |
| ----------- | ----------- |-----------  |
| reviewId    | int         | primary key |
| userId      | User        | Associates the review to it's belonging user (relation userId) |
| message     | str         | The created review message
| listingId   | str         | The associated Id of the listing being reviewed
| createdAt   | DateTime    | DateTime of the review's creation |

## Endpoints

List the API endpoints you will need to implement.

***Don't forget to set up your Issues, Milestones, and Project Board!***
