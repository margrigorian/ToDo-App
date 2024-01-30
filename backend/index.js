import path from "path"; 
import fs from "fs/promises";
import http from "http";
import url from 'url';
import { getData, postNewTodo, updateTodo, removeTodo } from './controllers/controllers.js';

const server = http.createServer(async (req, res) => {
    
    if(req.method === "OPTIONS") {
        res.writeHead(200, {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*"
        });
        res.end();
        return;
    }

    const reqURL = url.parse(req.url, true);
    const method = req.method;

    console.log(method);

    let response = {
        data: null,
        error: null
    }

    if(reqURL.pathname === "/expeditions") {
        try{
             if(method === "GET") {
                const data = await getData(); 
                response.data = {
                    data
                }

                res.writeHead(200, { 
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type" : "application/json",
                    "Content-Length" : Buffer.byteLength(JSON.stringify(response))
                });
                res.write(JSON.stringify(response));
                res.end();
                return;
            } else if(method === "POST") {
                const newTodo = await postNewTodo(reqURL.query.title);

                response.data = {
                    newTodo
                }

                res.writeHead(201, {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type" : "application/json",
                    "Content-Lenght" : Buffer.byteLength(JSON.stringify(response))
                });
                res.write(JSON.stringify(response));
                res.end();
                return;
            } else if(method === "PUT") {
                console.log('Заход'); // не заходит повторно при смене статуса
                const changedTodo = await updateTodo(reqURL.query.id, reqURL.query.title, reqURL.query.status);

                response.data = {
                    changedTodo
                }

                res.writeHead(201, {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type" : "application/json",
                    "Content-Lenght" : Buffer.byteLength(JSON.stringify(response))
                });
                res.write(JSON.stringify(response));
                res.end();
                return;
            } else if(method === 'DELETE') {
                console.log('зашел');
                const deletedTodo = await removeTodo(reqURL.query.id);

                response.data = {
                    deletedTodo
                }

                res.writeHead(201, {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type" : "application/json",
                    "Content-Lenght" : Buffer.byteLength(JSON.stringify(response))
                });
                res.write(JSON.stringify(response));
                res.end();
                return;
            }
        }catch(err) {
            response.error = {
                massage : "500 Server Error"
            }

            res.writeHead(500, {
                "Content-Type" : "application/json",
                "Content-Lenght" : Buffer.byteLength(JSON.stringify(response))
             });
             res.write(JSON.stringify(response));
             res.end();
             return;
        }
    }

    response.error = {
        massage : "404 Not Found"
    }

    res.writeHead(404, {
        "Content-Type" : "application/json",
        "Content-Length" : Buffer.byteLength(JSON.stringify(response))
    });
    res.write(JSON.stringify(response));
    res.end();
})

server.listen(3001, () => {
    console.log("Server is running on the port 3001");
})
