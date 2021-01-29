import React, { Fragment } from 'react';
import { Checkbox, Form, Segment } from 'semantic-ui-react';

function EntryForm({description, value, isExpense, setValue, setDescription, setIsExpense}) {
    return (
        <Fragment>
            <Form.Group>
                <Form.Input 
                    placeholder="New Shiny Thing" 
                    icon="tags" width={12} label="Description"
                    value={description} 
                    onChange={(event) => setDescription(event.target.value)} />

                <Form.Input 
                    placeholder="100.00" 
                    icon="dollar" width={4} label="Value" iconPosition="left" 
                    value={value} 
                    onChange={(event) => setValue(event.target.value)} />

            </Form.Group>

            <Segment compact>
                <Checkbox toggle 
                    label="Is Expense" 
                    checked={isExpense}
                    onChange={() => setIsExpense(oldState => !oldState)} />
            </Segment>
        </Fragment>
    )
}

export default EntryForm
