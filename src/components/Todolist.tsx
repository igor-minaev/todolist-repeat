import React from 'react';

export const Todolist = () => {
    return (
        <div className='todolist'>
            <h2>What to learn</h2>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul className='list'>
                <li>
                    <input type="checkbox" checked={true}/>
                    <span>1</span>
                </li>
                <li>
                    <input type="checkbox" checked={true}/>
                    <span>2</span>
                </li>
                <li>
                    <input type="checkbox" checked={false}/>
                    <span>3</span>
                </li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

