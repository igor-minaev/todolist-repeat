import React from 'react';

export const Todolist = () => {
    return (
        <div className='todolist'>
            <h2>Todolist</h2>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Complete</button>
            </div>
        </div>
    );
};

