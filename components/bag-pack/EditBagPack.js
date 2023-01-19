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
        desc: {
            value: ""
        },
        type: {
            value: ""
        },
        capacity: {
            value: ""
        },
        exp: {
            value: ""
        },
        water: {
            value: ""
        },
        air: {
            value: ""
        },
        fire: {
            value: ""
        },
        heat: {
            value: ""
        }
    }
};

var isValueInitialized = true;

function initializeData(data, props) {

    initialValues.form.id.value = data.id;
    initialValues.form._id.value = data._id;
    initialValues.form.name.value = data.name;
    initialValues.form.desc.value = data.desc;
    initialValues.form.type.value = data.type;
    initialValues.form.capacity.value = data.capacity;
    initialValues.form.exp.value = data.exp;
    initialValues.form.water.value = data.resources.water;
    initialValues.form.air.value = data.resources.air;
    initialValues.form.fire.value = data.resources.fire;
    initialValues.form.heat.value = data.resources.heat;
}

const EditBagPack = (props) => {

    const [values, setValues] = useState(initialValues.form);

    // console.log("init", values);

    //:: Input Field State
    const [id, setId] = useState("");
    const [_id, set_Id] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [type, setType] = useState("");
    const [capacity, setCapacity] = useState("");
    const [exp, setExp] = useState("");
    const [water, setWater] = useState("");
    const [air, setAir] = useState("");
    const [fire, setFire] = useState("");
    const [heat, setHeat] = useState("");
    const [data, setData] = useState([]);

    //:: Call Get Api
    useEffect(() => {
        // console.log("edited", props.editData);
        isValueInitialized = false;
    }, [props.editData])


    //:: initialize existing values
    if (Object.keys(props.editData).length > 0 && !isValueInitialized) {
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
            desc: values.desc.value,
            type: values.type.value,
            capacity: values.capacity.value,
            exp: values.exp.value,
            water: values.water.value,
            air: values.air.value,
            fire: values.fire.value,
            heat: values.heat.value
        };

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminPanel/editData/${formData._id}/bagPackStatic`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json'
            },
            body: JSON.stringify(formData)

        }).then((res) => {
            // console.log("result", res);
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
                        Edit BagPack
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='model-content'>
                        <div className="row">

                            {/* Id */}
                            {/* <div className='col-sm-6 mb-3'>
                                <div className="form-field position-relative">
                                    <label htmlFor="id" className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                                    >
                                        Id
                                    </label>
                                    <input
                                        type="number"
                                        id="id"
                                        className="w-100"
                                        name="id"
                                        required
                                        onChange={inputChangeHandler}
                                        value={values.id.value}
                                    />

                                </div>
                            </div> */}


                            {/* Name */}
                            <div className='col-sm-6 mb-3'>
                                <div className="form-field position-relative">
                                    <label htmlFor="name" className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
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

                            {/* Description */}
                            <div className='col-sm-6 mb-3'>
                                <div className="form-field position-relative">
                                    <label htmlFor="desc" className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
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

                            {/* Type */}
                            <div className='col-sm-6 mb-3'>
                                <div className="form-field position-relative">
                                    <label htmlFor="type" className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                                    >
                                        Type
                                    </label>
                                    <input
                                        type="number"
                                        id="type"
                                        className="w-100"
                                        name="type"
                                        required
                                        value={values.type.value}
                                        onChange={inputChangeHandler}

                                    />
                                </div>
                            </div>

                            {/* capacity */}
                            <div className='col-sm-6 mb-3'>
                                <div className="form-field position-relative">
                                    <label htmlFor="capacity" className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
                                    >
                                        Capacity
                                    </label>
                                    <input
                                        type="number"
                                        id="capacity"
                                        className="w-100"
                                        name="capacity"
                                        required
                                        value={values.capacity.value}
                                        onChange={inputChangeHandler}

                                    />
                                </div>
                            </div>

                            {/* Experience */}
                            <div className='col-sm-6 mb-3'>
                                <div className="form-field position-relative">
                                    <label htmlFor="exp" className="block mb-2 text-capitalize text-tiny leading-4 font-semibold w-100"
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
                        </div>

                        <div className='mb-3 mt-2'>
                            <h5 className='mb-0'>Resources</h5>
                        </div>

                        {/* resources */}
                        <div className="row pt-3">
                            <div className='col-sm-6 mb-3'>
                                <div className="form-field position-relative mb-2">
                                    <label htmlFor="water" className="block mb-2 text-capitalize  text-tiny leading-4 font-semibold w-100"
                                    >
                                        Water
                                    </label>
                                    <input
                                        type="number"
                                        id="water"
                                        className="w-100"
                                        name="water"
                                        required
                                        value={values.water.value}
                                        onChange={inputChangeHandler}
                                    />
                                </div>
                            </div>

                            {/* Fire */}
                            <div className='col-sm-6 mb-3'>
                                <div className="form-field position-relative mb-2">
                                    <label htmlFor="fire" className="block mb-2 text-capitalize  text-tiny leading-4 font-semibold w-100"
                                    >
                                        Fire
                                    </label>
                                    <input
                                        type="number"
                                        id="fire"
                                        className="w-100"
                                        name="fire"
                                        required
                                        value={values.fire.value}
                                        onChange={inputChangeHandler}
                                    />
                                </div>
                            </div>

                            {/* Air */}
                            <div className='col-sm-6 mb-3'>
                                <div className="form-field position-relative mb-2">
                                    <label htmlFor="air" className="block mb-2 text-capitalize  text-tiny leading-4 font-semibold w-100"
                                    >
                                        Air
                                    </label>
                                    <input
                                        type="number"
                                        id="air"
                                        className="w-100"
                                        name="air"
                                        required
                                        value={values.air.value}
                                        onChange={inputChangeHandler}
                                    />
                                </div>
                            </div>

                            {/* Heat */}
                            <div className='col-sm-6 mb-3'>
                                <div className="form-field position-relative mb-2">
                                    <label htmlFor="heat" className="block mb-2 text-capitalize  text-tiny leading-4 font-semibold w-100"
                                    >
                                        Heat
                                    </label>
                                    <input
                                        type="number"
                                        id="heat"
                                        className="w-100"
                                        name="heat"
                                        required
                                        value={values.heat.value}
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
        </div>
    )
}

export default EditBagPack