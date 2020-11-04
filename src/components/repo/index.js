import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios';
import Table from "../table";

function Repo() {
    const {accountName, repoName} = useParams();
    const [table, setTable] = useState([]);

    useEffect(() => {
        axios.get("https://api.github.com/repos/" + accountName + "/" + repoName + "/issues?state=all")
            .then(function (response) {
                let tableHold = [];
                response.data.forEach((issue) => {
                    tableHold.push(
                        {issueID: issue.number, title: issue.title, state: issue.state}
                    );
                });
                setTable(tableHold);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [accountName, repoName]);

    return (
        <>
            <div className={'card small-cards m-5 h-100 flex-grow-1 rounded-0'}>
                <div className={'card small-cards m-5 h-100 flex-grow-1 rounded-0 border-0'}>
                    <Table data={table}/>
                </div>
            </div>
        </>
    );
}

export default Repo;