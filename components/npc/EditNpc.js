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
        level: {
            value: ""
        },
        enemy: {
            value: ""
        },
        health: {
            value: ""
        },
        damage: {
            value: ""
        },
        fireRate: {
            value: ""
        },
        range: {
            value: ""
        },
        movementSpeed: {
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
    initialValues.form.level.value = data.level;
    initialValues.form.enemy.value = data.enemy;
    initialValues.form.health.value = data.health;
    initialValues.form.damage.value = data.damage;
    initialValues.form.fireRate.value = data.fireRate;
    initialValues.form.range.value = data.range;
    initialValues.form.movementSpeed.value = data.movementSpeed;
    initialValues.form.exp.value = data.exp;
}
const EditNpc = (props) => {

    const [values, setValues] = useState(initialValues.form);

    // console.log("init", values);

    //:: Input Field State
    const [id, setId] = useState("");
    const [_id, set_Id] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [level, setLevel] = useState("");
    const [enemy, setEnemy] = useState("");
    const [health, setHealth] = useState("");
    const [damage, setDamage] = useState("");
    const [fireRate, setFireRate] = useState("");
    const [range, setRange] = useState("");
    const [movementSpeed, setMovementSpeed] = useState("");
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
            level: values.level.value,
            enemy: values.enemy.value,
            health: values.health.value,
            damage: values.damage.value,
            fireRate: values.fireRate.value,
            range: values.range.value,
            movementSpeed: values.movementSpeed.value,
            exp: values.exp.value
        };

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/editData/${formData._id}/npcStatic`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json'
            },
            body: JSON.stringify(formData)

        }).then((res) => {
            console.log("result", res);
            props.onClose()
        }).catch(err => console.log(err))

        // alert("Form Updated Successfully");

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
                        Edit NPCs
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='model-content'>
                        <div className="row">

                            {/* Id */}
                            {/* <div className='col-sm-6 mb-3'>
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
                            </div> */}


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

                            {/* Level */}
                            <div className='col-sm-6 mb-3'>
                                <div className="form-field position-relative">
                                    <label htmlFor="level" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                                    >
                                        Level
                                    </label>
                                    <input
                                        type="number"
                                        id="level"
                                        className="w-100"
                                        name="level"
                                        required
                                        value={values.level.value}
                                        onChange={inputChangeHandler}

                                    />
                                </div>
                            </div>

                            {/* Enemy */}
                            <div className='col-sm-6 mb-3'>
                                <div className="form-field position-relative">
                                    <label htmlFor="enemy" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                                    >
                                        Enemy
                                    </label>
                                    <input
                                        type="number"
                                        id="enemy"
                                        className="w-100"
                                        name="enemy"
                                        required
                                        value={values.enemy.value}
                                        onChange={inputChangeHandler}

                                    />
                                </div>
                            </div>

                            {/* health */}
                            <div className='col-sm-6 mb-3'>
                                <div className="form-field position-relative">
                                    <label htmlFor="health" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                                    >
                                        Health
                                    </label>
                                    <input
                                        type="number"
                                        id="health"
                                        className="w-100"
                                        name="health"
                                        required
                                        value={values.health.value}
                                        onChange={inputChangeHandler}

                                    />
                                </div>
                            </div>

                            {/* damage */}
                            <div className='col-sm-6 mb-3'>
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

                            {/* fireRate */}
                            <div className='col-sm-6 mb-3'>
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


                            {/* range */}
                            <div className='col-sm-6 mb-3'>
                                <div className="form-field position-relative">
                                    <label htmlFor="range" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                                    >
                                        Range
                                    </label>
                                    <input
                                        type="number"
                                        id="type"
                                        className="w-100"
                                        name="range"
                                        required
                                        value={values.range.value}
                                        onChange={inputChangeHandler}

                                    />
                                </div>
                            </div>


                            {/* movementSpeed */}
                            <div className='col-sm-6 mb-3'>
                                <div className="form-field position-relative">
                                    <label htmlFor="movementSpeed" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                                    >
                                        Movement Speed
                                    </label>
                                    <input
                                        type="number"
                                        id="movementSpeed"
                                        className="w-100"
                                        name="movementSpeed"
                                        required
                                        value={values.movementSpeed.value}
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

        </div>
    )
}

export default EditNpc