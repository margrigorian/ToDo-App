import axios from 'axios';

async function getExpeditionsList() {
    try{
        // const expeditions = await axios.get('http://localhost:3001/expeditions');
        // console.log(expeditions.data.data.data.expeditions);
        // return expeditions.data.data.data.expeditions;

        // FETCH

        const data = await fetch('http://localhost:3001/expeditions');
        const expeditions = await data.json();
        return expeditions.data.data.expeditions;
    }catch(err) {
        console.log(err);
    }
}

async function postNewExpedition(title) {
    try{
        // await axios.post(`http://localhost:3001/expeditions?title=${title}`);

        // FETCH - проблемы с CORS

        const newExpedition = await fetch(`http://localhost:3001/expeditions?title=${title}`, {
            method: "POST"
        });
        return newExpedition; // инф-я с сервера будет отображаться
    }catch(err) {
        console.log(err);
    }
}

async function updateExpedition(obj) {
    try{
        // await axios.put(`http://localhost:3001/expeditions?id=${obj.id}&title=${obj.title}&status=${obj.status}`)

        // FETCH

        const modifiedExpedition = await fetch(`http://localhost:3001/expeditions?id=${obj.id}&title=${obj.title}&status=${obj.status}`, {
            method: "PUT"
        });
        console.log(modifiedExpedition);
    }catch(err) {
        console.log(err); 
    }
}

async function deleteExpeditionFromData(id) {
    try{
        // await axios.delete(`http://localhost:3001/expeditions?id=${id}`);

        // FETCH
        
        const deletedExpedition = await fetch(`http://localhost:3001/expeditions?id=${id}`, {
            method: "DELETE"
        });
        return deletedExpedition;
    }catch(err) {
        console.log(err);
    }
}

export { getExpeditionsList, postNewExpedition, updateExpedition, deleteExpeditionFromData }