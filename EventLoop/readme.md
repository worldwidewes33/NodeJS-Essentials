# Blocking vs Non-Blocking

Benchmarked synchronous file reads vs asynchronous file reads to test event loop delays. Experimented with libuv event thread pool size to see if the that was a bottleneck for the asynchronous code. The results did not show much difference. Here are the results:
| Metric (20 s, ‑c 100) | **Blocking (sync `readFileSync`)** | **Async (`Promise.all` + `UV_THREADPOOL_SIZE=32`)** | Δ / Notes |
|-----------------------|------------------------------------|-----------------------------------------------|-----------|
| **Avg Req/sec** | 397 req/s | 395 req/s | ≈ same |
| **Avg latency** | 240 ms | 251 ms | + 11 ms (noise) |
| **p95 latency** | 310 ms | 267 ms | **‑ 14 %** |
| **p99 latency** | 314 ms | 267 ms | **‑ 15 %** |
| **Max latency** | **9 955 ms** | **280 ms** | **‑ 35×** |

My main take away is the bounded nature of Max latency and that is really observed in the event loop delay graphs.
