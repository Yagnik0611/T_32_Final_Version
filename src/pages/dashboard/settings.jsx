import React, { Component } from 'react'
import { useCallback } from 'react';
import { Avatar } from "@material-tailwind/react";
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export function Settings() {
 

  // reacct state
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setUserEmail] = useState("");
  const [gender, setgender] = useState("");
  
  
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");
  const [province, setprovince] = useState("");
  const [zip_code, setzip_code] = useState("");
  const [response,setResponse] = useState("");
  const [timeOut,setTimeOut] = useState("");
  

  const userId =  localStorage.getItem("userId");
    
  const fetchData = async () => {
    try {
        const res = await fetch(`http://localhost:5000/user/${userId}`, {
            headers: {
                "Authorization": localStorage.getItem("token"),
            },
            method: "GET",
            mode: "cors"
        });
       if(res.status != 200){
        
//setTimeOut("true");

          

           
            {  setTimeout(() => {
              Swal.fire({
                title: "Time out ",
                text: "Login Time Out ! Login Again",
                icon: "error",
                confirmButtonText: "ok",
              });
              navigate("/login")
               ("false") ;
            }, 188888888)}

         
          

       }
        const resp = await res.json();
        console.log(resp)
        
        const {first_name, last_name, gender, email, address, city, country, province, zip_code} = resp;
        setfirst_name(first_name);
        setlast_name(last_name);
        setgender(gender);
        setUserEmail(email);
        setaddress(address);
        setcity(city);
        setcountry(country);
        setprovince(province);
        setzip_code(zip_code);

    } catch (err) {
        console.log(err.message);
    }
};

const callback = useCallback(() => fetchData(),[userId]);


useEffect(() => {
    callback();
}, [callback]);
 
