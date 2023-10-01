import React, { useEffect, useState } from 'react';
import './Card.css'; // Import your CSS file for styling
import axios from 'axios';
import toast from 'react-hot-toast';

const Card = ({image,isContent,content,boxData,isIcon}) => {

  const [edit , setEdit] = useState(false);
  const [data,setData] = useState(boxData._doc.data);
  const [Image,setImage] = useState(boxData.img);
  const [ImageFile,setImageFile] = useState("");
  const [icon1_data,setIcon1_data] = useState(boxData._doc.icon1_data);
  const [icon2_data,setIcon2_data] = useState(boxData._doc.icon2_data);
  const [selectedImage , setSelectedImage] = useState('');
  const [reload , setLoad] = useState(false);

  useEffect(()=>{
    setLoad(false);
  },[reload === true]);


  const deleteHandler = ()=>{
    toast.loading("Deleting ....");
    axios.delete(`https://talal-admin-dashboard.onrender.com/delete-box/${boxData._doc._id}`)
    .then((res)=>{
        toast.dismiss();
        setLoad(true);
    })
    .catch((err)=>{
        toast.error(err.message);
    });
  }

  const updateHandler = ()=>{
    const formData = new FormData(); // Create a FormData object to send files

  // Add updated data to the form data
  if(isIcon && isIcon === 1){
    formData.append("icon1_data",data);
  }
  else if(isIcon && isIcon === 2){
    formData.append("icon2_data",data);
  }
  else{
    formData.append("data",data);
  }

  // Check if a new image file is selected and add it to the form data
  if (ImageFile) {
    formData.append('img', ImageFile ? ImageFile : Image);
  }

  console.log(formData);
  toast.loading("Updating ....");
      axios.put(`https://talal-admin-dashboard.onrender.com/update-box/${boxData._doc._id}`,formData,{
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        },
      })
      .then((res)=>{
          console.log(res.data.data);
          toast.dismiss();
          setLoad(true);
      })
      .catch((err)=>{
          toast.error(err.message);
      });
      setEdit(false);
  }

 
  const handleImageChange = (e)=>{
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setSelectedImage(blobUrl);
    }
  }

  const handleChange = (e)=>{
    setData(e.target.value);
  }
  return (
    <div >
    { String(isContent) === String(0) ? <div className="card" style={{display:"flex",flexDirection:"column"}}>
      <div className='img-div'><img
        src={selectedImage ? selectedImage : image}
        alt="Card Image"
        className="card-image"
      /></div>
      <div style={{}}>
      {String(edit) === String(true) ?
        <div className="card-actions">
       <div className='main-2-content-img-div'>
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*" // Allow only image files
          onChange={(e)=>handleImageChange(e)}
          
        /> 
        </div>
        <div className="card-actions2">
        <button onClick={updateHandler}>Update</button>
        </div>
        </div>
        :
        <div className="card-actions">
        <button  onClick={()=>setEdit(true)}>Edit</button>
        <button  onClick={deleteHandler}>Delete</button>
        </div>
    }
    </div>
    </div> :
   ( String(isContent) === String(1) ?
    <div className="card" style={{display:"flex",flexDirection:"column"}}>
    <textarea
        placeholder={content}
        className="card-image"
        disabled= {!edit}
        onChange={handleChange}
      />
      {String(edit) === String(true) ?
        <div className="card-actions">
        <button  onClick={updateHandler}>Update</button>
        <button onClick={()=>setEdit(false)}>Cancel</button>
        </div>
        :
        <div className="card-actions">
        <button onClick={()=>setEdit(true)}>Edit</button>
        <button onClick={deleteHandler}>Delete</button>
        </div>
    }
    </div> :
    <div>
    <div className="card" style={{display:"flex",flexDirection:"column",width:"90%"}}>
    <div className='card'>
    <div className='img-div'><img
            src={selectedImage ? selectedImage : image}
            alt="Card Image"
            className="card-image"
          />
        {String(edit) === String(true) &&(
            <div className="card-actions">
          <div>
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*" // Allow only image files
              onChange={(e)=>handleImageChange(e)}/>
              </div>
              </div>
   )}
   </div>
   </div>
    <div className='double-card' style={{width:"100%"}}>
    <textarea
        placeholder={content}
        className={`card-image  isdouble  `}
        onChange={handleChange}
        disabled= {!edit}
      />
      {String(edit) === String(true) ?
        <div className="card-actions">
        <button onClick={updateHandler}>Update</button>
        <button onClick={()=>setEdit(false)}>Cancel</button>
        </div>
        :
        <div className="card-actions">
        <button onClick={()=>setEdit(true)}>Edit</button>
        <button onClick={deleteHandler}>Delete</button>
        </div>
    }
      </div>
    </div>
    </div>
    )
    
  }
  
    </div>
  );
};

export default Card;
