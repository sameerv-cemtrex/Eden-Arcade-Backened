import React, { useEffect, useState } from 'react'

// initial state
var initialValues = {
    form: {

        name: {
            value: ""
        },
        code: {
            value: ""
        },
        is_online: {
            value: ""
        },
        playerLevel: {
            value: ""
        },
        strength: {
            value: ""
        },
        endurance: {
            value: ""
        },
        vitality: {
            value: ""
        },
        intelligence: {
            value: ""
        },
        gunMastery: {
            value: ""
        },
        gunMarksmanship: {
            value: ""
        },
        gunHandling: {
            value: ""
        },
        craftsmanship: {
            value: ""
        },
        knifeMastery: {
            value: ""
        },
        water: {
            value: ""
        },
        fire: {
            value: ""
        },
        air: {
            value: ""
        },
        heat: {
            value: ""
        },
        quantity: {
            value: ""
        }

    }
};

var isValueInitialized = true;

function initializeData(data, props) {

    initialValues.form.name.value = data.name;
    initialValues.form.code.value = data.code;
    initialValues.form.is_online.value = data.is_online;
    initialValues.form.playerLevel.value = data.playerStat.playerLevel;
    initialValues.form.strength.value = data.playerStat.strength;
    initialValues.form.endurance.value = data.playerStat.endurance;
    initialValues.form.vitality.value = data.playerStat.vitality;
    initialValues.form.intelligence.value = data.playerStat.intelligence;
    initialValues.form.gunMastery.value = data.playerStat.gunMastery;
    initialValues.form.gunMarksmanship.value = data.playerStat.gunMarksmanship;
    initialValues.form.gunHandling.value = data.playerStat.gunHandling;
    initialValues.form.craftsmanship.value = data.playerStat.craftsmanship;
    initialValues.form.knifeMastery.value = data.playerStat.knifeMastery;
    initialValues.form.water.value = data.resources.water;
    initialValues.form.fire.value = data.resources.fire;
    initialValues.form.air.value = data.resources.air;
    initialValues.form.heat.value = data.resources.heat;
    initialValues.form.quantity.value = data.inventory.quantity;
}