const navigate=useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  const userData = {first_name, last_name, gender, email, city, country, province,address,zip_code}

  try {
    const res = await fetch(`http://localhost:5000/user/update/${userId}`, {
      method: "PUT",
      headers: { "content-type": "application/json",
       "Authorization": localStorage.getItem("token") },
      body: JSON.stringify(userData)
    });
   console.log(res)
  //  if (res.status ==200){
  //   setResponse("true");
  //   {  setTimeout(() => {
  //     setResponse ("false") ;
  //   }, 1500000000)}
  
  //  }
  
   console.log(res.formData)
    // alert('Saved successfully.');
  
  } catch (err) {  
    console.log(err.message); 
  }
} 

  return (
    
     
     <>

    {response == "true" && (
      <div className="bg-green-100 rounded-md p-3 flex">
    <svg
        className="stroke-2 stroke-current text-green-600 h-8 w-8 mr-2 flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M0 0h24v24H0z" stroke="none" />
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12l2 2 4-4" />
    </svg>
    <div className="text-green-700">
       <div className="font-bold text-xl">Your settings has been saved!</div>
       </div>
       </div>
      )}

       
       

   
    <div className="min-h-screen p-6 bg-gray-100 flex items-center rounded-xl  justify-center">
    <div className="container rounded-xl max-w-screen- mx-auto">
        
      <div>
    
      <form onSubmit={handleSubmit}>
     
      <div class="   grid  place-content-center h-48 ">
      <img
   src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    class="rounded-full w-40 mb-4 mx-auto"
    alt="Avatar"
  />
    
</div>
        <div className="bg-white rounded-xl shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-2 lg:grid-cols-3">
         
           
       
         
        
            <div className="lg:col-span-4">
           
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                
             
              
              
                <div className="md:col-span-3">
                  <label  className="block uppercase text-gray-700 text-base font-bold mb-2" for="first_name">First Name</label>
                  <input 
                  
                  type="text" 
                  name="first_name" id="first_name"
                  required
                  value ={first_name}
                   onChange={e=>setfirst_name(e.target.value)}
                   className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                </div>
                <div className="md:col-span-2">
                <label className="block uppercase text-gray-700 text-base font-bold mb-2"for="last_name">Last Name</label>
                  <input type="text" 
                  required
                  name="last_name" id="last_name"
                  value ={last_name} onChange={e=>setlast_name(e.target.value)}
                   className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                </div>
             
  
                <div className="md:col-span-5">
                  <label className="block uppercase text-gray-700 text-base font-bold mb-2" for="email">Email Address</label>
                  <input type="text" name="email" id="email"
                  required
                  value ={email} onChange={e=>setUserEmail(e.target.value)}
                   className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"   />
                </div>
  
                <div className="md:col-span-3">
                  <label className="block uppercase text-gray-700 text-base font-bold mb-2" for="address">Address / Street</label>
                  <input type="text" name="address" id="address"
                  value ={address} onChange={e=>setaddress(e.target.value)}
                   className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                </div>
  
                <div className="md:col-span-2">
                  <label className="block uppercase text-gray-700 text-base font-bold mb-2" for="city">City</label>
                  <input type="text" name="city" id="city"
                  value ={city} onChange={e=>setcity(e.target.value)}
                   className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="" />
                </div>
  
                <div className="md:col-span-2">
                  <label  className="block uppercase text-gray-700 text-base font-bold mb-2" for="country">Country / region</label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input name="country" id="country" placeholder="Country"
                     value ={country} onChange={e=>setcountry(e.target.value)}
                     className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                    
                  </div>
                </div>
  
                <div className="md:col-span-2">
                  <label  className="block uppercase text-gray-700 text-base font-bold mb-2" for="state">State / province</label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input name="state" id="state"
                     value ={province} onChange={e=>setprovince(e.target.value)}
                      placeholder="State" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                    
                   
                  </div>
                </div>
  
                <div className="md:col-span-1">
                  <label  className="block uppercase text-gray-700 text-base font-bold mb-2" for="zipcode">Zipcode</label>
                  <input type="text" name="zipcode" id="zipcode" 
                   value ={zip_code} onChange={e=>setzip_code(e.target.value)}
                   className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="M8EHJ5"  />
                </div>
  
              
  
               
        
                <div className="md:col-span-5 text-right">
                  <div className="inline-flex items-end">
                    <button   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                    
                  </div>
                  
                </div>
  
              </div>
            </div>
          </div>
        </div>
        </form>
      </div>

      
      <div className="mt-10 sm:mt-0">
        
    <div className="md:grid md:grid-cols-4 md:gap-6">
      
    <div className="mt-5 md:col-span-2 md:mt-0">
        <form action="#" method="POST">
          
          <div className="overflow-hidden   shadow sm:rounded-md">
            
            <div className="space-y-6 rounded-xl bg-white px-4 py-5 sm:p-6">
              
            <div className="md:col-span-3">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
        </div>
      </div>
              <fieldset>
               
                <div className="font-medium text-lg text-gray-900" aria-hidden="true">
                  By Email
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                   
                    <label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span class="ml-3 text-large font-sm text-gray-900 dark:text-gray-800"> Event Notification</span>
</label>
                  </div>
                  <div className="flex items-start">
                       
                  <label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span class="ml-3 text-large font-sm text-gray-900 dark:text-gray-800"> News Letter Notification</span>
</label>
                  </div>
                 
                </div>
              </fieldset>
              <fieldset>
               
               <div className="font-medium text-lg text-gray-900" aria-hidden="true">
                Push Notification
               </div>
               <div className="mt-4 space-y-4">
                 <div className="flex items-start">
                  
                   <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" value="" class="sr-only peer"/>
 <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
 <span class="ml-3 text-large font-sm text-gray-900 dark:text-gray-800"> Event Notification</span>
</label>
                 </div>
                 <div className="flex items-start">
                      
                 <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" value="" class="sr-only peer"/>
 <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
 <span class="ml-3 text-large font-sm text-gray-900 dark:text-gray-800"> News Letter Notification</span>
</label>
                 </div>
                
               </div>
             </fieldset>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>




      <div className="mt-5 md:col-span-2 md:mt-0">
        <form action="#" method="POST">
          
          <div className="overflow-hidden shadow sm:rounded-md">
            
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              
            <div className="md:col-span-4">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Password Information</h3>
          
        </div>
      </div>
              <fieldset>
              <div className="md:grid md:grid-cols-3 md:gap-50">
             
                  <label  for="address" >Current password</label>
                  <div className="md:col-span-3  mr-20 mb-5 ">
                  <input type="text" name="currentPass" id="currentPass"
                  value ={""} onChange={e=>setaddress(e.target.value)}
                   className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="••••••••••••••••" />
                </div>
                <label for="address">New password</label>
                <div className="md:col-span-3  mr-20 mb-5">
                 
                  <input type="password" name="newPass" id="newPass"
                  value ={address} onChange={e=>setaddress(e.target.value)}
                   className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="••••••••••••••••" />
                </div> 
                <label for="confirmNewPass">Confirm Password</label>
                <div className="md:col-span-3  mr-20 mb-5">
                 
                  <input type="password" name="confirmNewPass" id="confirmNewPass"
                  value ={address} onChange={e=>setaddress(e.target.value)}
                   className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="••••••••••••••••" />
                </div>
                
                <h2></h2>
                </div>
                <div className="px-4 sm:px-0">
          <h3 className="text-mid font-medium leading-6 text-gray-900"> Password requirements:</h3>
          <h3 className="text-mid font-medium leading-6 text-gray-400">Ensure that these requirements are met:</h3>
          <h4 className="text-mid font-sm leading-6 text-gray-400">At least 10 characters (and up to 100 characters)</h4>
          <h4 className="text-mid font-sm leading-6 text-gray-400">At least one lowercase character</h4>
          <h4 className="text-mid font-sm leading-6 text-gray-400">Inclusion of at least one special character, e.g., ! @ # ?</h4>
       
          </div>
              </fieldset>

         
            </div>
            
            <div className="bg-gray-50 px-4 py-1 text-right sm:px-6">
              
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
   
    </div>
  </div>
 

 

</>
  );
}

export default Settings;
