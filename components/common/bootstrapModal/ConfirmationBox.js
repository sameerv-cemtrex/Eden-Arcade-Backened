
import { useState } from 'react';
import { forwardRef, fade } from 'react';
import Modal from 'react-bootstrap/Modal';

function ConfirmationBox (props) {
    const [_id, set_Id] = useState();
    const { title, deleteFunction } = props;
    // const Transition = forwardRef(function transition(props, ref){
    //     return <fade ref={ref} {...props} />
    // })

   props.deleteFunction(_id);

  return (
    
    <div>
         <Modal
               {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="model-box text-center"
                // Transition={Transition}
            >
                <Modal.Header closeButton className='p-2'>
                    <Modal.Title id="contained-modal-title-vcenter">
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='m-0'> Are you sure you want to Delete this {title}?</p>
                </Modal.Body>
                <Modal.Footer className='justify-content-center pt-0'>
                    <div className="action-button d-flex justify-content-center pt-6 gap-2">
                        <button onClick={props.onHide} type="submit" className="btn btn-secondary btn-fw text-uppercase"
                        >
                           cancel
                        </button>
                        <button onClick={deleteFunction}  type="submit" className="btn btn-primary btn-fw text-uppercase"
                        >
                           ok
                        </button> 
                    </div>
                </Modal.Footer>
            </Modal>
      
    </div>
  )
}

export default ConfirmationBox
