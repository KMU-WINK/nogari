import {useState,React} from 'react'
import Modal from 'react-modal'
import './Link_input.css'

Modal.setAppElement('#root')

const LinkModal = (props) => {
    const{open,close} = props;
    const[value,setValue]=useState("")
    return(
        <div className={ open ? 'openModal modal' : 'modal' }>
            { open ? (
                <div className='linkmain'>
                    <button className="close" onClick={close}> &times;</button>
                    <input placeholder="링크를 입력해주세요" value={value} onChange={e=>setValue(e.target.value)} />
                    { value===""
                        ?<button disabled={value===""} className="enter1">입장</button>
                        :<button className="enter2">입장</button>

                    }

                </div>
            ) : null }
        </div>
    )
}

export default LinkModal
