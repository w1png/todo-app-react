import { Modal } from 'flowbite-react';
import { useState } from 'react';

type ModalComponentProps = {
    header?: React.ReactNode;
    body: React.ReactNode;
    footer?: React.ReactNode;
    size_value?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
};


const ModalComponent = ({ header, body, footer, size_value }: ModalComponentProps) => {
    const [show, setShow] = useState(true);
    const onClose = () => {
        setShow(false);
    };

    const size = size_value ? size_value : 'md';
    return (
        <>
            <Modal
                show={show}
                onClose={onClose}
                size={size}
            >
                {header ? (
                    <Modal.Header>
                        {header}
                    </Modal.Header>
                ) : (
                    <Modal.Header/>
                )} 

                <Modal.Body>
                    <div className='space-y-6 leading-relaxed text-base text-gray-300'>
                        {body}
                    </div>
                </Modal.Body>

                {footer ? (
                    <Modal.Footer>
                        {footer}
                    </Modal.Footer>
                ) : (
                    <Modal.Footer/>
                )}
            </Modal>
        </>
    )
};

export default ModalComponent;
