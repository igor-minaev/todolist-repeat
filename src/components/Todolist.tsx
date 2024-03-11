import React from 'react';

export const Todolist = () => {
    return (
        <div className='todolist'>
            <h3 className='title'>sdfsdfsdfsdf</h3>
            <div>
                <input/>
                <select>
                    <option value="-">Choose direction</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                </select>
                <button>+</button>
            </div>
            <ul></ul>
            <div className='buttons'>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

