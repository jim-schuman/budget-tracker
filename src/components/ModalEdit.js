import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import EntryForm from './EntryForm';

function ModalEdit({isOpen, setIsOpen, description, 
    value, isExpense, setValue, setDescription, setIsExpense}) {
    return (
        <Modal open={isOpen}>
            <Modal.Header>Edit Entry</Modal.Header>
            <Modal.Content>
                <EntryForm description={description} value={value} isExpense={isExpense} 
            setValue={setValue} setDescription={setDescription} setIsExpense={setIsExpense} />
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setIsOpen(false)}>Close</Button>
                <Button onClick={() => setIsOpen(false)} positive>Ok</Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ModalEdit
