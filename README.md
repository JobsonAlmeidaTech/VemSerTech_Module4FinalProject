# <p align="center"> Vem Ser Tech Course - Module 1 Final Project - Car Dealership </p>

<p align="center">
<img src="images/VemSerTech.jpg"  alt="VemSerTech" height="200px align="left" />
<img src="images/books.jpg"  alt="books" height="200px align="right"/>
</p>

## Vem Ser Tech

Vem Ser Tech was a course offered by a partnership between the companies Ada Tech and iFood. Each student was offered one subject among 4 possibilities: Front-End, Back-End, DevOps and Data. I chose the Back-End technology track, which aimed to study the JavaScript language divided into 6 modules:

Module 1: Programming Logic

Module 2: Object-Oriented Programming

Module 3: Database

Module 4: Node.js with Express (intermediate level)

Module 5: Node.js with Express (advanced level)

Module 6: Automated Testing

The course lasted about 6 months with synchronous classes every Monday, Wednesday and Friday, from 7pm to 10pm, between October 6, 2023 and March 23, 2024. You can find more information about this course here: <a href="https://ada.tech/sou-aluno/programas/ifood-vem-ser-tech">Vem Ser Tech</a>

## Purpose 

At the end of the fourth module, students were divided into groups and were challenged to build a markplace API. Therefore, the group I was part of decided to build an API for a book marketplace called ABC Livros. This API was built using the nodejs framework and several concepts such as middleware, authenticated routes using the jwt package and database administration using mongoose as ODM (Object Document Mapping) were applied to manage the MongoDB database.

More about the specified requirements for this project can be read in the document below written by the module professor.

## Requirements

You and your team were asked to create an API for a marketplace for some type of product of your choice, it could be a marketplace for books, cars, etc. Therefore, the API must have the following functionalities:

<li>User registration</li>
<li>User login</li>
<li>Product registration</li>
<li>Product editing</li>
<li>Product deletion</li>
<li> List of products from all users</li>
<li>Download product image</li>
<br>

Therefore, each feature will be an api route and the features have the following rules:

<h3>User registration</h3>
<li>You must receive the username, email and password.</li>
<li> It should return the user id if it was saved successfully.</li>
<h3>User login</h3>
<li> You should receive the email and password.</li>
<li> Must return the user's token so they can access the other routes.</li>
<h3>Product registration</h3>
<li> You must receive product data, along with its category/type and product photo.</li>
<h3>Product deletion/Product editing</h3>
<li> Only the user who owns the product, who must be able to edit/delete it.</li>
<h3>List of products from all users</h3>
<li> It must be possible to filter products according to category and/or user ID</li>
<h3>Download product image</h3>
<li> When calling the route, the image must be available for download (if testing by insomnia, the image must appear in the return).</li>

<h2>Route rules</h2>
Only the <b>user registration</b>, <b>User login</b>, <b>Product listing for all users</b> and <b>Download product image< routes /b>, must be possible to access without authentication, all others will only be allowed access, with the authenticated user.
<br>
Add or create middleware to log all incoming requests.

<h2>Observations</h2>
Data persistence can occur via JSON.
Anyone who integrates with a bank, whether relational or not, will receive extra points.

<b>Groups of 2 to 3 people</b>