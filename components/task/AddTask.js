import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';

const AddTask = (props) => {

    const [data, setData] = useState({
        id: "",
        name: "",
        desc: "",
        type: "",
        giver: "",
        goal: "",
        reward: "",
        exp: ""
    })
    const [modalShow, setModalShow] = useState(false);

    //::Array of obj state
    // const [armorRecord, setArmorRecord] = useState([]);

    //:: Input Field State
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [desc, setDesc] = useState();
    const [type, setType] = useState();
    const [giver, setGiver] = useState();
    const [goal, setGoal] = useState();
    const [reward, setReward] = useState();
    const [exp, setExp] = useState();

    const [idError, setIdError] = useState('')
    const [nameError, setNameError] = useState('')
    const [descError, setDescError] = useState('')
    const [typeError, setTypeError] = useState('')
    const [weightError, setWeightError] = useState('')
    const [shieldError, setShieldError] = useState('')
    const [expError, setExpError] = useState('')

    //:: formDataSaveHandler form
    function formDataSaveHandler(e) {
        e.preventDefault();

        if (!data.id || !data.name || !data.desc || !data.type || !data.giver || !data.goal || !data.reward ||
            !data.exp) {
            alert("Please fill out all fields");
            return;
        }

        fetch(`https://eden-dev.cetxlabs.com:5000/adminPanel/addData/taskStatic`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        }).then((res) => {
            console.log("result", res);
            props.onClose()
             
        }).catch(function (error) {
            // handle error
            console.log(error);
        })

        //:: setArmorRecord([...armorRecord, armorRecord]);

        setId('');
        setName('');
        setDesc('');
        setType('');
        setGiver('');
        setGoal('');
        setReward('');
        setExp('');
        // console.log(data);
        alert("Form Submitted Successfully");
        
        window.location.reload();  
    }


    function handle(e) {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

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
                        ADD Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='model-content'>
                        <div className="row">

                            {/* Id */}
                            <div className='col-sm-6 mb-3'>
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
                                        value={data.id}
                                        onChange={(e) => handle(e)}

                                    />
                                </div>
                            </div>

                            {/* Name */}
                            <div className='col-sm-6 mb-3'>
                                <div className="form-field position-relative">
                                    <label htmlFor="name" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-100"
                                        name="first_name"
                                        required
                                        value={data.name}
                                        onChange={(e) => handle(e)}
                                    // onChange={(e) =>
                                    //     setName(e.target.value)
                                    // }
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className='col-sm-6 mb-3'>
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
                                        value={data.desc}
                                        onChange={(e) => handle(e)}
                                    // onChange={(e) =>
                                    //     setDesc(e.target.value)
                                    // }
                                    />
                                </div>
                            </div>

                            {/* Type */}
                            <div className='col-sm-6 mb-3'>
                                <div className="form-field position-relative">
                                    <label htmlFor="type" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                                    >
                                        Type
                                    </label>
                                    <input
                                        type="number"
                                        id="type"
                                        className="w-100"
                                        name="type"
                                        required
                                        value={data.type}
                                        onChange={(e) => handle(e)}
                                    // onChange={(e) =>
                                    //     setType(e.target.value)
                                    // }
                                    />
                                </div>
                            </div>

                            {/* giver */}
                            <div className='col-sm-6 mb-3'>
                                <div className="form-field position-relative">
                                    <label htmlFor="giver" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                                    >
                                        Giver
                                    </label>
                                    <input
                                        type="number"
                                        id="giver"
                                        className="w-100"
                                        name="giver"
                                        required
                                        value={data.giver}
                                        onChange={(e) => handle(e)}
                                    // onChange={(e) =>
                                    //     setGiver(e.target.value)
                                    // }
                                    />
                                </div>
                            </div>

                            {/* Goal */}
                            <div className='col-sm-6 mb-3'>
                                <div className="form-field position-relative">
                                    <label htmlFor="goal" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                                    >
                                        Goal
                                    </label>
                                    <input
                                        type="number"
                                        id="goal"
                                        className="w-100"
                                        name="goal"
                                        required
                                        value={data.goal}
                                        onChange={(e) => handle(e)}
                                    // onChange={(e) =>
                                    //     setGoal(e.target.value)
                                    // }
                                    />
                                </div>
                            </div>

                            {/* Reward */}
                            <div className='col-sm-6 mb-3'>
                                <div className="form-field position-relative">
                                    <label htmlFor="reward" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                                    >
                                        Reward
                                    </label>
                                    <input
                                        type="number"
                                        id="reward"
                                        className="w-100"
                                        name="reward"
                                        required
                                        value={data.reward}
                                        onChange={(e) => handle(e)}
                                    // onChange={(e) =>
                                    //     setReward(e.target.value)
                                    // }
                                    />
                                </div>
                            </div>

                            {/* Experience */}
                            <div className='col-sm-6 mb-3'>
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
                                        value={data.exp}
                                        onChange={(e) => handle(e)}
                                    // onChange={(e) =>
                                    //     setExp(e.target.value)
                                    // }
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
                        <button onClick={formDataSaveHandler} type="submit" className="btn btn-primary btn-fw text-uppercase">
                            add
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddTask