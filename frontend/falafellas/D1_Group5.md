# CSCI 5709 Grp-05 (Project Proposal Web Application)

* *Date Created*: 27 Feb 2024
* *Last Modification Date*: 27 Feb 2024
* *Assignment URL*: https://falafellas.netlify.app/
* *Git URL*: https://git.cs.dal.ca/panchamia/csci-5709-grp-05

## Authors

- [Aditya Pattani](mailto:aditya.pattani@dal.ca)
- [Aakash Nandwani](mailto:ak824757@dal.ca)
- [Gunjan Vazirani](mailto:gn745979@dal.ca)
- [Krisha Panchamia](mailto:krisha.panchamia@dal.ca)
- [Samit Mhatre](mailto:sm904139@dal.ca)
- [Shweta Shweta](mailto:sh978835@dal.ca)

## Built With

- [Node JS](https://nodejs.org/en) - Javascript Runtime used for development
- [Npm](https://docs.npmjs.com//) - Dependency Management Tool
- [VS Code](https://code.visualstudio.com/) - Development code management tool
- [React](https://legacy.reactjs.org/docs/getting-started.html/) - Frontend Development Framework
- [Create React App](https://create-react-app.dev/docs/getting-started/) - Tool used to create react application
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) - Utility based CSS framework which makes writing CSS effortless for developers
- [Axios](https://github.com/axios/axios) - Promise based HTTP client which helps developers make API calls easily.

## Deployment

- Deployment of the Falafellas App is done using GitHub and Netlify. 

- Github Repo Link (Private-Repository): https://github.com/Mhatre-99/CSCI5709-Group5/

- Netlify Deployed Link: https://falafellas.netlify.app/

## Sources used


1. [ContactSection.jsx](/src/Components/Contact/ContactSection.jsx)

*Lines 60 - 85*
```js
<Form ref={form} onSubmit={emailService}>
    <label className="form-title">Have any Questions?</label>
    <Form.Group class="floating-label-group">
        <input className="name" type="text" id="name" autocomplete="on" required onChange={(e) => setName(e.target.value)} />
        <label for="name">Full Name</label>
    </Form.Group>
    <Row>
        <Col>
            <Form.Group class="floating-label-group">
            <input className="recipient" type="email" id="email" autocomplete="on" required onChange={(e) => setRecipient(e.target.value)} />
            <label for="email">Email</label>
            </Form.Group>
        </Col>
        <Col >
            <Form.Group class="floating-label-group">
            <input type="tel" id="name" autocomplete="on" required />
            <label for="phone">Phone</label>
            </Form.Group>
        </Col>
    </Row>
    <Form.Group class="floating-label-group">
        <textarea className="message" id="message" cols="40" rows="5" required onChange={(e) => setMessage(e.target.value)} ></textarea>
        <label for="message">Write your message here ... </label>
    </Form.Group>
    <Button type="submit" className="submit-button">Submit Message</Button>
</Form>

```
The code above was created by adapting the code in [Forms | React Bootstrap](https://react-bootstrap.netlify.app/docs/forms/overview) as shown below: 

```js

function BasicExample() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

```
- The code in [Forms | React Bootstarp](https://react-bootstrap.netlify.app/docs/forms/overview) was used as a reference to create the contact form of my web page. I modified the code to match the theme of our website making the form components modern and clean after carefully examining the original source and comprehending the logic and functionality of it. 
- [Forms | React Bootstarp](https://react-bootstrap.netlify.app/docs/forms/overview)'s code was used because our goal was to make the form responsive and Bootstrap has components which are build to be responsive. Using well-written code sped up our development process. The code was modified based on the project requirements. The input type and button designs were changed to match the theme of the website.

2. [ContactInfo.jsx](/src/Components/Contact/ContactInfo.jsx)
*Lines 10 - 97*
```js
<svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-geo-alt-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
            </svg>
          </span>
          <span>Dalhousie University</span>
        </div>
      </div>
      <div>
        <div className="sub-title">
          <span style={{ "margin-right": "10px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-envelope-at-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
              <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791" />
            </svg>
          </span>
          <span>info@falafellas.ca</span>
        </div>
      </div>
      <div>
        <div className="sub-title">
          <span style={{ "margin-right": "10px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-telephone-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
              />
            </svg>
          </span>

          <span>+1 987 765 54321</span>
        </div>
        <div style={{ "margin-top": "2rem" }}>
          <span className="details social">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-instagram"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
            </svg>
          </span>
          <span className="details social">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-facebook"
              viewBox="0 0 16 16"
            >
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
            </svg>
          </span>
          <span className="details social">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-twitter-x"
              viewBox="0 0 16 16"
            >
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
            </svg>

```
- The SVGs above was created by [Bootstrap Icons . Official open source SVG icon library for Bootstrap](https://icons.getbootstrap.com/?q=face)
- The purpose of using SVGs for our website to keep the design clean and easy to understand.


3. [FAQItem.js](/src/Components/FAQ/FAQItem.js)
*Lines 4 - 13*
```js
function FAQItem({ id, question, answer }) {
	return (
		<div>
			<Accordion.Item eventKey={id}>
				<Accordion.Header><b>{question}</b></Accordion.Header>
				<Accordion.Body>{answer}</Accordion.Body>
			</Accordion.Item>
		</div>
	);
}
```

The above code was created by adapting the codes available in [Accordion | React Bootstrap](https://react-bootstrap.netlify.app/docs/components/accordion/) as shown below:
```js
<Accordion.Item eventKey="0">
	<Accordion.Header>Accordion Item #1</Accordion.Header>
	<Accordion.Body>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
		eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
		minim veniam, quis nostrud exercitation ullamco laboris nisi ut
		aliquip ex ea commodo consequat. Duis aute irure dolor in
		reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
		pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
		culpa qui officia deserunt mollit anim id est laborum.
	</Accordion.Body>
</Accordion.Item>
```

We modified the code to use props. Using this, we created a reusable component namely FAQItem to utilize in the FAQPage component where we can create individual elements using a dataset defined in the `constants` directory.
The primary goal of using these elements from [Accordion | React Bootstrap](https://react-bootstrap.netlify.app/docs/components/accordion/) was to make the UI responsive and use the components provided by the Bootstrap framework.

4. [CourseContentElement.js](/src/Components/LectureAddition/CourseContentElement.js)
*Lines 22 - 44*
```js
<Form.Group controlId="formFile" className="mb-3" style={{ marginRight: '20px' }}>
	<Form.Label>Enter a file</Form.Label>
	<Form.Control type="file" />

	<Form.Label style={{ marginTop: '20px' }}>Module Description</Form.Label>
	<Form.Control
		as="textarea"
		aria-label="Module Description"
		value={description}
		onChange={handleDescriptionChange}/>

	<center>
		<Button variant="primary" style={{ margin: '10px' }} onClick={handleDescriptionSave}>
			Save
		</Button>
		<Button variant="primary" style={{ margin: '10px' }}>
			Previous
		</Button>
		<Button variant="primary" style={{ margin: '10px' }}>
			Next
		</Button>
	</center>
</Form.Group>
```

The code above was created by adapting the codes available in [Bootstrap Form Control](https://react-bootstrap.netlify.app/docs/forms/form-control) as shown below: 

```js
<Form.Control size="lg" type="text" placeholder="Large text" />

<Form.Group controlId="formFile" className="mb-3">
	<Form.Label>Default file input example</Form.Label>
	<Form.Control type="file" />
</Form.Group>
```

The main purpose of doing this was to create a form allowing users to add modules while simultaneously using the components provided by React Bootstrap.

5. [Home Page](/src/Components/Landing/LandingPage.jsx)
*Lines 19 - 22*
```js
<div className="image-container">
  <img src={LandingPageImage} alt="Learning Management System" />
  <div className="image-overlay"></div> {/* Overlay for blending effect */}
</div>
```

The code above was created by adapting the codes available in [Adding images, fonts, and files](https://create-react-app.dev/docs/adding-images-fonts-and-files/) as shown below: 

```js
import React from 'react';
import logo from './logo.png'; // Tell webpack this JS file uses this image

console.log(logo); // /logo.84287d09.png

function Header() {
  // Import result is the URL of your image
  return <img src={logo} alt="Logo" />;
}

export default Header;
```
- Snippet 1 is tailored for a specific use case of displaying an image with an overlay effect, whereas Snippet 2 is a more generic component for displaying a logo image.
In Snippet 2, the image source (logo) is imported directly, while in Snippet 1, the image source (LandingPageImage) is passed as a prop to the component.
- Snippet 1 includes additional styling for creating an overlay effect, which is not present in Snippet 2.

## Getting Started

To run this React app locally:

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server
4. Open http://localhost:3000 to view the app




## Acknowledgments

[1]	“Node.Js — download,” Nodejs.org. [Online]. Available: https://nodejs.org/en/download. [Accessed: 27-Feb-2024].

[2]	“React,” React.dev. [Online]. Available: https://react.dev/. [Accessed: 27-Feb-2024].

[3]	“Netlify app,” Netlify.com. [Online]. Available: https://app.netlify.com/. [Accessed: 27-Feb-2024].

[4]	“Getting started,” Create-react-app.dev. [Online]. Available: https://create-react-app.dev/docs/getting-started. [Accessed: 27-Feb-2024].

[5]	“Create react app,” Create-react-app.dev. [Online]. Available: https://create-react-app.dev/. [Accessed: 27-Feb-2024].

[6] "React Bootstarp" React-bootstrap.app. [Online]. Available: https://react-bootstrap.netlify.app/. [Accessed: 27-Feb-2024].

[7]	“Adding images, fonts, and files,” Create-react-app.dev. [Online]. Available: https://create-react-app.dev/docs/        adding-images-fonts-and-files/. [Accessed: 28-Feb-2024].

