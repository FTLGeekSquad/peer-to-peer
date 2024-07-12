# Project Plan

Pod Members: **Jazlyn Jones,Roxana Cruz, Sydney Brown**

## Problem Statement and Description

Problem Statement: Photography enthusiasts often face high costs and limited availability when trying to access specialized photography equipment & studio space for short-term use. Whereas, photography professionals often under utilize their photography equipment. This occurs since there is no platform that allows peer to peer rental of photography equipment.

Description: The main purpose of our project is to create a peer-to-peer photography rental website that addresses the challenges faced by both photography enthusiasts and professionals. Our site will have three main categories: equipment, spaces, and services. Users with an account can list their photography gear, studios, and services for rent, or find and rent those resources from others. Our platform will enable enthusiasts to access photography equipment, spaces, and services affordably in the short term, while allowing professionals to monetize underutilized equipment.

## User Roles and Personas

* Those seeking to rent photography equipment, services, & spaces
* Owners of photography equipment looking to rent their items. 

## User Stories

**As a [user role], I want to [what], so that [why]**

As an unregistered or registered user I want to browse everything available for rent viewing item cards with a photo, title, and cost, so that I can gauge my interest in the website’s items

As an unregistered or registered user, I want to click on an item card and view a modal with a photo, title, cost, and description of the item

As a new user I want to create an account so that I can either list or rent on the website

As a returning user, I want to use my existing username and password to log into the website and view my current listings and rentals on my profile page

As a returning user seeking to rent, I want to save item cards to my profile so that I can look back at my considerations later

As a returning user seeking to rent, I want to mark item cards saved to my profile as ‘renting’ when I have completed a transaction separate from the website

As a returning user, I want to be able to upload a title, description, photo, contact information,  and cost of a listing so that I can rent my stuff out on the website

As an unregistered user, I want to be prompted to create an account or log in when I click ‘rent now’ on an item before I can see the owner’s contact information

As a returning user seeking to manage my listings, I want to be able to mark a listing on my profile as ‘rented’ when I have completed an offline transaction

As a registered or unregistered user, I want to be able to view a search bar on the home page so that I can search by the name of what I’m seeking

As a registered or unregistered user, I want to have the option to filter my searches to only include certain categories of items (equipment, spaces, services) so that I can cater them to my interests

As a registered or unregistered user, I want to filter my searches to only include items in certain price ranges so that I can cater them to my interests


## Pages/Screens

* Home Page
* Category Pages x 3 (equipment, spaces, services)
* Profile Page
* Product Card Modal
* Create a Listing Modal

[Wireframe Link](https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FssHku0UqNFGUfcUHvvj3tf%2FWireFrames%3Fnode-id%3D0-1%26t%3DW0MyPpX2WVSybXfY-1)

[Wireframe Images](https://drive.google.com/drive/folders/1xzKRmF_hp8YOQLIT1zqxSsHsbAsKHIsy?usp=sharing)

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
| savedListing | Object[ {boolean, listingId} ] | If a listing is saved, it will display on profile |

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
| availability| Object[ {dateTime, boolean} ]     | An array of pairs containing to and from dates |


### Review

| Column Title| Type        | Description |
| ----------- | ----------- |-----------  |
| reviewId    | int         | primary key |
| userId      | User        | Associates the review to it's belonging user (relation userId) |
| message     | str         | The created review message
| rating      | int         | A 1-5 rating of the listing that will be depicted as stars
| listingId   | int         | The associated Id of the listing being reviewed
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
| Read        | GET         | reviews/listingId  |Fetch review by listing

### Listing Endpoints
| Crud         | HTTP Verb  | Route                 | Description|
| ----------- | ----------- |-----------            |----------------
| Read        | GET         | listings              |List all listings
| Read        | GET         | listings/listingsId   |Fetch listing by ID
| Read        | GET         | listings/equipment    |List all listings
| Read        | GET         | listings/space        |List all listings
| Read        | GET         | listing/service       |List all listings
| Delete      | DELETE      | listings/listingId    |Delete review by ID
| Update      | PUT         | listings/listingId    |Update review by ID
| Read        | GET         | listing/userId        |Fetch listing userId



***Don't forget to set up your Issues, Milestones, and Project Board!***

[Project Plan - Trello Board](https://trello.com/invite/b/O6PJXpW9/ATTI3291485ca24699c10d24214fc0eadf456AD980BA/geeksquad-capstone)
Please request to join and we will give permission to view our product planning
