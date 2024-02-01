import { useState } from "react";
import { createPost } from "../utils/CreatePost";

//------------------------------------------------------------
//------------------------ METHOD ONE ------------------------
//----------------------- THE EASY WAY -----------------------
//------------------------------------------------------------

export default function Form() {
  //function for handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { post, error } = await createPost({});
      if (error) throw error;
      console.log(post);
    } catch (err) {
      console.error(err);
    }

    //For uncontrollod components (try using these inside the createPost()'s object above, on line 14, like so: {name: e.target.elements.name.value}):
    // console.log(e.target.elements);
    console.dir(e.target.elements.name.value);
    // console.log(e.target.elements.age.value);
    // console.log(e.target.elements.text.value);
    // console.log(e.target.elements.terms.checked);
  };

  return (
    <fieldset>
      <legend>
        <h1>React Form 1</h1>
      </legend>
      <form onSubmit={handleSubmit}>
        <label>
          Your name:
          <input type="text" name="name" />
        </label>

        <label>
          Your age:
          <input type="number" name="age" />
        </label>

        <label>
          Your text:
          <textarea name="text"></textarea>
        </label>

        <div className="terms">
          <label>
            Agree to terms
            <input type="checkbox" name="terms" required />
          </label>
        </div>
        <button>Submit</button>
      </form>
    </fieldset>
  );
}
