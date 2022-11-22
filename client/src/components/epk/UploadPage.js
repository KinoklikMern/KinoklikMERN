import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";

const UploadPage = () => {

 const [book, setBook] = useState({
   title: "",
   author: "" 
 });

 const params = useParams();
 const navigate = useNavigate();


 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://127.0.0.1:8000/book/${params.id.toString()}`);  
     
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/books");
       return;
     }
 
     setBook(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);



 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Epk</h3> 
     
         <label >Title: </label>
         <p>{epk.title}</p>
         <p>{epk.title}</p>
         <p>{epk.title}</p>
         <p>{epk.title}</p>
      
         <Link className="btn btn-link" to={`/movies`}>Back to movies</Link> |
         <Link className="btn btn-link" to={`/preview/epk/${params.id}`}>Preview</Link> |
   </div>
 )}
export default UploadPage
