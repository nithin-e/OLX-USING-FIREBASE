import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { Link, useHistory } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { AuthContext, FirebaseContext } from "../../store/firebaseContest";

const Create = () => {
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  const [Name, setName] = useState("");
  const [Category, setCategory] = useState("");
  const [Price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!image) {
      alert("Please select an image before uploading.");
      return;
    }
  
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "react-Olx_image_uploadd");
    data.append("cloud_name", "ddwsn0bwq");
  
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/ddwsn0bwq/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
  
      const result = await response.json();
  
      if (result.error) {
        console.error("Cloudinary Error:", result.error.message);
        alert(`Image upload failed: ${result.error.message}`);
        return;
      }
      console.log("db1:", db);
      if (result.secure_url) {
        console.log("db2:", db);
        await addDoc(collection(db, "items"), {
          Name,
          Category,
          Price,
          image: result.secure_url,
          user: user.uid,
          createdAt: new Date().toDateString(),
        });
        history.push("/");
      }
    } catch (error) {
      console.error("Error occurreddddddd:", error);
    }
  };
  

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              name="Price"
              onChange={(e) => setPrice(e.target.value)}
            />

            <br />
          </form>
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>
          <form>
            <br />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>
              upload and Submit
            </button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
