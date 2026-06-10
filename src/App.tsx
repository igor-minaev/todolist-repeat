import './App.css'

function App() {

    return (
        <div className="app">
            <div>
                <h3>What to learn</h3>
                <div>
                    <input type="text"/>
                    <button>x</button>
                </div>
                <ul>
                    <li>
                        <input type="checkbox" checked/>
                        <span>HTML</span>
                    </li>
                    <li>
                        <input type="checkbox" checked/>
                        <span>CSS</span>
                    </li>
                    <li>
                        <input type="checkbox"/>
                        <span>JS</span>
                    </li>
                    <li>
                        <input type="checkbox"/>
                        <span>REACT</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default App
