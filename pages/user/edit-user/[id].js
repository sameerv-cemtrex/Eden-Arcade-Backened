import React, { useEffect, useState } from 'react'
import EditUser from '../../../components/user/EditUser';

const index = (props) => {
  const [userData, setUserData] = useState("");

  function getEditUser(){
    try {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminPanel/getUserByAccounId/${props.id}`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'content-Type': 'application/json'
        },
        body: JSON.stringify()

      }).then(response => response.json())
        .then(data => {
          setUserData(data.message);
          // console.log("result", data.message);
        }
        );
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() =>{
    getEditUser();
  }, [])

  // :: Update Data
  function editWeaponAction(id) {

      try {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminPanel/editUserByAccounId/${id}`, {
        method:'POST',
        headers:{
        'Accept': 'application/json',
        'content-Type':'application/json'
        },
        body:JSON.stringify(data)
      
    }).then((res)=>{
        console.log("result", res);
      
    });
    console.warn("index", data);
    }
    catch (err) {
        console.log(err);
    }
    
  }
  
  return (
    <>
     <div className='main-content'>
            <EditUser 
             userData = {userData}
            />
    </div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  // do something
  return {
      props: { 'id': ctx.query.id }
  };
}

export default index