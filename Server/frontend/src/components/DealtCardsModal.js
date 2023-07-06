import React from 'react'

const Modal = ({ cardList }) => {
    console.log(cardList)
    return (
        <div className='modal'>
            <div className='modal-container'>
                <div className='modal-header'>
                    Modal Title
                </div>
                <div className='modal-body'>
                    <ul>
                        {cardList.map((card) => (
                            <button className='cardButton'>{card}</button>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Modal