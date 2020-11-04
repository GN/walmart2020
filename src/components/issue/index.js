import React, {useEffect, useState} from 'react';
import axios from 'axios';
import moment from 'moment';
import {useParams} from "react-router-dom";

function Issue() {
    const {accountName, repoName, issueID} = useParams();
    const [issueCard, setIssueCard] = useState({});
    useEffect(() => {
        axios.get("https://api.github.com/repos/" + accountName + "/" + repoName + "/issues/" + issueID)
            .then(function (response) {
                const cardHold = {
                    state: response.data.closed_at,
                    title: response.data.title,
                    body: response.data.body,
                    createdOn: response.data.created_at,
                    updatedOn: response.data.updated_at,
                    createdBy: response.data.user.login,
                    profilePicture: response.data.user.avatar_url,
                    creatorURL: response.data.user.html_url
                };
                setIssueCard(cardHold);
                console.log(cardHold);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);


    return (
        <>
            <div
                className={'card small-cards m-5 h-100 flex-grow-1 rounded-0' + (issueCard.state == null ? ' border-success' : ' border-danger')}>
                <div className={'card small-cards m-5 h-100 flex-grow-1 rounded-0 border-0'}>
                    <div className="card-header">Issue {issueID} - {issueCard.title}</div>
                    <div className="d-flex m-0 p-0 justify-content-around">
                        <div className="d-flex flex-row">
                            <div className="d-flex flex-column p-2">
                                <div className="w-50 p-0 m-0">
                                    <a href={issueCard.creatorURL}>
                                        <img src={issueCard.profilePicture} alt="..." className="img-thumbnail"/>
                                    </a>
                                </div>
                            </div>
                            <div className="d-flex flex-column align-self-center p-2">
                                <p className="text-justify">Created By: {issueCard.createdBy}</p>
                                <p className="text-justify">Created
                                    On: {moment(issueCard.createdOn).format('MM-DD-YYYY')}</p>
                                <p className="text-justify">Updated
                                    On: {moment(issueCard.updatedOn).format('MM-DD-YYYY')}</p>
                                <p className="text-justify">Created
                                    On: {moment(issueCard.createdOn).format('MM-DD-YYYY')}</p>
                            </div>
                        </div>

                    </div>
                    <div className="d-flex m-0 p-0 justify-content-around">
                        <div className="d-flex flex-row">
                            <div className="d-flex flex-column p-2">
                                <div className="card small-cards m-5 h-100 flex-grow-1 rounded-0">
                                    <div className="card-header">Description</div>
                                    <div className="card-body">
                                        <p className="card-text">{issueCard.body}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Issue;