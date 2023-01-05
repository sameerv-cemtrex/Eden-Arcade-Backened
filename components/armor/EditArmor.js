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
        weight: {
            value: ""
        },
        shield: {
            value: ""
        },
        exp: {
            value: ""
        }
    }
};

var isValueInitialized = true;

function initializeData(data, props) {
    // if(data.length>0){

    initialValues.form.id.value = data.id;
    initialValues.form._id.value = data._id;
    initialValues.form.name.value = data.name;
    initialValues.form.desc.value = data.desc;
    initialValues.form.type.value = data.type;
    initialValues.form.weight.value = data.weight;
    initialValues.form.shield.value = data.shield;
    initialValues.form.exp.value = data.exp;

}

//}

const EditArmor = (props) => {

    const [values, setValues] = useState(initialValues.form);

    // console.log("init", values);

    //:: Input Field State
    const [id, setId] = useState("");
    const [_id, set_Id] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [type, setType] = useState("");
    const [weight, setWeight] = useState("");
    const [shield, setShield] = useState("");
    const [exp, setExp] = useState("");
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
            weight: values.weight.value,
            shield: values.shield.value,
            exp: values.exp.value
        };

        fetch(`https://eden-dev.cetxlabs.com:5000/adminPanel/editData/${formData._id}/armorStatic`, {
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
                        Edit Armor
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
                                        onChange={inputChangeHandler}
                                        value={values.id.value}
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
                                        value={values.type.value}
                                        onChange={inputChangeHandler}
                                    
                                    />
                                </div>
                            </div>

                            {/* Weight */}
                            <div className='col-sm-6 mb-3'>
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

                            {/* shield */}
                            <div className='col-sm-6 mb-3'>
                                <div className="form-field position-relative">
                                    <label htmlFor="shield" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                                    >
                                        Shield
                                    </label>
                                    <input
                                        type="number"
                                        id="shield"
                                        className="w-100"
                                        name="shield"
                                        required
                                        value={values.shield.value}
                                        onChange={inputChangeHandler}
                                    
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
                                        value={values.exp.value}
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

export default EditArmor