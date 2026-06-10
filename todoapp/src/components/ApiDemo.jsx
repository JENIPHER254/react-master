import { useEffect, useState } from 'react';

export default function ApiDemo() {
    const [users, setUsers] = useState([]);
    const [getLoading, setGetLoading] = useState(true);
    const [getError, setGetError] = useState(null);
    const [getResponseInfo, setGetResponseInfo] = useState(null);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [postLoading, setPostLoading] = useState(false);
    const [postError, setPostError] = useState(null);
    const [postResponseInfo, setPostResponseInfo] = useState(null);
    const [createdPost, setCreatedPost] = useState(null);

    useEffect(() => {
        async function fetchUsers() {
            const requestInfo = {
                method: 'GET',
                url: 'https://jsonplaceholder.typicode.com/users',
                headers: {
                    Accept: 'application/json',
                },
            };

            try {
                setGetLoading(true);
                setGetError(null);
                setGetResponseInfo(null);

                const response = await fetch(requestInfo.url, {
                    method: requestInfo.method,
                    headers: requestInfo.headers,
                });

                const responseBody = await response.json();

                setGetResponseInfo({
                    request: requestInfo,
                    status: response.status,
                    ok: response.ok,
                    statusText: response.statusText,
                    responseSample: Array.isArray(responseBody) ? responseBody.slice(0, 2) : responseBody,
                });

                if (!response.ok) {
                    throw new Error('Unable to load users from the API.');
                }

                setUsers(responseBody.slice(0, 5));
            } catch (fetchError) {
                setGetError(fetchError.message || 'Fetch error');
            } finally {
                setGetLoading(false);
            }
        }

        fetchUsers();
    }, []);

    async function handleCreatePost(event) {
        event.preventDefault();

        const requestInfo = {
            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/posts',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: {
                title,
                body,
                userId: 1,
            },
        };

        try {
            setPostLoading(true);
            setPostError(null);
            setPostResponseInfo(null);

            const response = await fetch(requestInfo.url, {
                method: requestInfo.method,
                headers: requestInfo.headers,
                body: JSON.stringify(requestInfo.body),
            });

            const responseData = await response.json();

            setPostResponseInfo({
                request: requestInfo,
                status: response.status,
                ok: response.ok,
                statusText: response.statusText,
                responseData,
            });

            if (!response.ok) {
                throw new Error('Unable to send post data.');
            }

            setCreatedPost(responseData);
            setTitle('');
            setBody('');
        } catch (fetchError) {
            setPostError(fetchError.message || 'Fetch error');
        } finally {
            setPostLoading(false);
        }
    }

    return (
        <section className="container my-4">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">API Endpoint Demo</h2>
                    <p className="card-text">
                        This component demonstrates a GET request to fetch users and a POST request to create a new post. Both include headers and show request/response details.
                    </p>

                    <div className="mb-4">
                        <h3>GET example: users</h3>
                        {getLoading && <div className="alert alert-info">Loading users...</div>}
                        {getError && <div className="alert alert-danger">Error: {getError}</div>}

                        {getResponseInfo && (
                            <div className="mb-3">
                                <strong>Request</strong>
                                <pre className="bg-light p-2">
                                    {JSON.stringify(getResponseInfo.request, null, 2)}
                                </pre>
                                <strong>Response</strong>
                                <pre className="bg-light p-2">
                                    {`status: ${getResponseInfo.status} ${getResponseInfo.statusText}
ok: ${getResponseInfo.ok}`}
                                </pre>
                            </div>
                        )}

                        {!getLoading && !getError && (
                            <ul className="list-group">
                                {users.map((user) => (
                                    <li key={user.id} className="list-group-item">
                                        <strong>{user.name}</strong> ({user.email})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div>
                        <h3>POST example: submit a post</h3>
                        <form onSubmit={handleCreatePost}>
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Body</label>
                                <textarea
                                    className="form-control"
                                    rows={3}
                                    value={body}
                                    onChange={(event) => setBody(event.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={postLoading}>
                                {postLoading ? 'Sending...' : 'Send Post'}
                            </button>
                        </form>

                        {postError && <div className="alert alert-danger mt-3">Error: {postError}</div>}

                        {postResponseInfo && (
                            <div className="mt-3">
                                <strong>Request</strong>
                                <pre className="bg-light p-2">
                                    {JSON.stringify(postResponseInfo.request, null, 2)}
                                </pre>
                                <strong>Response</strong>
                                <pre className="bg-light p-2">{JSON.stringify(postResponseInfo.responseData, null, 2)}</pre>
                            </div>
                        )}

                        {createdPost && (
                            <div className="alert alert-success mt-3">
                                Post created with ID {createdPost.id}.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
