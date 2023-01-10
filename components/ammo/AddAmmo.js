import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';

const AddAmmo = (props) => {
    const [data, setData] = useState({
        id: "",
        name: "",
        desc: "",
        type: "",
        weight: "",
        damage: "",
        exp: ""
    })
    const [modalShow, setModalShow] = useState(false);

    //::Array of obj state
    const [ammosRecord, setAmmosRecord] = useState([]);

    //:: Input Field State
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [type, setType] = useState("");
    const [weight, setWeight] = useState("");
    const [damage, setDamage] = useState("");
    const [exp, setExp] = useState("");

    const [idError, setIdError] = useState('')
    const [nameError, setNameError] = useState('')
    const [descError, setDescError] = useState('')
    const [typeError, setTypeError] = useState('')
    const [weightError, setWeightError] = useState('')
    const [damageError, setDamageError] = useState('')
    const [expError, setExpError] = useState('')

    //:: formDataSaveHandler form
    function formDataSaveHandler(e) {
        e.preventDefault();

        if (!data.name || !data.desc || !data.type ||
            !data.weight || !data.damage || !data.exp) {
            alert("Please fill out all fields");
            return;
        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminPanel/addData/ammosStatic`, {
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
            setWeight('');
            setDamage('');
            setExp('');
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
                        ADD Ammos
                    </Modal.Title>
                </Modal.Header>

                <form>
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
                                            type="text"
                                            id="id"
                                            className="w-100"
                                            name="id"
                                            required
                                            value={data.id}
                                            onChange={(e) => handle(e)}
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
                                            value={data.name}
                                            onChange={(e) => handle(e)}
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
                                            value={data.weight}
                                            onChange={(e) => handle(e)}
                                        />

                                    </div>
                                </div>

                                {/* damage */}
                                <div className='col-sm-6 mb-3'>
                                    <div className="form-field position-relative">
                                        <label htmlFor="shield" className="block mb-2 uppercase text-tiny leading-4 font-semibold w-100"
                                        >
                                            Damage
                                        </label>
                                        <input
                                            type="number"
                                            id="damage"
                                            className="w-100"
                                            name="damage"
                                            required
                                            value={data.damage}
                                            onChange={(e) => handle(e)}
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
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="action-button d-flex justify-content-start pt-6 gap-2">
                            <button onClick={props.onHide} className="btn btn-secondary btn-fw text-uppercase"
                            >
                                Cancel
                            </button>
                            <button type='submit' onClick={formDataSaveHandler} className="btn btn-primary btn-fw text-uppercase">
                                add
                            </button>
                        </div>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}

export default AddAmmo
