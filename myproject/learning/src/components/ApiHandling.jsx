import { useEffect, useState } from 'react';

function ApiHandling() {
    // State for GET users request
    const [users, setUsers] = useState([]);
    const [getLoading, setGetLoading] = useState(false);
    const [getError, setGetError] = useState(null);
    const [getInfo, setGetInfo] = useState(null);

    // State for POST create post request
    const [postTitle, setPostTitle] = useState('My new post');
    const [postBody, setPostBody] = useState('This is the body of the post.');
    const [postLoading, setPostLoading] = useState(false);
    const [postError, setPostError] = useState(null);
    const [postInfo, setPostInfo] = useState(null);

    // State for PUT update post request
    const [putId, setPutId] = useState(1);
    const [putTitle, setPutTitle] = useState('Updated title');
    const [putBody, setPutBody] = useState('Updated body content.');
    const [putLoading, setPutLoading] = useState(false);
    const [putError, setPutError] = useState(null);
    const [putInfo, setPutInfo] = useState(null);

    // State for DELETE post request
    const [deleteId, setDeleteId] = useState(1);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState(null);
    const [deleteInfo, setDeleteInfo] = useState(null);

    // Load users once when the component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    // Helper to format JSON for display in the UI
    function formatJson(value) {
        return JSON.stringify(value, null, 2);
    }

    // GET request example: fetch a list of users
    async function fetchUsers() {
        const requestInfo = {
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/users',
            headers: {
                Accept: 'application/json',
            },
        };

        setGetLoading(true);
        setGetError(null);
        setGetInfo(null);

        try {
            const response = await fetch(requestInfo.url, {
                method: requestInfo.method,
                headers: requestInfo.headers,
            });

            const responseBody = await response.json();
            const responseInfo = {
                status: response.status,
                ok: response.ok,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries()),
                body: responseBody.slice(0, 5),
            };

            setGetInfo({ request: requestInfo, response: responseInfo });

            if (!response.ok) {
                throw new Error(`GET request failed with status ${response.status}`);
            }

            // Save the first 5 users for display
            setUsers(responseBody.slice(0, 5));
        } catch (error) {
            setGetError(error.message);
        } finally {
            setGetLoading(false);
        }
    }

    // POST request example: create a new post with JSON body
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
                title: postTitle,
                body: postBody,
                userId: 1,
            },
        };

        setPostLoading(true);
        setPostError(null);
        setPostInfo(null);

        try {
            const response = await fetch(requestInfo.url, {
                method: requestInfo.method,
                headers: requestInfo.headers,
                body: JSON.stringify(requestInfo.body),
            });

            const responseBody = await response.json();
            const responseInfo = {
                status: response.status,
                ok: response.ok,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries()),
                body: responseBody,
            };

            setPostInfo({ request: requestInfo, response: responseInfo });

            if (!response.ok) {
                throw new Error(`POST request failed with status ${response.status}`);
            }
        } catch (error) {
            setPostError(error.message);
        } finally {
            setPostLoading(false);
        }
    }

    // PUT request example: update an existing post using a full payload
    async function handleUpdatePost(event) {
        event.preventDefault();

        const requestInfo = {
            method: 'PUT',
            url: `https://jsonplaceholder.typicode.com/posts/${putId}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: {
                id: putId,
                title: putTitle,
                body: putBody,
                userId: 1,
            },
        };

        setPutLoading(true);
        setPutError(null);
        setPutInfo(null);

        try {
            const response = await fetch(requestInfo.url, {
                method: requestInfo.method,
                headers: requestInfo.headers,
                body: JSON.stringify(requestInfo.body),
            });

            const responseBody = await response.json();
            const responseInfo = {
                status: response.status,
                ok: response.ok,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries()),
                body: responseBody,
            };

            setPutInfo({ request: requestInfo, response: responseInfo });

            if (!response.ok) {
                throw new Error(`PUT request failed with status ${response.status}`);
            }
        } catch (error) {
            setPutError(error.message);
        } finally {
            setPutLoading(false);
        }
    }

    // DELETE request example: remove a post by id
    async function handleDeletePost() {
        const requestInfo = {
            method: 'DELETE',
            url: `https://jsonplaceholder.typicode.com/posts/${deleteId}`,
            headers: {
                Accept: 'application/json',
            },
        };

        setDeleteLoading(true);
        setDeleteError(null);
        setDeleteInfo(null);

        try {
            const response = await fetch(requestInfo.url, {
                method: requestInfo.method,
                headers: requestInfo.headers,
            });

            const responseBody = await response.text();
            const responseInfo = {
                status: response.status,
                ok: response.ok,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries()),
                body: responseBody || null,
            };

            setDeleteInfo({ request: requestInfo, response: responseInfo });

            if (!response.ok) {
                throw new Error(`DELETE request failed with status ${response.status}`);
            }
        } catch (error) {
            setDeleteError(error.message);
        } finally {
            setDeleteLoading(false);
        }
    }

    return (
        <section className="container my-4">
            <div className="card mb-4">
                <div className="card-body">
                    <h2 className="card-title">API Handling Demo</h2>
                    <p className="card-text">
                        Demonstrates GET, POST, PUT, and DELETE requests with headers, request body, and response details.
                    </p>

                    <div className="mb-4">
                        <h3>GET Users</h3>
                        {getLoading && <div className="alert alert-info">Loading users...</div>}
                        {getError && <div className="alert alert-danger">Error: {getError}</div>}

                        {getInfo && (
                            <div className="mb-3">
                                <strong>Request</strong>
                                <pre className="bg-light p-2">{formatJson(getInfo.request)}</pre>
                                <strong>Response</strong>
                                <pre className="bg-light p-2">{formatJson(getInfo.response)}</pre>
                            </div>
                        )}

                        {users.length > 0 && (
                            <ul className="list-group">
                                {users.map((user) => (
                                    <li key={user.id} className="list-group-item">
                                        <strong>{user.name}</strong> — {user.email}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="mb-4">
                        <h3>POST Create Post</h3>
                        {/* POST form sends JSON body to create a new resource */}
                        <form onSubmit={handleCreatePost}>
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={postTitle}
                                    onChange={(event) => setPostTitle(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Body</label>
                                <textarea
                                    className="form-control"
                                    rows={3}
                                    value={postBody}
                                    onChange={(event) => setPostBody(event.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success" disabled={postLoading}>
                                {postLoading ? 'Sending...' : 'Send POST'}
                            </button>
                        </form>
                        {postError && <div className="alert alert-danger mt-3">Error: {postError}</div>}
                        {postInfo && (
                            <div className="mt-3">
                                <strong>Request</strong>
                                <pre className="bg-light p-2">{formatJson(postInfo.request)}</pre>
                                <strong>Response</strong>
                                <pre className="bg-light p-2">{formatJson(postInfo.response)}</pre>
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <h3>PUT Update Post</h3>
                        {/* PUT form updates an existing resource using its ID */}
                        <form onSubmit={handleUpdatePost}>
                            <div className="row g-3">
                                <div className="col-md-2">
                                    <label className="form-label">Post ID</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={putId}
                                        min={1}
                                        onChange={(event) => setPutId(Number(event.target.value))}
                                        required
                                    />
                                </div>
                                <div className="col-md-5">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={putTitle}
                                        onChange={(event) => setPutTitle(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-md-5">
                                    <label className="form-label">Body</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={putBody}
                                        onChange={(event) => setPutBody(event.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary mt-3" disabled={putLoading}>
                                {putLoading ? 'Updating...' : 'Send PUT'}
                            </button>
                        </form>
                        {putError && <div className="alert alert-danger mt-3">Error: {putError}</div>}
                        {putInfo && (
                            <div className="mt-3">
                                <strong>Request</strong>
                                <pre className="bg-light p-2">{formatJson(putInfo.request)}</pre>
                                <strong>Response</strong>
                                <pre className="bg-light p-2">{formatJson(putInfo.response)}</pre>
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <h3>DELETE Post</h3>
                        {/* DELETE button removes the specified resource by ID */}
                        <div className="row g-3 align-items-end">
                            <div className="col-md-3">
                                <label className="form-label">Post ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={deleteId}
                                    min={1}
                                    onChange={(event) => setDeleteId(Number(event.target.value))}
                                />
                            </div>
                            <div className="col-md-3">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDeletePost}
                                    disabled={deleteLoading}
                                >
                                    {deleteLoading ? 'Deleting...' : 'Send DELETE'}
                                </button>
                            </div>
                        </div>
                        {deleteError && <div className="alert alert-danger mt-3">Error: {deleteError}</div>}
                        {deleteInfo && (
                            <div className="mt-3">
                                <strong>Request</strong>
                                <pre className="bg-light p-2">{formatJson(deleteInfo.request)}</pre>
                                <strong>Response</strong>
                                <pre className="bg-light p-2">{formatJson(deleteInfo.response)}</pre>
                            </div>
                        )}
                    </div>

                    <div className="alert alert-secondary">
                        <strong>Note:</strong> Use `GET` to read data, `POST` to create data, `PUT` to update complete resources, and `DELETE` to remove resources. Always include headers and check `response.ok` and `response.status`.
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ApiHandling;
