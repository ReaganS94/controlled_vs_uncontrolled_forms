import { useState } from "react";
import { createPost } from "../utils/CreatePost";
import "../App.css";

//--------------------------------------------------------------
//------------------------- METHOD TWO -------------------------
//---------------------- THE ELEGANT WAY -----------------------
//--------------------------------------------------------------

// You can control the values of more than one input field by adding a name attribute to each element.

// We will initialize our state with an empty object.

// To access the fields in the event handler use the event.target.name and event.target.value syntax.

// To update the state, use square brackets [bracket notation] around the property name.

// You can control the values of more than one input field by adding a name attribute to each element.

// We will initialize our state with an empty object.

export default function Form() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { post, error } = await createPost();
      if (error) throw error;
      console.log(post);
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (e) => {
    console.log(e);
  };

  return (
    <fieldset>
      <form>
        <label>
          Your name:
          <input type="text" name="name" onChange={handleChange} />
        </label>

        <label>
          Your age:
          <input type="number" name="age" min="16" />
        </label>

        <label>
          Your text:
          <textarea name="text"></textarea>
        </label>

        <div className="terms">
          <label>
            Agree to terms
            <input type="checkbox" name="terms" />
          </label>
        </div>
        <button>Submit</button>
      </form>
      <legend>
        <h1>React Form 2</h1>
      </legend>
    </fieldset>
  );
}
