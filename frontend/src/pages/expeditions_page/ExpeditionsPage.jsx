import React from 'react';
import style from './ExpeditionsPage.module.css';
import { useState, useEffect } from 'react';
import { getExpeditionsList, 
            postNewExpedition, 
            updateExpedition, 
            deleteExpeditionFromData } from '../../lib/request';
import ModalWindow from '../../components/modal_window/ModalWindow';
import Expedition from '../../components/expedition/Expedition';
import HorizontalForm from '../../components/horizontal_form/HorizontalForm';
import VerticalForm from '../../components/vertical_form/VerticalForm';

export default function ExpeditionsPage() {
    const [expeditions, setExpeditions] = useState([]);
    const [id, setId] = useState(null);
    const [action, setAction] = useState('getData');
    const [newTitle, setNewTitle] = useState('');
    const [redactedTitle, setRedactedTitle] = useState('');
    const [modalWindow, setModalWindow] = useState(false);

    useEffect(() => {
        if(action === 'getData') {
            setAction(null);
            getExpeditionsList().then(arr => {
                arr.map(el => {
                    el.status = JSON.parse(el.status); // из "false" в boolean false
                    return el;
                })
                setExpeditions(arr);
            }).catch(err => console.log(err));
        }else if(action === 'createExpedition') {
            createExpedition();
        }else if(action === 'changeTitle' || action === 'changeStatus') {
            changeExpeditionInfo(action);
        }else if (action === 'deleteExpedition') {
            deleteExpedition();
        }
    }, [expeditions, action])

    async function createExpedition() {
        await postNewExpedition(newTitle);
        setNewTitle('');
        setAction('getData');
    }

    async function changeExpeditionInfo() {
        setAction(null);
        
        if(action === 'changeTitle') {
            if(redactedTitle) {
                expeditions.map(el => {
                    if(el.id === id) {
                        el.title = redactedTitle;
                        return el;
                    }else {
                        return el;
                    }
                })

                const expedition = expeditions.find(el => el.id === id);
                await updateExpedition(expedition);
                setRedactedTitle("");
            }
        }else {
            expeditions.map(el => {
                if(el.id === id) {
                    el.status = !el.status
                    return el;
                }else {
                    return el;
                }
            })

            const expedition = expeditions.find(el => el.id === id);
            console.log(expedition);
            await updateExpedition(expedition);
        }

        setId(null);
    }

    async function deleteExpedition() {
        setAction(null); // иначе происходит зацикленность

        const updatedExpeditions = expeditions.filter(el => el.id !== id);
        setExpeditions(updatedExpeditions);
        await deleteExpeditionFromData(id);

        setId(null);
    }

    // {"id":5,"title":"Hans Hansson","status":false}

  return (
    <div className={style.fon}>
        <div className={style.lightFon}>
            {
                modalWindow ? 
                    <ModalWindow 
                        modalWindow={modalWindow}
                        setModalWindow={setModalWindow}
                        setId={setId}
                        setRedactedTitle={setRedactedTitle}
                        setAction={setAction}
                    /> : undefined
            }
            <p className={style.headerText}>EXPEDITIONS</p>
                {
                    expeditions.length ? 
                        <div className={style.container}>
                            <div className={style.expeditionsContainer}>
                                {
                                    expeditions.map(el => 
                                        <Expedition 
                                            key={`ExpeditionID-${el.id}`} 
                                            el={el}
                                            modalWindow={modalWindow}
                                            setModalWindow={setModalWindow}
                                            setId={setId}
                                            setAction={setAction}
                                        />   
                                    )
                                }
                            </div> 
                                
                            <HorizontalForm 
                                newTitle={newTitle}
                                setNewTitle={setNewTitle}
                                setAction={setAction}
                            />
                        </div>
                    : 
                        <div className={style.createContainer}>
                            <VerticalForm 
                                setNewTitle={setNewTitle}
                                setAction={setAction}
                            />
                        </div>
                }
        </div>
    </div>
  )
}
