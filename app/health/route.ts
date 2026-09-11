// Container healthcheck target. Docker probes http://127.0.0.1/health — not
// localhost: Node binds IPv4-only and BusyBox wget tries ::1 first, which makes
// a perfectly healthy container report "unhealthy".
export const dynamic = "force-dynamic";

export function GET() {
  return new Response("ok", {
    headers: { "Content-Type": "text/plain" },
  });
}
