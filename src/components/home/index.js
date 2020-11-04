import React, {useState} from 'react';

function Home() {
    const [repoURL, setRepoURL] = useState();

    const handleSubmit = () => {
        let holder = repoURL.substring(repoURL.indexOf("github.com/") + 11).split('/');
        window.location = "/repo/" + holder[0] + "/" + holder[1];
    };

    return (
        <>
            <div className={'card small-cards m-5 d-flex rounded-0'}>
                <div className={'card small-cards m-5 h-100 flex-grow-1 rounded-0 border-0'}>
                    <h1 className="pt-0 text-center">GitHub Tracker</h1>
                    <form onSubmit={e => e.preventDefault()}>
                        <div className="form-group">
                            <label className="control-label">Repo URL</label>
                            <div className="form-group">
                                <div className="input-group mb-3">
                                    <input type="text" value={repoURL}
                                           placeholder={'https://github.com/walmartlabs/thorax/'}
                                           onChange={e => setRepoURL(e.target.value)} className="form-control"/>
                                </div>
                                <button type="submit"
                                        onClick={handleSubmit}
                                        className="btn btn-outline-info btn-lg btn-block">Search
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Home;