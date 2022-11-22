import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Uniques from './Uniques';
 

const EpkUploadPage = () => {

 const [form, setForm] = useState({
   movie:"",
   title: "",
   log_line: "",
   discription :"",
   uniques: [] ,
   synopses:[]

 });


 const [uniques, setUniques] = useState(form.uniques);

 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://127.0.0.1:8000/epk/${params.id.toString()}`);
        
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`epk Record with id ${id} not found`);
       navigate("/movies");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedEpk = {
     title: form.title,
     log_line: form.log_line,
     description: form.description,
     movie: form.movie,
     uniques:form.uniques,
     synopses:form.synopses
   };
 
   // This will send a put request to update the data in the database.
   await fetch(`http://127.0.0.1:8000/epk/${params.id}`, {
     method: 'PUT',
     body: JSON.stringify(editedEpk),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/movies");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3> Epk Dashboard - upload page</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="title">Title: </label>
         <input
           type="text"
           className="form-control"
           id="title"
           value={form.title}
           onChange={(e) => updateForm({ title: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="Description">Description: </label>
         <input
           type="text"
           className="form-control"
           id="description"
           value={form.description}
           onChange={(e) => updateForm({ description: e.target.value })}
         />
       </div>



       <div className="form-group">
         <label >uniques: </label>        
            <input
                type="text"
                className="form-control"     
                onChange={(e) => {
                    uniques[1].content = e.target.value;
                    setUniques([...uniques]); } }      
            />
         

        <ul> {form.uniques.map((unique, index) => {
            return 
            <div>
                <li key={index}>{unique.content}</li>
                <input
                    type="text"
                    className="form-control"        
                    value={unique.content}  
                    onChange={(e) => {
                        unique.content = e.target.value;
                        setUniques([...uniques]); } }       
                    />
            </div>

                    })}</ul>
         
       </div>


    
 
       <div className="form-group">
         <input
           type="submit"
           value="Save Cover"
           className="btn btn-primary"
         />
       </div>
     </form>
     <Uniques epkuniques={form.uniques}  />
   </div>
 )
}
export default EpkUploadPage