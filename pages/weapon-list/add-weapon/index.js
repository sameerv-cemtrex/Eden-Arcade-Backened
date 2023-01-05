import React from 'react'
import AddWeapon from '../../../components/weapon-list/AddWeapon'

const AddWeaponPage = () => {

// var data = {
//           "_id": "63a19e66aa684c9848695a39",
//             "category": "weaponsStatic",
//     }

function weaponAction(data){
    try {
        fetch('https://eden-dev.cetxlabs.com:5000/adminPanel/addData', {
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
    <div>
        <div className='main-content'>
         <AddWeapon weaponAction={weaponAction} />
        </div>
    </div>
)
}
export default AddWeaponPage