export default function RulesPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-8 text-3xl font-bold">Rules</h1>

      <div className="space-y-6 text-(--color-light-50)">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-(--color-light)">
            Team Formation
          </h2>
          <ul className="list-inside list-disc space-y-2">
            <li>Teams consist of 2-4 members.</li>
            <li>You must be on a team to participate.</li>
            <li>Team owners can invite members and manage the team.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-(--color-light)">
            Project Requirements
          </h2>
          <ul className="list-inside list-disc space-y-2">
            <li>All code must be written during the hackathon.</li>
            <li>You may use open-source libraries and frameworks.</li>
            <li>Projects must be submitted before the deadline.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-(--color-light)">
            Code of Conduct
          </h2>
          <p>
            All participants must follow the{" "}
            <a
              href="https://compsigh.club/docs/code-of-conduct"
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--color-compsigh) hover:underline"
            >
              compsigh Code of Conduct
            </a>
            . Be respectful, inclusive, and have fun!
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-(--color-light)">
            Judging
          </h2>
          <ul className="list-inside list-disc space-y-2">
            <li>Projects will be judged on creativity, technical complexity, and presentation.</li>
            <li>Each team will have a short demo period to present their project.</li>
            <li>Judges&apos; decisions are final.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
