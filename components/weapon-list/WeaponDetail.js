import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';

const WeaponDetail = (props) => {
  const [data, setData] = useState([]);

  //:: Call Get Api
  useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminPanel/getAllData/weaponsStatic`, {
          method: 'get',
          headers: {
              'Accept': 'application/json',
              'content-Type': 'application/json'
          },
          body: JSON.stringify()

      }).then(response => response.json())
          .then(data => {
              setData(data.message);
              //console.log("result", data);
          }
          );
  }, [])

  return (
    <div>
       <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="model-box"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Armor Detail
                    </Modal.Title>
                </Modal.Header>

                <form>
                    <Modal.Body>
                        <div className='model-content p-0'>
                            {
                                data.filter((ele) => {
                                    if (Number(localStorage.getItem('selectedItem')) === ele.id) {
                                        return ele
                                    }
                                }).map((item, index) => {
                                    return (
                                        <>
                                            <div key={index} className="d-grid">
                                              {/* <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Id</label>
                                                        <p className='m-0'>{item.id}</p>
                                                       
                                                    </div>
                                                </div> */}
                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Name</label>
                                                        <p className='m-0'>{item.name}</p>
                                                    </div>
                                                </div>

                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Type</label>
                                                        <p className='m-0'> {item.type}</p>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Gun Fire Mode</label>
                                                        <p className='m-0'>{item.gunFireMode}</p>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>screen Shake Duration</label>
                                                        <p className='m-0'> {item.screenShakeDuration} </p>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Ammo Type</label>
                                                        <p className='m-0'> {item.ammoType}</p>
                                                    </div>
                                                </div>
                                               
                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Fire Spread</label>
                                                        <p className='m-0'>{item.fireSpread}</p>
                                                    </div>
                                                </div>

                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Damage</label>
                                                        <p className='m-0'>{item.damage}</p>
                                                       
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Magazine Size</label>
                                                        <p className='m-0'>{item.magazineSize}</p>
                                                    </div>
                                                </div>

                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Gun Shot Intensity</label>
                                                        <p className='m-0'> {item.gunShotIntensity}</p>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Shooting Range</label>
                                                        <p className='m-0'>{item.shootingRange}</p>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Muzzle Flash Intensity</label>
                                                        <p className='m-0'> {item.muzzleFlashIntensity} </p>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Recoil</label>
                                                        <p className='m-0'> {item.recoil}</p>
                                                    </div>
                                                </div>
                                               
                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Fire Rate</label>
                                                        <p className='m-0'>{item.fireRate}</p>
                                                    </div>
                                                </div>

                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Screen Shake Duration</label>
                                                        <p className='m-0'>{item.screenShakeDuration}</p>
                                                       
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>bullet Shot Audio Clip</label>
                                                        <p className='m-0'>{item.bulletShotAudioClip}</p>
                                                    </div>
                                                </div>

                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Bullet Hole Prefab</label>
                                                        <p className='m-0'> {item.bulletHolePrefab}</p>
                                                    </div>
                                                </div>
                                                
                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Exp</label>
                                                        <p className='m-0'> {item.exp} </p>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Weight</label>
                                                        <p className='m-0'> {item.weight}</p>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Desc</label>
                                                        <p className='m-0'>{item.desc}</p>
                                                    </div>
                                                </div>

                                            </div>

                                        </>
                                    )
                                })
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="action-button d-flex justify-content-start pt-6 gap-2">
                            <button onClick={props.onHide} className="btn btn-secondary btn-fw text-uppercase">
                                ok
                            </button>
                        </div>
                    </Modal.Footer>
                </form>
            </Modal>
    </div>
  )
}

export default WeaponDetail


// import React from 'react'
// import Link from 'next/link';

// const WeaponDetail = () => {
//   return (
//     <>
//       <div className="row">
//             <div className='col-lg-6 mb-2'>
//               <h2 className="font-weight-bold mb-2"> Weapon Detail </h2>
//             </div>
//             <div className='col-lg-6 d-flex justify-content-end mb-2'>
//               <Link href="/weapon-list/">
//               <button type="button" className="btn btn-dark btn-icon-text">
//               <i className="mdi mdi-arrow-left"></i>     
//               Back                     
//               </button>
//               </Link>
//             </div>
//         </div>
//         <div className="row">
//             <div className="col-md-12 grid-margin stretch-card">
//               <div className="card">
//                   <div className="card-body">
                    
//                         <div className="row">
//                           <div className="col-md-4">
//                               <div className="form-group mb-3">
//                                 <label className='mb-1 fw-bold'>Weapon Name</label>
//                                 <p className='m-0'>Abc Weapon</p>
//                               </div>
//                           </div>
//                           <div className="col-md-4">
//                               <div className="form-group mb-3">
//                                 <label className='mb-1 fw-bold'>Type</label>
//                                 <p className='m-0'>Rifel</p>
//                               </div>
//                           </div>
//                           <div className="col-md-4">
//                               <div className="form-group mb-3">
//                                 <label className='mb-1 fw-bold'>Gun Fire Mode</label>
//                                 <p className='m-0'> Open</p>
//                               </div>
//                           </div>
//                           <div className="col-md-4">
//                               <div className="form-group mb-3">
//                                 <label className='mb-1 fw-bold'>Screen Shake Intensity</label>
//                                 <p className='m-0'>1</p>
//                               </div>
//                           </div>
//                           <div className="col-md-4">
//                               <div className="form-group mb-3">
//                                 <label className='mb-1 fw-bold'>Screen Shake Duration</label>
//                                 <p className='m-0'> 2 </p>
//                               </div>
//                           </div>
//                           <div className="col-md-4">
//                               <div className="form-group mb-3">
//                                 <label className='mb-1 fw-bold'>Ammo Type</label>
//                                 <p className='m-0'> lipsom content</p>
//                               </div>
//                           </div>
//                           <div className="col-md-4">
//                               <div className="form-group mb-3">
//                                 <label className='mb-1 fw-bold'>Fire Spread</label>
//                                 <p className='m-0'>12km/h</p>
//                               </div>
//                           </div>
//                           <div className="col-md-4">
//                               <div className="form-group mb-3">
//                                 <label className='mb-1 fw-bold'>Damage</label>
//                                 <p className='m-0'> None</p>
//                               </div>
//                           </div>
//                           <div className="col-md-4">
//                               <div className="form-group mb-3">
//                                 <label className='mb-1 fw-bold'>Magazine Size</label>
//                                 <p className='m-0'> Large</p>
//                               </div>
//                           </div>
//                           <div className="col-md-4">
//                               <div className="form-group mb-3">
//                                 <label className='mb-1 fw-bold'>Gun Shot Intensity</label>
//                                 <p className='m-0'>1</p>
//                               </div>
//                           </div>
//                           <div className="col-md-4">
//                               <div className="form-group mb-3">
//                                 <label className='mb-1 fw-bold'>shooting Range</label>
//                                 <p className='m-0'>4</p>
//                               </div>
//                           </div>
//                           <div className="col-md-4">
//                               <div className="form-group mb-3">
//                                 <label className='mb-1 fw-bold'>Muzzle Flash Intensity</label>
//                                 <p className='m-0'>6</p>
//                               </div>
//                           </div>
//                           <div className="col-md-4">
//                               <div className="form-group mb-3">
//                                 <label className='mb-1 fw-bold'>Shooting Range</label>
//                                 <p className='m-0'>1</p>
//                               </div>
//                           </div>
//                           <div className="col-md-4">
//                               <div className="form-group mb-3">
//                                 <label className='mb-1 fw-bold'>Recoil</label>
//                                 <p className='m-0'>lipsom content</p>
//                               </div>
//                           </div>
//                           <div className="col-md-4">
//                               <div className="form-group mb-3">
//                                 <label className='mb-1 fw-bold'>Fire Rate</label>
//                                 <p className='m-0'>lipsom content</p>
//                               </div>
//                           </div>
//                           <div className="col-md-4">
//                               <div className="form-group mb-3">
//                                 <label className='mb-1 fw-bold'>Reload Time</label>
//                                 <p className='m-0'>lipsom content</p>
//                               </div>
//                           </div>
//                           <div className="col-md-4">
//                               <div className="form-group mb-3">
//                                 <label className='mb-1 fw-bold'>Bullet Shot Audio Clip</label>
//                                 <p className='m-0'>lipsom content</p>
//                               </div>
//                           </div>
//                           <div className="col-md-4">
//                               <div className="form-group mb-3">
//                                 <label className='mb-1 fw-bold'>Bullet Hole Prefab</label>
//                                 <p className='m-0'>lipsom content</p>
//                               </div>
//                           </div>
//                           <div className="col-md-4">
//                               <div className="form-group mb-3">
//                                 <label className='mb-1 fw-bold'>Experience</label>
//                                 <p className='m-0'>lipsom content</p>
//                               </div>
//                           </div>
//                           <div className="col-md-4">
//                               <div className="form-group mb-3">
//                                 <label className='mb-1 fw-bold'>Weight</label>
//                                 <p className='m-0'>20kg</p>
//                               </div>
//                           </div>
//                           <div className="col-md-4">
//                               <div className="form-group mb-3">
//                                 <label className='mb-1 fw-bold'>Description</label>
//                                 <p className='m-0'>lipsom content lipsom content  lipsom content lipsom content </p>
//                               </div>
//                           </div>
//                         </div>
//                   </div>
//               </div>
//             </div>
//         </div>
//     </>
//   )
// }

// export default WeaponDetail