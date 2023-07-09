const submit = document.getElementById('submit');
const divTasks = document.getElementById('tasks');
const inputTask = document.getElementById('name');
const pResult = document.getElementById('result');

submit.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
        const name = inputTask.value;
        const data = await axios.post('/api/v1/tasks', { name });
        
        const p = document.createElement('p');
        const span = document.createElement('span');
        const button = document.createElement('button');

        const id = data.data.task._id;
        span.textContent = name;
        span.setAttribute('class', 'task-name');
        button.setAttribute('name', id);
        button.textContent = 'delete';
        button.addEventListener('click', deleteTask);

        p.appendChild(span);
        p.appendChild(button);
        divTasks.appendChild(p);

        pResult.setAttribute('class', 'successful');
        pResult.textContent = 'added';
    } catch (err) {
        console.log(err);
        pResult.setAttribute('class', 'error');
        pResult.textContent = err.response.data.message;
    }
});

async function deleteTask(e) {
    const id = e.target.name;
    try {
        await axios.delete(`/api/v1/tasks/${id}`);
        e.target.parentNode.remove();

        pResult.setAttribute('class', 'successful');
        pResult.textContent = 'deleted';
    } catch (err) {
        console.log(err);
        pResult.setAttribute('class', 'error');
        pResult.textContent = err.response.data.message;;
    }
}

const init = async () => {
    try {
        const { data: { tasks: tasks } } = await axios.get('/api/v1/tasks');

        tasks.map(task => {
            const p = document.createElement('p');
            const span = document.createElement('span');
            const button = document.createElement('button');

            span.textContent = task.name;
            span.setAttribute('class', 'task-name');

            button.setAttribute('name', task._id);
            button.textContent = 'delete';
            button.addEventListener('click', deleteTask);

            p.appendChild(span);
            p.appendChild(button);

            divTasks.append(p);
        });
    } catch (err) {
        console.log(err);
        pResult.setAttribute('class', 'error');
        pResult.textContent = 'unable to fetch data';
    }
}

init();