const EditUser = (props) => {
    const [userData, setUserData] = useState();
    const [values, setValues] = useState(initialValues.form);

    //:: Call Get Api
    useEffect(() => {
        console.log("edited", props.userData);
        isValueInitialized = false;
    }, [props.userData])

    //:: initialize existing values
    if (Object.keys(props.userData).length > 0 && !isValueInitialized) {
        if (props.userData) {
            initializeData(props.userData);
        }
    }

    //:: Call EDIT Get Api
    const formDataEditHandler = (e) => {
        e.preventDefault();

        // console.log(values.name.value)
        let formData = {
            name: values.name.value,
            code: values.code.value,
            is_online: values.is_online.value,
            playerLevel: values.playerLevel.value,
            strength: values.strength.value,
            endurance: values.endurance.value,
            vitality: values.vitality.value,
            intelligence: values.intelligence.value,
            gunMastery: values.gunMastery.value,
            gunMarksmanship: values.gunMarksmanship.value,
            gunHandling: values.gunHandling.value,
            craftsmanship: values.craftsmanship.value,
            knifeMastery: values.knifeMastery.value,
            water: values.water.value,
            fire: values.fire.value,
            air: values.air.value,
            heat: values.heat.value,
            quantity: values.quantity.value
        };

        // console.log(typeof (Number(localStorage.getItem("userId"))));
        try {

            // ${Number(localStorage.getItem("userId"))}
            console.log("json", formData);
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminPanel/editUserByAccounId/${Number(localStorage.getItem("userId"))}`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(formData)

            }).then(response => response.json())
                .then(data => {
                    setUserData(data.message);
                    // console.log("result", data.message);
                }
                );
        }
        catch (err) {
            console.log(err);
        }

        alert("User Details Updated Successfully");

        window.location.reload();
        window.location.href = "/user";


    }

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: { ...values[name], value: value },
        });
    };

    // console.log("values", values);

    return (
        <>
            <div className="row">
                <div className='col-lg-6 mb-2'>
                    <h2 className=" font-weight-bold mb-2"> Edit User</h2>
                </div>
                <div className='col-lg-6 mb-2 d-flex justify-content-end'>
                    <button onClick={() => { window.location.href = `/user` }} className="btn btn-secondary btn-fw btn-user">Back</button>
                </div>
            </div>

            <div className='row user-list'>
                <div className="col-12 card bg-white p-4 m-auto mt-2 edit-card">

                    <div className="row">
                        {/* Name */}
                        <div className='col-sm-12 mb-3'>
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
                                    onChange={inputChangeHandler}
                                    value={values.name.value}

                                />
                            </div>
                        </div>

                        {/* Code */}
                        {/* <div className='col-sm-4 mb-3'>
                            <div className="form-field position-relative">
                                <label htmlFor="code" className="block mb-2 text-capitalize  text-tiny leading-4 font-semibold w-100"
                                >
                                    Code
                                </label>

                                <input
                                    type="number"
                                    id="code"
                                    className="w-100"
                                    name="code"
                                    required
                                    onChange={inputChangeHandler}
                                    value={values.code.value}
                                />
                            </div>
                        </div> */}

                        {/* is_online */}
                        {/* <div className='col-sm-4 mb-3'>
                            <div className="form-field position-relative">
                                <label htmlFor="is_online" className="block mb-2 text-capitalize  text-tiny leading-4 font-semibold w-100"
                                >
                                    is_online
                                </label>

                                <input
                                    type="number"
                                    id="is_online"
                                    className="w-100"
                                    name="is_online"
                                    required
                                    onChange={inputChangeHandler}
                                    value={values.is_online.value}
                                />
                            </div>
                        </div> */}
                    </div>

                    <div className="row">

                        <div className='col-sm-12 mb-3'>
                            <h5>PlayerStat</h5>
                        </div>

                        {/* playerLevel */}
                        <div className='col-sm-3 mb-3'>
                            <div className="form-field position-relative mb-2">
                                <label htmlFor="playerLevel" className="block mb-2 text-capitalize  text-tiny leading-4 font-semibold w-100"
                                >
                                    player Level
                                </label>
                                <input
                                    type="number"
                                    id="playerLevel"
                                    className="w-100"
                                    name="playerLevel"
                                    required
                                    onChange={inputChangeHandler}
                                    value={values.playerLevel.value}
                                />
                            </div>
                        </div>

                        {/* strength */}
                        <div className='col-sm-3 mb-3'>
                            <div className="form-field position-relative mb-2">
                                <label htmlFor="strength" className="block mb-2 text-capitalize  text-tiny leading-4 font-semibold w-100"
                                >
                                    Strength
                                </label>
                                <input
                                    type="number"
                                    id="strength"
                                    className="w-100"
                                    name="strength"
                                    required
                                    onChange={inputChangeHandler}
                                    value={values.strength.value}
                                />
                            </div>
                        </div>

                        {/* Endurance */}
                        <div className='col-sm-3 mb-3'>
                            <div className="form-field position-relative mb-2">
                                <label htmlFor="endurance" className="block mb-2 text-capitalize  text-tiny leading-4 font-semibold w-100"
                                >
                                    Endurance
                                </label>
                                <input
                                    type="number"
                                    id="endurance"
                                    className="w-100"
                                    name="endurance"
                                    required
                                    onChange={inputChangeHandler}
                                    value={values.endurance.value}
                                />
                            </div>
                        </div>

                        {/* vitality */}
                        <div className='col-sm-3 mb-3'>
                            <div className="form-field position-relative mb-2">
                                <label htmlFor="vitality" className="block mb-2 text-capitalize  text-tiny leading-4 font-semibold w-100"
                                >
                                    Vitality
                                </label>
                                <input
                                    type="number"
                                    id="vitality"
                                    className="w-100"
                                    name="vitality"
                                    required
                                    onChange={inputChangeHandler}
                                    value={values.vitality.value}
                                />
                            </div>
                        </div>

                        {/* intelligence */}
                        <div className='col-sm-3 mb-3'>
                            <div className="form-field position-relative mb-2">
                                <label htmlFor="intelligence" className="block mb-2 text-capitalize  text-tiny leading-4 font-semibold w-100"
                                >
                                    Intelligence
                                </label>
                                <input
                                    type="number"
                                    id="intelligence"
                                    className="w-100"
                                    name="intelligence"
                                    required
                                    onChange={inputChangeHandler}
                                    value={values.intelligence.value}
                                />
                            </div>
                        </div>

                        {/* gunMastery */}
                        <div className='col-sm-3 mb-3'>
                            <div className="form-field position-relative mb-2">
                                <label htmlFor="gunMastery" className="block mb-2 text-capitalize  text-tiny leading-4 font-semibold w-100"
                                >
                                    Gun Mastery
                                </label>
                                <input
                                    type="number"
                                    id="gunMastery"
                                    className="w-100"
                                    name="gunMastery"
                                    required
                                    onChange={inputChangeHandler}
                                    value={values.gunMastery.value}
                                />
                            </div>
                        </div>

                        {/* gunMarksmanship */}
                        <div className='col-sm-3 mb-3'>
                            <div className="form-field position-relative mb-2">
                                <label htmlFor="gunMarksmanship" className="block mb-2 text-capitalize  text-tiny leading-4 font-semibold w-100"
                                >
                                    Gun Marks Man Ship
                                </label>
                                <input
                                    type="number"
                                    id="gunMarksmanship"
                                    className="w-100"
                                    name="gunMarksmanship"
                                    required
                                    onChange={inputChangeHandler}
                                    value={values.gunMarksmanship.value}
                                />
                            </div>
                        </div>

                        {/* gunHandling */}
                        <div className='col-sm-3 mb-3'>
                            <div className="form-field position-relative mb-2">
                                <label htmlFor="gunHandling" className="block mb-2 text-capitalize  text-tiny leading-4 font-semibold w-100"
                                >
                                    Gun Handling
                                </label>
                                <input
                                    type="number"
                                    id="gunHandling"
                                    className="w-100"
                                    name="gunHandling"
                                    required
                                    onChange={inputChangeHandler}
                                    value={values.gunHandling.value}
                                />
                            </div>
                        </div>

                        {/* craftsmanship */}
                        <div className='col-sm-3 mb-3'>
                            <div className="form-field position-relative mb-2">
                                <label htmlFor="craftsmanship" className="block mb-2 text-capitalize  text-tiny leading-4 font-semibold w-100"
                                >
                                    Crafts Man Ship
                                </label>
                                <input
                                    type="number"
                                    id="craftsmanship"
                                    className="w-100"
                                    name="craftsmanship"
                                    required
                                    onChange={inputChangeHandler}
                                    value={values.craftsmanship.value}
                                />
                            </div>
                        </div>

                        {/* knifeMastery */}
                        <div className='col-sm-3 mb-3'>
                            <div className="form-field position-relative mb-2">
                                <label htmlFor="knifeMastery" className="block mb-2 text-capitalize  text-tiny leading-4 font-semibold w-100"
                                >
                                    Knife Mastery
                                </label>
                                <input
                                    type="number"
                                    id="knifeMastery"
                                    className="w-100"
                                    name="knifeMastery"
                                    required
                                    onChange={inputChangeHandler}
                                    value={values.knifeMastery.value}
                                />
                            </div>
                        </div>
                    </div>

                    {/* <div className='mb-3'>
                        <h5>Inventory</h5>
                    </div> */}

                    {/* mainId */}
                    {/* <div className="row">
                        <div className='col-sm-3 mb-3'>
                            <div className="form-field position-relative mb-2">
                                <label htmlFor="mainId" className="block mb-2 text-capitalize  text-tiny leading-4 font-semibold w-100"
                                >
                                    main Id
                                </label>
                                <input
                                    type="number"
                                    id="mainId"
                                    className="w-100"
                                    name="mainId"
                                    required
                                />
                            </div>
                        </div>

                      
                        <div className='col-sm-3 mb-3'>
                            <div className="form-field position-relative mb-2">
                                <label htmlFor="id" className="block mb-2 text-capitalize  text-tiny leading-4 font-semibold w-100"
                                >
                                    id
                                </label>
                                <input
                                    type="id"
                                    id="id"
                                    className="w-100"
                                    name="id"
                                    required
                                />
                            </div>
                        </div>

                       
                        <div className='col-sm-3 mb-3'>
                            <div className="form-field position-relative mb-2">
                                <label htmlFor="quantity" className="block mb-2 text-capitalize  text-tiny leading-4 font-semibold w-100"
                                >
                                    quantity
                                </label>
                                <input
                                    type="number"
                                    id="quantity"
                                    className="w-100"
                                    name="quantity"
                                    required
                                    onChange={inputChangeHandler}
                                    value={values.quantity.value}
                                />
                            </div>
                        </div>
                    </div> */}

                    <div className='mb-3'>
                        <h5>Resources</h5>
                    </div>

                    {/* Water */}
                    <div className="row">
                        <div className='col-sm-3 mb-3'>
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
                                    onChange={inputChangeHandler}
                                    value={values.water.value}
                                />
                            </div>
                        </div>

                        {/* Fire */}
                        <div className='col-sm-3 mb-3'>
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
                                    onChange={inputChangeHandler}
                                    value={values.fire.value}
                                />
                            </div>
                        </div>

                        {/* Air */}
                        <div className='col-sm-3 mb-3'>
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
                                    onChange={inputChangeHandler}
                                    value={values.air.value}
                                />
                            </div>
                        </div>

                        {/* Heat */}
                        <div className='col-sm-3 mb-3'>
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
                                    onChange={inputChangeHandler}
                                    value={values.heat.value}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='mt-2 d-flex justify-content-end gap-2'>
                        <button onClick={() => { window.location.href = `/user` }} className="btn btn-secondary btn-fw btn-user">Cancel</button>
                        <button type="submit" onClick={formDataEditHandler} className="btn btn-primary btn-fw btn-user">Save</button>

                    </div>
                </div>


            </div>
        </>
    )
}

export default EditUser