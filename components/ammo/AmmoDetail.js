import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';

const AmmoDetail = (props) => {
    const [data, setData] = useState([]);

    //:: Call Get Api
    useEffect(() => {
        fetch('https://eden-dev.cetxlabs.com:5000/adminPanel/getAllData/ammosStatic', {
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
                        Ammos Detail
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
                                                        <label className='mb-1 fw-bold'>Weight</label>
                                                        <p className='m-0'>{item.weight}</p>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>damage</label>
                                                        <p className='m-0'> {item.damage} </p>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Experience</label>
                                                        <p className='m-0'> {item.exp}</p>
                                                    </div>
                                                </div>
                                                {/* <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>_ID</label>
                                                        <p className='m-0'> {item._id}</p>
                                                    </div>
                                                </div> */}
                                                <div className="col">
                                                    <div className="form-group mb-0 bg-light p-2 border rounded">
                                                        <label className='mb-1 fw-bold'>Description</label>
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

export default AmmoDetail
