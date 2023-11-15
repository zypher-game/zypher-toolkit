"use client";
// src/wallets/walletConnectors/rabbyWallet/rabbyWallet.svg
var rabbyWallet_default = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj48cGF0aCBmaWxsPSIjODY5N0ZGIiBkPSJNMjggMEgwdjI4aDI4VjBaIi8+PHBhdGggZmlsbD0idXJsKCNiKSIgZD0iTTIyLjU0IDE1LjA3OGMuNjc3LTEuNTE0LTIuNjczLTUuNzQ0LTUuODc0LTcuNTA2LTIuMDE3LTEuMzY1LTQuMTItMS4xNzgtNC41NDUtLjU3OS0uOTM1IDEuMzE2IDMuMDk0IDIuNDMgNS43ODggMy43MzEtLjU4LjI1Mi0xLjEyNS43MDMtMS40NDYgMS4yOC0xLjAwNC0xLjA5Ni0zLjIwOS0yLjA0LTUuNzk2LTEuMjgtMS43NDMuNTEzLTMuMTkxIDEuNzIxLTMuNzUxIDMuNTQ2YTEuMDk3IDEuMDk3IDAgMSAwLS40NDUgMi4xYy4xMTIgMCAuNDYzLS4wNzUuNDYzLS4wNzVsNS42MTIuMDQxYy0yLjI0NCAzLjU2LTQuMDE4IDQuMDgxLTQuMDE4IDQuNjk4czEuNjk3LjQ1IDIuMzM1LjIyYzMuMDUtMS4xIDYuMzI3LTQuNTMxIDYuODktNS41MTkgMi4zNi4yOTUgNC4zNDUuMzMgNC43ODYtLjY1N1oiLz48cGF0aCBmaWxsPSJ1cmwoI2MpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0xNy44ODUgMTAuNzEzLjAyNS4wMWMuMTI1LS4wNDkuMTA1LS4yMzMuMDctLjM3OC0uMDc4LS4zMzMtMS40MzgtMS42NzYtMi43MTUtMi4yNzctMS43NDMtLjgyLTMuMDI1LS43NzctMy4yMTItLjM5OC4zNTYuNzI2IDEuOTk4IDEuNDA4IDMuNzE0IDIuMTIuNzIzLjMgMS40Ni42MDYgMi4xMTguOTIzWiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZmlsbD0idXJsKCNkKSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTUuNzAxIDE4LjAzNmExMC4yOTYgMTAuMjk2IDAgMCAwLTEuMi0uMzdjLjQ4Mi0uODYyLjU4My0yLjEzOC4xMjgtMi45NDUtLjYzOS0xLjEzMy0xLjQ0LTEuNzM2LTMuMzA0LTEuNzM2LTEuMDI0IDAtMy43ODMuMzQ2LTMuODMyIDIuNjQ4LS4wMDUuMjQyIDAgLjQ2NC4wMTcuNjY3bDUuMDM2LjAzN2ExNy4yNjQgMTcuMjY0IDAgMCAxLTEuODcxIDIuNDgzYy42NjkuMTcyIDEuMjIxLjMxNiAxLjcyOC40NDguNDguMTI1LjkyLjI0IDEuMzguMzU3YTIxLjAwMyAyMS4wMDMgMCAwIDAgMS45MTgtMS41OVoiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGZpbGw9InVybCgjZSkiIGQ9Ik02Ljg0OCAxNi4wNjNjLjIwNiAxLjc1IDEuMiAyLjQzNSAzLjIzMiAyLjYzOCAyLjAzMi4yMDMgMy4xOTcuMDY3IDQuNzQ5LjIwOCAxLjI5Ni4xMTggMi40NTMuNzc4IDIuODgyLjU1LjM4Ni0uMjA1LjE3LS45NDctLjM0Ny0xLjQyMy0uNjctLjYxNy0xLjU5Ny0xLjA0Ni0zLjIyOS0xLjE5OS4zMjUtLjg5LjIzNC0yLjEzOC0uMjctMi44MTctLjczMS0uOTgyLTIuMDc5LTEuNDI2LTMuNzg1LTEuMjMyLTEuNzgyLjIwMi0zLjQ5IDEuMDgtMy4yMzIgMy4yNzVaIi8+PC9nPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDE9IjEwLjQ2NCIgeDI9IjIyLjM5NCIgeTE9IjEzLjczNyIgeTI9IjE3LjEyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJjIiB4MT0iMjAuMzg2IiB4Mj0iMTEuNzc5IiB5MT0iMTMuNTA5IiB5Mj0iNC44NzkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjNzI1OERDIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzk3REVBIiBzdG9wLW9wYWNpdHk9IjAiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZCIgeDE9IjE1Ljk0IiB4Mj0iNy42NzMiIHkxPSIxOC4zMzciIHkyPSIxMy41ODQiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjNzQ2MUVBIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjQkZDMkZGIiBzdG9wLW9wYWNpdHk9IjAiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZSIgeDE9IjExLjE3NyIgeDI9IjE2Ljc2NSIgeTE9IjEzLjY0OCIgeTI9IjIwLjc0OSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNmZmYiLz48c3RvcCBvZmZzZXQ9Ii45ODQiIHN0b3AtY29sb3I9IiNENUNFRkYiLz48L2xpbmVhckdyYWRpZW50PjxjbGlwUGF0aCBpZD0iYSI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGgyOHYyOEgweiIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg==";
export {
  rabbyWallet_default as default
};
