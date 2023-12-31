import React, { useEffect, useState } from 'react';



import {Header} from '../Components'
import Card from '../Components/Card/Card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const ServicePage = () => {

  const [about, setAbout] = useState([]);

  const userData = (JSON.parse(localStorage.getItem("adminUser")));

  const navigate = useNavigate();

  if(!userData){
    navigate("/login");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        toast.loading("Fetching");
        const response = await axios.get("https://talal-admin-dashboard.onrender.com/get-boxes", {
          params: {
            main_type: "service",
            sub_type: "service"
          }
        });

        toast.dismiss();
        const data = response.data.data;
        setAbout(data);
      } catch (err) {
        console.log(err.message);
        toast.error(err.message);
      }
    };

    fetchData(); // Call the async function here
  }, []);

  console.log(about);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Service Page" />
      <div style={{width:"100%",height:"100%"}}>
      <div className='home-page-home-slider-add-button'>
      <h1>Service</h1>
      <button><a href={`/add/?main_type=service&&sub_type=service`}> Add Services +</a></button>      </div>
      <div className='home-page-home-slider-div'>
      
       {about.map((item,index)=>{
        return<div style={{marginTop:"4%",marginRight:"8%",marginLeft:"-4%"}}>
         <Card isContent={2} image={item.img} content={item._doc.data} boxData={item}/>
        </div>
      })}
      </div>
      
      </div>
    </div>
  );
};
export default ServicePage;