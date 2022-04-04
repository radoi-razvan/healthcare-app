<div id="top"></div>

# Healthcare

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#main-features">Main Features</a></li>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#visuals">Visuals</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#development-team">Development Team</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

There two projects. The first project is a patients management app. Used technologies: Angular, HTML, CSS, JavaScript, TypeScript. The second project is a doctors management app. Used technologies: NodeJS .

<p align="right">(<a href="#top">back to top</a>)</p>


### Main Features

First Project:
- Patients waiting list display sorted by the order number
- Patients CRUD operations (Create, Read, Update, Delete) 

Second Project:
- Doctors JSON and csv file post request
- Role based authentication

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

Back End:
* [NodeJS][node]

Front End:
* [HTML][html]
* [CSS][css]
* [JavaScript][js]
* [Angular][angular]

Database Management:
* [JSON Web Server][json-web-server]

IDE:
* [Microsoft Visual Studio Code][visual-studio-code]

<p align="right">(<a href="#top">back to top</a>)</p>

### Visuals

First project main page:

![angular_page.jpg][angular-main-page]

First project add/edit form:

![angular_add_edit_page.jpg][angular-add-edit-page]

First project delete page:

![angular_delete_page.jpg][angular-delete-page]

Second project post request JSON, post request JSON same id, post request CSV file:

![node_post_test.jpg][node-post-test]



<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

### Installation

First project:
- There is no installation process required.

Second Project:
- In Visual Studio Code type the following command `npm install`.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

First project:
- In Visual Studio Code run the angular server using `ng serve`.
- In Visual Studio Code run the json web server using `npm start server`.

Second Project:
- In Visual Studio Code run the server using `npm run dev`.
- In Postman add a new header for POST requests with the key:`x-vamf-jwt`
and the value: `Bearer <token>` where `<token>` is the Base64 encoding for the following format 
```
{
  "authenticated": true,
  "iss": "JWT Builder",
  "facility": ["12", "13"],
  "roles": ["Admin"]
}
``` 
- In the Postman body of the POST request you can send JSON payload with the following format
```
{
	"resourceType" : "Practitioner",
	"id": "1",
	"name": [{"family":"TestFamily","given":["TestGiven"],"text":"TestFamily TestGiven"}],
	"facility": [
		{	
			"value": "1",
			"system": "http://us.gov/NPI",
			"name": "Facility Name"
		},
		{	
			"value": "2",
			"system": "http://us.gov/NPI",
			"name": "Other Facility Name"
		}
	],
	"active": true
}
```
- Or select `form-data` and add a CSV file with the key `file` and the format following 
```
ID, FamilyName, GivenName, FacilityId, SystemId, NameId, Active
1, Popescu, George, 12, http://ro.gov/NPI, Spital Tulcea, true
1, Popescu, George, 13, http://ro.gov/NPI, Spital Sfantu Gheorghe, true
1, Popescu, George, 13, http://ro.gov/NPI, Spital Constanta, false
2, Ionescu, Catalin, 12, http://ro.gov/NPI, Spital Tulcea, true
```



<p align="right">(<a href="#top">back to top</a>)</p>


## Development Team

* [Radoi Razvan's GitHub][radoi-razvan]

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[angular]: https://angular.io/
[node]: https://nodejs.org/en/
[html]: https://html.com/
[css]: https://www.w3.org/Style/CSS/Overview.en.html
[js]: https://www.javascript.com/
[visual-studio-code]: https://code.visualstudio.com/
[json-web-server]: https://www.npmjs.com/package/json-server 

[radoi-razvan]: https://github.com/radoi-razvan

[angular-main-page]: project_photos/angular_main_page.jpg
[angular-add-edit-page]: project_photos/angular_add_edit_page.jpg
[angular-delete-page]: project_photos/angular_delete_page.jpg
[node-post-test]: project_photos/node_post_test.jpg