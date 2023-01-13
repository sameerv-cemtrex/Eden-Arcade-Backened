import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';

// initial state
var initialValues = {
   form: {
      id: {
         value: ""
      },
      _id: {
         value: ""
      },
      name: {
         value: ""
      },
      type: {
         value: ""
      },
      gunFireMode: {
         value: ""
      },
      screenShakeIntensity: {
         value: ""
      },
      screenShakeDuration: {
         value: ""
      },
      ammoType: {
         value: ""
      }
      ,
      fireSpread: {
         value: ""
      },
      damage: {
         value: ""
      },
      magazineSize: {
         value: ""
      },
      gunShotIntensity: {
         value: ""
      },
      shootingRange: {
         value: ""
      },
      muzzleFlashIntensity: {
         value: ""
      }
      ,
      recoil: {
         value: ""
      },
      fireRate: {
         value: ""
      },
      reloadTime: {
         value: ""
      },
      bulletShotAudioClip: {
         value: ""
      },
      bulletHolePrefab: {
         value: ""
      },
      desc: {
         value: ""
      },
      exp: {
         value: ""
      },
      weight: {
         value: ""
      }
   }
};

var isValueInitialized = true;

function initializeData(data, props) {
   initialValues.form.id.value = data.id;
   initialValues.form._id.value = data._id;
   initialValues.form.name.value = data.name;
   initialValues.form.type.value = data.type;
   initialValues.form.gunFireMode.value = data.gunFireMode;
   initialValues.form.screenShakeIntensity.value = data.screenShakeIntensity;
   initialValues.form.screenShakeDuration.value = data.screenShakeDuration;
   initialValues.form.ammoType.value = data.ammoType;
   initialValues.form.fireSpread.value = data.fireSpread;
   initialValues.form.damage.value = data.damage;
   initialValues.form.magazineSize.value = data.magazineSize;
   initialValues.form.gunShotIntensity.value = data.gunShotIntensity;
   initialValues.form.shootingRange.value = data.shootingRange;
   initialValues.form.muzzleFlashIntensity.value = data.muzzleFlashIntensity;
   initialValues.form.recoil.value = data.recoil;
   initialValues.form.fireRate.value = data.fireRate;
   initialValues.form.reloadTime.value = data.reloadTime;
   initialValues.form.bulletShotAudioClip.value = data.bulletShotAudioClip;
   initialValues.form.bulletHolePrefab.value = data.bulletHolePrefab;
   initialValues.form.desc.value = data.desc;
   initialValues.form.exp.value = data.exp;
   initialValues.form.weight.value = data.weight;
}

