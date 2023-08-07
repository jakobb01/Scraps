import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import scraperImage from './assets/scraper_trans.png';
import axios from 'axios';

function App() {
    const [webpageUrl, setWebpageUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (event) => {
        setWebpageUrl(event.target.value);
        setErrorMessage('');
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const domain = extractDomain(webpageUrl);
        if (!domain) {
            setErrorMessage('Invalid URL');
            return;
        }

        try {
            const response = await axios.get(`http://${domain}`);
            if (response.status === 200) {
                window.open(`http://${domain}`, '_blank');
            } else {
                setErrorMessage('Website not (responding) accessible');
            }
        } catch (error) {
            setErrorMessage('Website not accessible');
        }
    };

    const extractDomain = (url) => {
        let domain = url.trim();
        domain = domain.replace(/^(https?|ftp)?:\/\//, '');
        domain = domain.replace(/^www\./, '');

        const parts = domain.split('/');
        domain = parts[0];

        const domainParts = domain.split('.');
        const lastPart = domainParts[domainParts.length - 1];

        if (lastPart.length === 2 || lastPart.length === 3) {
            domain = domainParts.slice(-2).join('.');
        }

        console.log(domain);
        return domain;
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="text-center">
                        <img
                            className="img-fluid"
                            src={scraperImage}
                            alt="Logo"
                        />
                    </div>
                    <form onSubmit={handleFormSubmit}>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter webpage URL"
                                value={webpageUrl}
                                onChange={handleInputChange}
                            />
                            <button className="btn btn-primary" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <footer className="footer mt-4">
                        2023 - created by Jakob
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default App;
