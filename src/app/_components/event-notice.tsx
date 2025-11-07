import Link from "next/link";

export function EventNotice() {
  return (
    <div className="mb-6 rounded-lg border-2 border-(--color-compsigh) bg-(--color-compsigh)/10 p-6">
      <p className="mb-3 text-lg font-bold text-(--color-compsigh)">
        Hello participants,
      </p>
      <p className="mb-4 text-lg text-(--color-light)">
        We're so excited for today! Here's what you need to know:
      </p>
      <div className="mb-4 space-y-2 text-lg text-(--color-light)">
        <p>
          <strong className="font-bold text-(--color-compsigh)">Location:</strong>{" "}
          <Link
            href="https://maps.app.goo.gl/oeDj8apwmQZbQB4G7"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-(--color-compsigh) underline [text-shadow:0_0_10px_var(--color-compsigh-60)] hover:decoration-(--color-compsigh)"
          >
            Fromm Hall
          </Link>
        </p>
        <p>
          <strong className="font-bold text-(--color-compsigh)">Time:</strong>{" "}
          <span className="font-semibold">6pm</span>
        </p>
        <p>
          <strong className="font-bold text-(--color-compsigh)">Bring:</strong>{" "}
          Your laptop and chargers
        </p>
        <p>
          <strong className="font-bold text-(--color-compsigh)">Dinner:</strong>{" "}
          We'll provide{" "}
          <Link
            href="https://locations.ikessandwich.com/ca/san-francisco/122/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-(--color-compsigh) underline [text-shadow:0_0_10px_var(--color-compsigh-60)] hover:decoration-(--color-compsigh)"
          >
            Ike's Sandwiches
          </Link>{" "}
          (vegetarian options available)
        </p>
      </div>
      <p className="text-lg text-(--color-light)">
        See you soon,
        <br />
        <span className="font-tronica-mono text-(--color-compsigh) [text-shadow:0_0_10px_var(--color-compsigh-60)]">compsigh</span>
      </p>
    </div>
  );
}

