# CUBICORNIO
#### Video Demo:  <https://www.youtube.com/watch?v=i6CuOP2KYvg>
#### Description:


###### **IMPORTANT: This is a Web App with responsive design, we know that young people will use it more once it will be fully integrated and developed.**
###### **So, a basic requeriment was to develop an adaptative version for Android or iOS.**

### WHAT CUBICORNIO IS?

###### This website was created considering several phases and versions.
###### The first one (v1.0) plays the role of a “Search Engine” where people can find prices of every product, material, etc.


### PRICES?

###### For this instance, we gathered free information on the internet about construction material prices. But our goal is to collect information about products, services, rents and all other stuff that have a price.
###### In the future, we will search and gather data from webpages, magazines, markets, stores, groceries and all places that manages its services and products through monetary amounts.

### Requirements:

###### Flask
###### Flask MySQL
###### Flask Session*
###### Requests
###### Flask-WTF

### LIBRARIES USED

###### Bootstrap
###### Google Font-Oxygen ( FUTURA isn’t free :( )
###### AOS Library
###### jQuery
###### Bootstrap Select
###### AJAX

### DATABASE USED

###### MySQL
###### To develop was used APACHE with XAMPP Control and phpMyAdmin (all was managed from Windows CMD console)

### PRINCIPAL FEATURES

###### Landing page with 4 sections. I take advantage of CSS properties to create more interactive content (such as write and delete searchbar feature, flip cards, etc)
###### Interactive selectable SVG map correlated with 3 <select> options linked between them by AJAX calls.
###### Disabled buttons that will turn on once a district is selected.
###### Searchbar ( Reference Lord Google :) ) with dropdown selectable list.
###### <div id=“results”> where the prices are displayed, considering its measure units, several SQL calls, interactive AJAX called buttons, and soon will be displayed from where all this prices come from.

### WHAT FILES DO AND HOW THEY ARE LINKED

#### HTML FILES

###### apology.html ---> manage errors
###### cotizaciones.html ---> CSS: styles2.css ----> JS: scriptAJAX.js
###### develop.html ---> this page whos what features are under development
###### index.html ----> use layout.html as main format file
###### layout.html ---> CSS: styles1.css ----> JS: script.js
###### login.html --> disabled
###### register.html --> disabled
###### respuesta2.html ----> <div> that contain AJAX calls

#### PYTHON FILES

###### application.py --> Here we generate all routes and SQL calls
###### helpers.py --> apology format and money formats

#### DATABASE FILES

###### bd_insumos.sql --> script to generate the database used for development purposes
