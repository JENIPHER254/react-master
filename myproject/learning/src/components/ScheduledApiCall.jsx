import { useEffect, useMemo, useState } from 'react';

// React component that schedules an API request when a target clock time is reached.
export default function ScheduledApiCall() {
    const [targetTime, setTargetTime] = useState('23:59');
    const [endpoint, setEndpoint] = useState('https://jsonplaceholder.typicode.com/posts/1');
    const [hasExecuted, setHasExecuted] = useState(false);
    const [status, setStatus] = useState('waiting');
    const [requestInfo, setRequestInfo] = useState(null);
    const [responseInfo, setResponseInfo] = useState(null);
    const [error, setError] = useState(null);
    const [clock, setClock] = useState(new Date());

    // Compute the next scheduled run based on the current time and the entered target time.
    const nextRun = useMemo(() => {
        const [hours, minutes] = targetTime.split(':').map(Number);
        const now = new Date();
        const next = new Date(now);
        next.setHours(hours, minutes, 0, 0);

        if (next <= now) {
            // If the target time has already passed today, schedule for tomorrow.
            next.setDate(next.getDate() + 1);
        }

        return next;
    }, [targetTime]);

    useEffect(() => {
        // Update the visible clock every second.
        const interval = setInterval(() => {
            setClock(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (hasExecuted) {
            return;
        }

        const now = new Date();
        const delay = nextRun.getTime() - now.getTime();

        if (delay <= 0) {
            executeScheduledRequest();
            return;
        }

        // Schedule the API call once the target time is reached.
        const timeoutId = window.setTimeout(() => {
            executeScheduledRequest();
        }, delay);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [nextRun, hasExecuted]);

    async function executeScheduledRequest() {
        setStatus('sending');
        setError(null);

        const requestPayload = {
            method: 'GET',
            url: endpoint,
            headers: {
                Accept: 'application/json',
            },
        };

        setRequestInfo(requestPayload);

        try {
            const response = await fetch(requestPayload.url, {
                method: requestPayload.method,
                headers: requestPayload.headers,
            });

            const responseBody = await response.json();
            const responseDetails = {
                status: response.status,
                ok: response.ok,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries()),
                body: responseBody,
            };

            setResponseInfo(responseDetails);
            setHasExecuted(true);

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            setStatus('completed');
        } catch (fetchError) {
            setError(fetchError.message || 'Scheduled request failed');
            setStatus('failed');
        }
    }

    function formatJson(value) {
        return JSON.stringify(value, null, 2);
    }

    function resetSchedule() {
        setHasExecuted(false);
        setStatus('waiting');
        setRequestInfo(null);
        setResponseInfo(null);
        setError(null);
    }

    return (
        <section className="container my-4">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Scheduled API Call</h2>
                    <p className="card-text">
                        This component waits until the configured clock time and then calls the endpoint automatically.
                    </p>

                    <div className="mb-3">
                        <label className="form-label">Current Time</label>
                        <div>{clock.toLocaleTimeString()}</div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Target Time</label>
                        <input
                            className="form-control"
                            type="time"
                            value={targetTime}
                            onChange={(event) => setTargetTime(event.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Endpoint URL</label>
                        <input
                            className="form-control"
                            type="url"
                            value={endpoint}
                            onChange={(event) => setEndpoint(event.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <strong>Next scheduled run:</strong> {nextRun.toLocaleString()}
                    </div>

                    <div className="mb-3">
                        <strong>Status:</strong> {status}
                    </div>

                    {error && <div className="alert alert-danger">Error: {error}</div>}

                    {requestInfo && (
                        <div className="mb-3">
                            <strong>Request</strong>
                            <pre className="bg-light p-2">{formatJson(requestInfo)}</pre>
                        </div>
                    )}

                    {responseInfo && (
                        <div className="mb-3">
                            <strong>Response</strong>
                            <pre className="bg-light p-2">{formatJson(responseInfo)}</pre>
                        </div>
                    )}

                    <button className="btn btn-secondary" onClick={resetSchedule}>
                        Reset Schedule
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ScheduledApiCall;
