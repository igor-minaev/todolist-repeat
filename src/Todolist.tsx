export const Todolist = () => {
    return (
        <div>
            <h3>What to learn</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <div>
                <label htmlFor="priority">Priority</label>
                <select name="priority" id="priority">
                    <option value="All"></option>
                    <option value="Low"></option>
                    <option value="Middle"></option>
                    <option value="High"></option>
                </select>
            </div>
            <ul></ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};
