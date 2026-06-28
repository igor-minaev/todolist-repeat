type Props = {};
export const TodolistItem = (props: Props) => {
    return (
        <div>
            <h3>What to learn</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li>
                    <input type="checkbox" checked={true}/>
                    <span>HTML</span>
                    <button>x</button>
                </li>
                <li>
                    <input type="checkbox" checked={true}/>
                    <span>CSS</span>
                    <button>x</button>
                </li>
                <li>
                    <input type="checkbox" checked={true}/>
                    <span>JS</span>
                    <button>x</button>
                </li>
                <li>
                    <input type="checkbox" checked={false}/>
                    <span>REACT</span>
                    <button>x</button>
                </li>
                <li>
                    <input type="checkbox" checked={false}/>
                    <span>REDUX</span>
                    <button>x</button>
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
