---
slug: event-loop
title: Event Loop
order: 3
featured: false
draft: false

thumbnail:
  src: /projects/event-loop/event-loop.webp
  alt: Event Loop visualizer — an interactive diagram showing the JavaScript call stack, task queue, and microtask queue
hero:
  src: /projects/event-loop/event-loop.webp
  alt: Event Loop visualizer — an interactive diagram showing the JavaScript call stack, task queue, and microtask queue
gallery: []

techStack:
  - HTML
  - JavaScript
  - Tailwind

blurb: A minimal interactive visualization of the JavaScript event loop — watch the call stack, queues and tasks hand off in real time.

lead: A browser-native tool for watching the **JavaScript event loop** work. Submit different request types and see exactly how the **call stack, microtask queue, and task queue** interact — no framework, just HTML, JavaScript, and Tailwind.

metaDescription: Interactive JavaScript event loop visualizer — watch call stack, task queue, and microtask queue step through in real time. Built with HTML, JavaScript, and Tailwind.

highlights:
  - "**Live step-through** of the event loop — each dispatch shows the call stack draining and tasks queuing in order."
  - "Covers both **macrotasks and microtasks**, making the priority difference concrete and observable."
  - "Built with **zero framework overhead** — plain HTML, vanilla JavaScript, and Tailwind for layout."

role: Solo build · design + development
year: "2021"

liveUrl: https://personal-projects.netlify.app/eventLoop
repoUrl: https://github.com/manishekaneja
---

The JavaScript event loop is one of those things that's easy to describe but hard to fully internalise from a diagram alone. This tool was built to make it interactive — you submit different types of requests and watch in real time as the call stack empties, microtasks flush, and macrotasks queue up behind them.

It's a minimal build — no frameworks, just **HTML, JavaScript, and Tailwind**. The point was to make the mechanics of async execution something you can observe and replay, not just read about.
