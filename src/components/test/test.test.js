import React from 'react';
import ReactDOM from 'react-dom';
import Test from '.Test';

it('It should mount', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Test />, div);
    ReactDOM.unmountComponentAtNode(div);
});