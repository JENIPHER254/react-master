# Scheduled API Calls in JavaScript

A scheduled API call is when your application waits until a specific time or interval before sending a request. In a browser, this is usually done with timers like `setTimeout` or `setInterval`.

## Use cases

- trigger a request at a certain clock time
- poll an endpoint every few seconds
- refresh data automatically
- run a task after a delay

## Browser scheduling basics

### `setTimeout`

Use `setTimeout()` to run code once after a delay:

```js
setTimeout(() => {
  // send API request
}, 1000);
```

### `setInterval`

Use `setInterval()` to run code repeatedly:

```js
setInterval(() => {
  // send API request repeatedly
}, 60000);
```

## Scheduling an endpoint at a target time

Use the current clock and the desired target time to compute the next execution timestamp.

### Example algorithm

1. Parse the target time string (`HH:mm`).
2. Build a `Date` object for today at that time.
3. If the time has already passed, schedule for tomorrow.
4. Compute `delay = targetTime - now`.
5. Call `setTimeout()` with that delay.
6. When the callback runs, execute the API request.

```js
const now = new Date();
const target = new Date(now);
target.setHours(hours, minutes, 0, 0);
if (target <= now) {
  target.setDate(target.getDate() + 1);
}
const delay = target.getTime() - now.getTime();
setTimeout(sendRequest, delay);
```

## Example: scheduled GET request

```js
async function sendRequest() {
  const response = await fetch('https://api.example.com/data', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  const data = await response.json();
  console.log(data);
}
```

## Request and response details

Keep the request metadata handy for debugging:

```js
const requestInfo = {
  method: 'GET',
  url: apiUrl,
  headers: {
    Accept: 'application/json',
  },
};
```

Capture the response details:

```js
const responseInfo = {
  status: response.status,
  ok: response.ok,
  statusText: response.statusText,
  body: await response.json(),
};
```

## Important advice for scheduling in the frontend

- Browser timers can be paused when the tab is inactive or the device sleeps.
- For critical timed tasks, use a server-side scheduler or background worker.
- Recompute the next execution time after every page load.
- Use `setTimeout()` for one-time scheduling and `setInterval()` for repeated polling.
- If the scheduled delay is very large, break it into smaller chunks or check periodically.
- Always validate the target time and handle invalid input.
- Use `Date` comparisons in local time or convert UTC values if needed.

## When to use a server instead of frontend scheduling

Frontend scheduling is fine for simple reminders or UI refreshes, but not ideal for critical jobs.

Use a server-side scheduler when:

- the app must run even if the browser is closed
- exact timing is required
- many users need coordinated timing
- you need retries for failures

## Summary

A scheduled API call in the browser requires:

- parsing the target time
- computing the next run timestamp
- using `setTimeout()` or `setInterval()`
- sending the request with headers and reading the response
- handling browser timer limitations

For robust time-based behavior, combine frontend scheduling with backend support when necessary.
