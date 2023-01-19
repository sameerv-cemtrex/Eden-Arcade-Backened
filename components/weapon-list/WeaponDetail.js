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
                        Weapon Detail
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
                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Id</label>
                                                        <p className='m-0'>{item.id}</p>

                                                    </div>
                                                </div>
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

                                            <div className='mb-3 mt-3 w-100 full-col'>
                                                    <h5 className='mb-0'>Resources</h5>
                                            </div>

                                            <div className="d-grid">
                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Water</label>
                                                        <p className='m-0'>{item.resources.water}</p>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Heat</label>
                                                        <p className='m-0'>{item.resources.heat}</p>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Air</label>
                                                        <p className='m-0'>{item.resources.air}</p>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Fire</label>
                                                        <p className='m-0'>{item.resources.fire}</p>
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