const EditWeapon = (props) => {
   const [values, setValues] = useState(initialValues.form);

   // console.log("init", values);

   //:: Input Field State
   const [id, setId] = useState("");
   const [_id, set_Id] = useState("");
   const [name, setName] = useState("");
   const [type, setType] = useState("");
   const [gunFireMode, setGunFireMode] = useState("");
   const [screenShakeIntensity, setScreenShakeIntensity] = useState("");
   const [screenShakeDuration, setScreenShakeDuration] = useState("");
   const [ammoType, setAmmoType] = useState("");
   const [fireSpread, setFireSpread] = useState("");
   const [damage, setDamage] = useState("");
   const [magazineSize, setMagazineSize] = useState("");
   const [gunShotIntensity, setGunShotIntensity] = useState("");
   const [shootingRange, setShootingRange] = useState("");
   const [muzzleFlashIntensity, setMuzzleFlashIntensity] = useState("");
   const [recoil, setRecoil] = useState("");
   const [fireRate, setFireRate] = useState("");
   const [reloadTime, setReloadTime] = useState("");
   const [bulletShotAudioClip, setBulletShotAudioClip] = useState("");
   const [bulletHolePrefab, setBulletHolePrefab] = useState("");
   const [desc, setDesc] = useState("");
   const [exp, setExp] = useState("");
   const [weight, setWeight] = useState("");
   const [data, setData] = useState([]);

   //:: Call Get Api
   useEffect(() => {
      // console.log("edited", props.editData);
      isValueInitialized = false;
   }, [props.editData])


   //:: initialize existing values
   if (props.editData && Object.keys(props.editData).length > 0 && !isValueInitialized) {
      if (props.editData) {
         initializeData(props.editData);
      }
   }

   //:: Call EDIT Get Api
   const formDataEditHandler = (e) => {
      e.preventDefault();

      let formData = {
         id: values.id.value,
         _id: values._id.value,
         name: values.name.value,
         type: values.type.value,
         gunFireMode: values.gunFireMode.value,
         screenShakeIntensity: values.screenShakeIntensity.value,
         screenShakeDuration: values.screenShakeDuration.value,
         ammoType: values.ammoType.value,
         fireSpread: values.fireSpread.value,
         damage: values.damage.value,
         magazineSize: values.magazineSize.value,
         gunShotIntensity: values.gunShotIntensity.value,
         shootingRange: values.shootingRange.value,
         muzzleFlashIntensity: values.muzzleFlashIntensity.value,
         recoil: values.recoil.value,
         fireRate: values.fireRate.value,
         reloadTime: values.reloadTime.value,
         bulletShotAudioClip: values.bulletShotAudioClip.value,
         bulletHolePrefab: values.bulletHolePrefab.value,
         desc: values.desc.value,
         exp: values.exp.value,
         weight: values.weight.value
      };

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminPanel/editData/${formData._id}/weaponsStatic`, {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'content-Type': 'application/json'
         },
         body: JSON.stringify(formData)

      }).then((res) => {
         console.log("result", res);
         props.onClose()
      }).catch(function (error) {
         // handle error
         console.log(error);
      })

      alert("Form Updated Successfully");

      window.location.reload();
   }

   const inputChangeHandler = (e) => {
      const { name, value } = e.target;
      setValues({
         ...values,
         [name]: { ...values[name], value: value },
      });
   };

   return (
      <>
         <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="model-box"
         >
            <Modal.Header closeButton>
               <Modal.Title id="contained-modal-title-vcenter">
                  Edit Weapons

               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div className='model-content'>

                  <div className="row">
                     {/* <div className="col-md-4 mb-3">
                           <div className="form-field position-relative">
                              <label htmlFor="id" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                              >
                                 Id
                              </label>
                              <input
                                 type="number"
                                 id="id"
                                 className="w-100"
                                 name="id"
                                 required
                                 value={values.id.value}
                                  onChange={inputChangeHandler}
                              />

                           </div>
                        </div> */}
                     <div className="col-md-4 mb-3">
                        <div className="form-field position-relative">
                           <label htmlFor="name" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                           >
                              Name
                           </label>
                           <input
                              type="text"
                              id="name"
                              className="w-100"
                              name="name"
                              required
                              value={values.name.value}
                              onChange={inputChangeHandler}
                           />

                        </div>


                     </div>
                     <div className="col-md-4 mb-3">
                        <div className="form-field position-relative">
                           <label htmlFor="type" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                           >
                              Type
                           </label>
                           <input
                              type="text"
                              id="type"
                              className="w-100"
                              name="type"
                              required
                              value={values.type.value}
                              onChange={inputChangeHandler}
                           />

                        </div>
                     </div>
                     <div className="col-md-4 mb-3">
                        <div className="form-field position-relative">
                           <label htmlFor="gunFireMode" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                           >
                              Gun Fire Mode
                           </label>
                           <input
                              type="text"
                              id="gunFireMode"
                              className="w-100"
                              name="gunFireMode"
                              required
                              value={values.gunFireMode.value}
                              onChange={inputChangeHandler}
                           />

                        </div>

                     </div>
                     <div className="col-md-4 mb-3">
                        <div className="form-field position-relative">
                           <label htmlFor="screenShakeIntensity" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                           >
                              Screen Shake Intensity
                           </label>
                           <input
                              type="number"
                              id="screenShakeIntensity"
                              className="w-100"
                              name="screenShakeIntensity"
                              required
                              value={values.screenShakeIntensity.value}
                              onChange={inputChangeHandler}
                           />

                        </div>

                     </div>
                     <div className="col-md-4 mb-3">
                        <div className="form-field position-relative">
                           <label htmlFor="screenShakeDuration" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                           >
                              Screen Shake Duration
                           </label>
                           <input
                              type="number"
                              id="screenShakeDuration"
                              className="w-100"
                              name="screenShakeDuration"
                              required
                              value={values.screenShakeDuration.value}
                              onChange={inputChangeHandler}
                           />

                        </div>


                     </div>
                     <div className="col-md-4 mb-3">
                        <div className="form-field position-relative">
                           <label htmlFor="ammoType" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                           >
                              Ammo Type
                           </label>
                           <input
                              type="number"
                              id="ammoType"
                              className="w-100"
                              name="ammoType"
                              required
                              value={values.ammoType.value}
                              onChange={inputChangeHandler}
                           />

                        </div>
                     </div>
                     <div className="col-md-4 mb-3">
                        <div className="form-field position-relative">
                           <label htmlFor="fireSpread" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                           >
                              Fire Spread
                           </label>
                           <input
                              type="number"
                              id="fireSpread"
                              className="w-100"
                              name="fireSpread"
                              required
                              value={values.fireSpread.value}
                              onChange={inputChangeHandler}
                           />

                        </div>
                     </div>

                     <div className="col-md-4 mb-3">
                        <div className="form-field position-relative">
                           <label htmlFor="damage" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                           >
                              Damage
                           </label>
                           <input
                              type="number"
                              id="damage"
                              className="w-100"
                              name="damage"
                              required
                              value={values.damage.value}
                              onChange={inputChangeHandler}
                           />

                        </div>
                     </div>


                     <div className="col-md-4 mb-3">
                        <div className="form-field position-relative">
                           <label htmlFor="magazineSize" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                           >
                              Magazine Size
                           </label>
                           <input
                              type="number"
                              id="magazineSize"
                              className="w-100"
                              name="magazineSize"
                              required
                              value={values.magazineSize.value}
                              onChange={inputChangeHandler}
                           />

                        </div>
                     </div>

                     <div className="col-md-4 mb-3">
                        <div className="form-field position-relative">
                           <label htmlFor="gunShotIntensity" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                           >
                              Gun Shot Intensity
                           </label>
                           <input
                              type="number"
                              id="gunShotIntensity"
                              className="w-100"
                              name="gunShotIntensity"
                              required
                              value={values.gunShotIntensity.value}
                              onChange={inputChangeHandler}
                           />

                        </div>
                     </div>



                     <div className="col-md-4 mb-3">
                        <div className="form-field position-relative">
                           <label htmlFor="shootingRange" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                           >
                              shooting Range
                           </label>
                           <input
                              type="number"
                              id="shootingRange"
                              className="w-100"
                              name="shootingRange"
                              required
                              value={values.shootingRange.value}
                              onChange={inputChangeHandler}
                           />

                        </div>
                     </div>

                     <div className="col-md-4 mb-3">
                        <div className="form-field position-relative">
                           <label htmlFor="muzzleFlashIntensity" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                           >
                              Muzzle Flash Intensity
                           </label>
                           <input
                              type="number"
                              id="muzzleFlashIntensity"
                              className="w-100"
                              name="muzzleFlashIntensity"
                              required
                              value={values.muzzleFlashIntensity.value}
                              onChange={inputChangeHandler}
                           />

                        </div>
                     </div>

                     <div className="col-md-4 mb-3">
                        <div className="form-field position-relative">
                           <label htmlFor="recoil" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                           >
                              Recoil
                           </label>
                           <input
                              type="number"
                              id="recoil"
                              className="w-100"
                              name="recoil"
                              required
                              value={values.recoil.value}
                              onChange={inputChangeHandler}
                           />

                        </div>
                     </div>

                     <div className="col-md-4 mb-3">
                        <div className="form-field position-relative">
                           <label htmlFor="fireRate" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                           >
                              Fire Rate
                           </label>
                           <input
                              type="number"
                              id="fireRate"
                              className="w-100"
                              name="fireRate"
                              required
                              value={values.fireRate.value}
                              onChange={inputChangeHandler}
                           />

                        </div>
                     </div>

                     <div className="col-md-4 mb-3">
                        <div className="form-field position-relative">
                           <label htmlFor="reloadTime" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                           >
                              Reload Time
                           </label>
                           <input
                              type="number"
                              id="reloadTime"
                              className="w-100"
                              name="reloadTime"
                              required
                              value={values.reloadTime.value}
                              onChange={inputChangeHandler}
                           />

                        </div>
                     </div>


                     <div className="col-md-4 mb-3">
                        <div className="form-field position-relative">
                           <label htmlFor="bulletShotAudioClip" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                           >
                              Bullet Shot Audio Clip
                           </label>
                           <input
                              type="text"
                              id="bulletShotAudioClip"
                              className="w-100"
                              name="bulletShotAudioClip"
                              required
                              value={values.bulletShotAudioClip.value}
                              onChange={inputChangeHandler}
                           />

                        </div>
                     </div>

                     <div className="col-md-4 mb-3">
                        <div className="form-field position-relative">
                           <label htmlFor="bulletHolePrefab" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                           >
                              Bullet Hole Prefab
                           </label>
                           <input
                              type="text"
                              id="bulletHolePrefab"
                              className="w-100"
                              name="bulletHolePrefab"
                              required
                              value={values.bulletHolePrefab.value}
                              onChange={inputChangeHandler}

                           />

                        </div>
                     </div>

                     <div className="col-md-4 mb-3">
                        <div className="form-field position-relative">
                           <label htmlFor="exp" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                           >
                              Experience
                           </label>
                           <input
                              type="number"
                              id="exp"
                              className="w-100"
                              name="exp"
                              required
                              value={values.exp.value}
                              onChange={inputChangeHandler}
                           />

                        </div>
                     </div>


                     <div className="col-md-4 mb-3">
                        <div className="form-field position-relative">
                           <label htmlFor="weight" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                           >
                              Weight
                           </label>
                           <input
                              type="number"
                              id="weight"
                              className="w-100"
                              name="weight"
                              required
                              value={values.weight.value}
                              onChange={inputChangeHandler}
                           />

                        </div>
                     </div>

                     <div className="col-md-4 mb-3">
                        <div className="form-field position-relative">
                           <label htmlFor="desc" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                           >
                              Description
                           </label>
                           <input
                              type="text"
                              id="desc"
                              className="w-100"
                              name="desc"
                              required
                              value={values.desc.value}
                              onChange={inputChangeHandler}
                           />

                        </div>
                     </div>

                  </div>

               </div>
            </Modal.Body>
            <Modal.Footer>
               <div className="action-button d-flex justify-content-start pt-6 gap-2">
                  <button onClick={props.onHide} type="submit" className="btn btn-secondary btn-fw text-uppercase"
                  >
                     Cancel
                  </button>
                  <button onClick={formDataEditHandler} type="submit" className="btn btn-primary btn-fw text-uppercase">
                     Edit
                  </button>
               </div>
            </Modal.Footer>
         </Modal>

      </>
   )
}

export default EditWeapon




// import React from 'react'
// import Link from 'next/link'
// import Input from '../../components/common/formComponent/Input';

// const EditWeapon = () => {
//     function handleChange(event) {
//     }

//   return (
//     <div>
//          <div className="row">
//             <div className='col-lg-6 mb-2'>
//                 <h2 className=" font-weight-bold mb-2">  Edit Weapon </h2>
//             </div>
//             <div className='col-lg-6 d-flex justify-content-end mb-2'>
//                 <Link href="/weapon-list/">
//                 <button type="button" className="btn btn-dark btn-icon-text">
//                 <i className="mdi mdi-arrow-left"></i>     
//                 Back                     
//                 </button>
//                 </Link>
//             </div>
//         </div>
//         <div className="row">
//             <div className="col-md-12 grid-margin stretch-card">
//                 <div className="card">
//                     <div className="card-body">
//                     <form className="forms-sample">
//                         <div className="row">
//                             <div className="col-md-4">
//                                 <div className="form-group">
//                                 <Input 
//                                     type="text" 
//                                     name="name" 
//                                     value=""
//                                     onChange={handleChange}
//                                     required 
//                                     errors = ""
//                                     placeholder="Weapon Name"
//                                     className="form-control form-control" />
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group">
//                                 <Input 
//                                     type="text" 
//                                     name="type" 
//                                     value=""
//                                     onChange={handleChange}
//                                     required 
//                                     errors = ""
//                                     placeholder="Type"
//                                     className="form-control form-control" />
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group">
//                                 <Input 
//                                     type="text" 
//                                     name="name" 
//                                     value=""
//                                     onChange={handleChange}
//                                     required 
//                                     errors = ""
//                                     placeholder="Gun Fire Mode"
//                                     className="form-control form-control" />
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group">
//                                 <Input 
//                                     type="number" 
//                                     name="name" 
//                                     value=""
//                                     onChange={handleChange}
//                                     required 
//                                     errors = ""
//                                     placeholder="Screen Shake Intensity"
//                                     className="form-control form-control" />
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group">
//                                 <Input 
//                                     type="number" 
//                                     name="type" 
//                                     value=""
//                                     onChange={handleChange}
//                                     required 
//                                     errors = ""
//                                     placeholder="Screen Shake Duration"
//                                     className="form-control form-control" />
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group">
//                                 <Input 
//                                     type="number" 
//                                     name="name" 
//                                     value=""
//                                     onChange={handleChange}
//                                     required 
//                                     errors = ""
//                                     placeholder="Ammo Type"
//                                     className="form-control form-control" />
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group">
//                                 <Input 
//                                     type="number" 
//                                     name="name" 
//                                     value=""
//                                     onChange={handleChange}
//                                     required 
//                                     errors = ""
//                                     placeholder="Fire Spread"
//                                     className="form-control form-control" />
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group">
//                                 <Input 
//                                     type="number" 
//                                     name="name" 
//                                     value=""
//                                     onChange={handleChange}
//                                     required 
//                                     errors = ""
//                                     placeholder="Damage"    
//                                     className="form-control form-control" />
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group">
//                                 <Input 
//                                     type="number" 
//                                     name="type" 
//                                     value=""
//                                     onChange={handleChange}
//                                     required 
//                                     errors = ""
//                                     placeholder=" Magazine Size"
//                                     className="form-control form-control" />
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group">
//                                 <Input 
//                                     type="number" 
//                                     name="name" 
//                                     value=""
//                                     onChange={handleChange}
//                                     required 
//                                     errors = ""
//                                     placeholder="Gun Shot Intensity"
//                                     className="form-control form-control" />
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group">
//                                 <Input 
//                                     type="number" 
//                                     name="name" 
//                                     value=""
//                                     onChange={handleChange}
//                                     required 
//                                     errors = ""
//                                     placeholder="shooting Range"
//                                     className="form-control form-control" />
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group">
//                                 <Input 
//                                     type="number" 
//                                     name="type" 
//                                     value=""
//                                     onChange={handleChange}
//                                     required 
//                                     errors = ""
//                                     placeholder=" Muzzle Flash Intensity"       
//                                     className="form-control form-control" />
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group">
//                                 <Input 
//                                     type="number" 
//                                     name="name" 
//                                     value=""
//                                     onChange={handleChange}
//                                     required 
//                                     errors = ""
//                                     placeholder="Shooting Range"
//                                     className="form-control form-control" />
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group">
//                                 <Input 
//                                     type="number" 
//                                     name="name" 
//                                     value=""
//                                     onChange={handleChange}
//                                     required 
//                                     errors = ""
//                                     placeholder="Recoil"
//                                     className="form-control form-control" />
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group">
//                                 <Input 
//                                     type="number" 
//                                     name="type" 
//                                     value=""
//                                     onChange={handleChange}
//                                     required 
//                                     errors = ""
//                                     placeholder="Fire Rate"
//                                     className="form-control form-control" />
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group">
//                                 <Input 
//                                     type="number" 
//                                     name="name" 
//                                     value=""
//                                     onChange={handleChange}
//                                     required 
//                                     errors = ""
//                                     placeholder="Reload Time"
//                                     className="form-control form-control" />
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group">
//                                 <Input 
//                                     type="text" 
//                                     name="name" 
//                                     value=""
//                                     onChange={handleChange}
//                                     required 
//                                     errors = ""
//                                     placeholder="Bullet Shot Audio Clip"
//                                     className="form-control form-control" />
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group">
//                                 <Input 
//                                     type="text" 
//                                     name="type" 
//                                     value=""
//                                     onChange={handleChange}
//                                     required 
//                                     errors = ""
//                                     placeholder="Bullet Hole Prefab"  
//                                     className="form-control form-control" />
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group">
//                                 <Input 
//                                     type="text" 
//                                     name="name" 
//                                     value=""
//                                     onChange={handleChange}
//                                     required 
//                                     errors = ""
//                                     placeholder="Exp"
//                                     className="form-control form-control" />
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group">
//                                 <Input 
//                                     type="number" 
//                                     name="type" 
//                                     value=""
//                                     onChange={handleChange}
//                                     required 
//                                     errors = ""
//                                     placeholder="Weight"
//                                     className="form-control form-control" />
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group">
//                                 <Input 
//                                     type="text" 
//                                     name="type" 
//                                     value=""
//                                     onChange={handleChange}
//                                     required 
//                                     errors = ""
//                                     placeholder="Description"
//                                     className="form-control form-control" />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row">
//                             <div className="col-12 d-flex justify-content-start">
//                                 <button type="submit" className="btn btn-primary mr-2">Submit</button>
//                                 <button className="btn btn-light">Cancel</button>
//                             </div>
//                         </div>
//                     </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default EditWeapon
