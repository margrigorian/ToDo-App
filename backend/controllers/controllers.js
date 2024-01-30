import path from "path";
import fs from "fs/promises";
const dataPath = path.resolve('public', 'data.json');

async function getData() {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
}

async function postNewTodo(title) {
    const data = await getData();
    const newTodo = {
        id : (Math.floor(Math.random() * 13) + 7).toString(), 
        title : title,
        status : "false"
    };

    data.expeditions.push(newTodo);
    await fs.writeFile(dataPath, JSON.stringify(data));
    return newTodo;
}

async function updateTodo(id, title, status) {
    const data = await getData();
    
    const updateData = data.expeditions.map(el => {
        if(el.id === id) {
            
            console.log(`Из базы ${el.status}`, `Новое ${status}`);

            el.title = title;
            el.status = status.toString();
            return el;
        }else {
            return el;
        }
    })


    data.expeditions = updateData;
    console.log(updateData, data);
    await fs.writeFile(dataPath, JSON.stringify(data));

    const updatedTodo = data.expeditions.find(el => el.id === id);
    return updatedTodo;
}

async function removeTodo(id) {
    const data = await getData();
    const deletedTodo = data.expeditions.find(el => el.id === id);

    const updatedData = data.expeditions.filter(el => el.id !== id);
    data.expeditions = updatedData;
    await fs.writeFile(dataPath, JSON.stringify(data));
    
    return deletedTodo;
}

export { getData, postNewTodo, updateTodo, removeTodo }