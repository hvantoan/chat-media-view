# Web Download Patterns Research
**Date:** 2025-12-23 | **Domain:** Browser APIs, Download Mechanics

---

## 1. AbortController for Request Cancellation

**Pattern:** Create controller → pass signal to fetch → call abort() on user action

```javascript
const controller = new AbortController();
fetch(url, { signal: controller.signal });
// Cancel when needed
controller.abort();
```

**Key Points:**
- Cleanly cancels fetch without manual timeout cleanup
- AbortError thrown on cancellation (distinguish from network errors)
- `AbortSignal.any()` combines multiple signals (user abort + timeout)
- React: cleanup in useEffect return to cancel on unmount
- Signal reusable only once; new controller per request

**Browser Support:** All modern browsers; widely adopted since 2018

---

## 2. ReadableStream Download Progress Tracking

**Pattern:** Use response.body stream to track bytes downloaded in real-time

```javascript
const response = await fetch(url);
const total = parseInt(response.headers.get('content-length'), 10);
const reader = response.body.getReader();
let loaded = 0;

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  loaded += value.length;
  updateProgress(loaded / total); // 0-1
}
```

**Key Points:**
- Get total from `content-length` header (if available)
- ReadableStream chunks available immediately without buffering
- Only supports download progress (not upload)
- Service Worker compatible for advanced patterns
- No direct support via Fetch API alone

**Limitation:** Server must send `content-length` header for accurate totals

---

## 3. Retry Pattern with Exponential Backoff

**Strategy:** Retry transient errors with increasing delays; cap max delay

```javascript
async function downloadWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetch(url);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      const delay = Math.min(1000 * Math.pow(2, i) + Math.random() * 1000, 10000);
      await new Promise(r => setTimeout(r, delay));
    }
  }
}
```

**Best Practices:**
- Retry only transient errors (5xx, 429, network timeouts)
- Add jitter: `delay + Math.random() * 1000` to avoid thundering herd
- Cap maximum backoff (e.g., 30s) to prevent excessive waits
- Don't retry 4xx errors (400, 404, 403)
- Typical backoff: 1s → 2s → 4s with cap

**Common Delays:** 1s, 2s, 4s, 8s, then cap at 10-30s

---

## 4. File Download Triggers: Blob URL vs Download Attribute

**Pattern 1: Blob + download attribute (preferred for progress)**
```javascript
const blob = await downloadStream(url); // collect bytes
const blobUrl = URL.createObjectURL(blob);
const anchor = document.createElement('a');
anchor.href = blobUrl;
anchor.download = 'filename.ext';
anchor.click();
URL.revokeObjectURL(blobUrl); // free memory immediately
```

**Pattern 2: Direct href (simpler, no progress tracking)**
```javascript
<a href="/api/download/file" download="filename.ext">Download</a>
```

**Key Points:**
- Blob URL approach: enables progress tracking, custom filename, same-origin bypass
- Memory: Revoke blob URL immediately after click or memory persists until tab close
- Large files (>RAM): Use FileSystemWritableFileStream instead (filesystem API)
- Blob URLs temporary; lost on page refresh/close
- Performance: `URL.createObjectURL()` faster than base64 data URIs

**Tradeoff:** Blob approach requires buffering entire file in memory; streaming download requires file handle API

---

## 5. Progress UI Pattern (React)

**Recommended Pattern:**
```javascript
<div>
  <ProgressBar value={percent} />
  <span>{(loaded / 1024 / 1024).toFixed(2)} MB / {(total / 1024 / 1024).toFixed(2)} MB</span>
</div>
```

**Component Options:**
- Material-UI: `<LinearProgress variant="determinate" value={percent} />`
- Semantic UI React: Built-in text value support
- HTML5: `<progress value={loaded} max={total} />`
- PrimeReact: `<ProgressBar value={percent} />`

**Display Strategy:**
- Percentage: `(loaded / total) * 100`
- Text: Format MB values for readability
- Cancel button: Call `controller.abort()` on click
- Retry button: Visible on error; restart download

---

## Implementation Checklist

- [ ] AbortController per download (cleanup on unmount)
- [ ] ReadableStream with content-length header
- [ ] Exponential backoff retry (1s, 2s, 4s, cap 10s)
- [ ] Blob + revoke URL for memory safety
- [ ] Progress bar showing MB/MB and percentage
- [ ] Cancel button tied to AbortController.abort()
- [ ] Retry button on error state
- [ ] Handle network errors separately from user cancels

---

## Unresolved Questions

1. **Resume partial downloads?** Requires Range header support and server config (not covered here)
2. **Multiple concurrent downloads?** Need request deduplication to prevent duplicate same-URL downloads
3. **Service Worker caching?** Advanced pattern for offline-first; requires separate research
