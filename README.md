### 1. Introduction to the structure we have in place:

1.1 "components" folder with 2 components: Form1 and Form2. Both do the same thing in 2 different ways.

1.2 Utils folder with a function to post our data. As this is not part of today's topic, we'll be skipping over what happens in there as it's not relevant and will concentrate more on the form itself. The only thing we need to know about this utils component is that it allows us to send a post request.

1.3 In App.js, we import both Form1.js and Form2.js

### 2. Let's take a closer look at the component "Form1":

2.1 We have a "handleSubmit" function that takes care of sending a post request to our endpoint to submit the form.

2.2 In the JSX, we have our form. Inside the form you will notice multiple "inputs" nested inside of "labels". The reason why we nest them is that in doing so, when clicking on the label of one of the fields we will be automatically in type mode in the field connected to that label, as if we had clicked inside the input field itself. You can try this by clicking on "Your name" or any other one of the labels.

2.3 In HTML, an `<input>` tag is a field where the user can enter some data. It can be displayed in several different ways, depending on the assigned "type" attribute.

Feel free to explore different types here:
[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)

or here:
[W3Schools](https://www.w3schools.com/tags/tag_input.asp)

If the `<input>` tag doesn't receive a "type" attribute, it will default to "text". The most important attributes to remember for our exercise are "type", "value", and "onChange". "Value" controls, as the name says, the value of that specific input field. The "onChange" event in React detects when the value of an input element changes.

The `<textarea>` tag defines a multi-line text input, and it's often used to collect user inputs like comments or reviews.

(SIDENOTE: The `<fieldset>` and `<legend>` are purely aesthetic, so there's no need to get in detail but feel free to look them up.)

### 3. Controlled vs uncontrolled components

When we talk about Controlled and Uncontrolled Components, it’s always referring to components which are handling forms or form inputs in them.

3.1 Uncontrolled Components:

Uncontrolled components are those for which the form data is handled by the DOM itself. “Uncontrolled” refers to the fact that these components are not controlled by React state.
The values of the form elements are traditionally controlled by and stored on the DOM. We will have to refer to the instance of the form elements to retrieve their values from the DOM. (See Form1.js, line 22 to 26)

3.2 Controlled components:

A controlled input accepts its current value as a prop, as well as a callback to change that value.
In simple words, the `<input>` tag will have a value that refers to the current state (the state is passed as a prop to the value attribute) and we can control that state using the setter function of `useState()`.
This way we will make React be the “single source of truth”. Then the React component that renders a form also controls what happens in that form on subsequent user input. An input form element whose value is controlled by React in this way is called a “controlled component”.
This means your data (state) and UI (inputs) are always in sync. The state gives the value to the input, and the input asks the Form to change the current value.
This also means that the form component can respond to input changes immediately. Example:

- in-place feedback, like validations
- disabling the button unless all fields have valid data
- enforcing a specific input format, like credit card numbers

  3.3 So what makes an uncontrolled component controlled?
  A form element becomes "controlled" if you set its value via a prop. That's all.

  3.4 So which one do I use?

| FEATURE                                   | UNCONTROLLED | CONTROLLED |
| ----------------------------------------- | ------------ | ---------- |
| one-time value retrieval (e.g. on submit) | ✅           | ✅         |
| validating on submit                      | ✅           | ✅         |
| instant field validation                  | ❌           | ✅         |
| conditionally disabling submit button     | ❌           | ✅         |
| enforcing input format                    | ❌           | ✅         |
| several inputs for one piece of data      | ❌           | ✅         |
| dynamic inputs                            | ❌           | ✅         |

That should be enough information to finally get started with the exercise!

### 4. Time to get our hands dirty!

4.1 In `Form1.js`, import `useState` and create a state for each field (`name`, `age`, `text`, and `terms`).

4.2 Set the "value" attribute of each property inside of the form to the respective state.

4.3 Add the `onChange` event:

In React, `onChange` detects the change in an input value. Thanks to `onChange`, your application can listen to user input in real time. When an `onChange` event occurs, the prop will call the function you passed as its parameter.

In simple words: you assign the `onChange` event a function. `onChange` gets triggered every time the input field's value changes, and, in return, `onChange` triggers the function that you gave it every time.

4.4 Declare the function directly inside the `onChange`, like so:

```jsx
    onChange={event => console.log("onChange has been triggered")}
```

4.5 Swap the `console.log` for the setter function of your state (`setName`, `setAge`, etc.) and tap into the value of the event (`event.target.value`).

4.6 Almost done! All that's left to do now is adding the `handleSubmit` function to the form's `onSubmit` attribute.

4.7 For any subsequent input field you add to the form, the process is always the same: you just add another state to track its value. But what if we need a very big form? Keeping track of all those states can become very messy very fast! Let's go to `Form2.js` to explore another way of doing things, using only one single state for our whole form.

### 5. Time to switch to `Form2.js`:

5.1 Let's first examine what's already there:
We have the same handleSubmit function that operates the same way as in `Form1.js`, and an empty handleChange function. The form is still the same, we can confirm that by going to `App.js`, commenting out `Form1.js` and uncommenting `Form2.js`.

5.2 The goal here is to only use one single state to keep track of everything, meaning we will need a changeHandler function to take care of the `onChange` event as we won't have a state setter function for each input like we had in `Form1.js`.

5.3 `handleChange` takes one parameter, "e" (short for "event"). This way we will be able to access the current event's properties. To properly understand this, let's start by just logging "e" to the console. You'll see that we get back a `SyntheticBaseEvent` object. Opening the object, you will notice it has a lot of properties, the most interesting one being the "target".
Let's now log "e.target" to the console. When typing something in any one of the fields now, we can see the field itself logged to the console. But how do we access those attributes? What we are seeing in the console is actually a representation of an object, and we can see that by changing the `console.log` to `console.dir`.
Since what we're getting back is a normal object, we can tap into these properties. Let's change the `console.dir` back to `console.log` and access the value property, like so: `e.target.value`; in the console we're now getting every single character that we type into the field.

5.4 Before we start coding out the `handleChange` function, let's understand what the final goal is. Our createPost function (inside the `handleSubmit`) expects an object. This, of course, tells us that our final result has to be an object. Objects are made of key:value pairs, the key being the identifier of the value (`{name: "John"}`); we already thought of a way to get the value from a certain field, but how do we assign an identifier to it? If we log `e.target` to the console again (or `console.dir` to see the whole object), we can see that there's another property called "name". The name's value is assigned by us inside the form; each one of the inputs inside the form has a "name" attribute that we can use as an identifier (key) for the values in our object. Let's create 2 variables, one called "name" and one called "value" and use them to store name and value of the input field the user is currently typing in. Log both to the console.

5.5 We can see in the console that this works just fine for all of the input fields, but the checkbox is logging "on" to the console. The "value" property on a checkbox is fixed, in the old days it was the value that was submitted along with the form only if the checkbox was checked. Checkboxes have another attribute that we can use, called "checked"; when using checkboxes you want a true or false response (is the checkbox checked? true or false), and the "checked" attribute gives us back exactly that boolean response, meaning we need the "checked" attribute rather than the "value". To accommodate this, we need to change the value variable around a bit. We want something along the lines of "if the type of what I just clicked is a checkbox, give me the "checked" property, and if not, just give me the value property. This can be easily achieved with the help of a ternary!

5.6 Now that we have both a name and a value, we're ready to pass them to an object. Let's start by creating a state (the only one we'll need) and initialize it to an object. Inside the `handleChange` function, we can now call the setter function of our freshly initialized state and update it.
To update the state object with the new object, we need to use a combination of the spread operator and the bracket notation to dynamically access the input name (key).
Here's a cool thing about setState:
It accepts a function with the first parameter being the current state, and the second parameter being what we want to update it with. Our function will be something like this:

```jsx
setInputs((prevState) => ({ ...prevState, [name]: value }));
```

Let's break it down bit by bit:
We access the previous state of the inputs, use the spread operator so that we get to keep the previous value, dynamically add the name for the key using bracket notation, and finally setting the value as value.

5.7 All that's left to do is to pass the state to the createPost function, make sure to add the `handleChange` function to all of the inputs (`onChange={handleChange}`) and add the `handleSubmit` to the form (`onSubmit={handleSubmit}`).
