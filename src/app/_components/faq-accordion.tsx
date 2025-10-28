"use client";

import * as React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const faqData: FAQItem[] = [
  {
    id: "eligibility",
    question: "Who can participate?",
    answer: (
      <>
        <p>USF students of all grades and majors can participate.</p>
        <p>
          You can form teams of 1–4 members. All team members must be on stage
          on presentation day to be eligible to win.
        </p>
      </>
    ),
  },
  {
    id: "presentations",
    question: "How do presentations work?",
    answer: (
      <>
        <p>
          Each team presents for 5 minutes, followed by 2 minutes of questions
          from judges and 2 minutes of questions from the audience.
        </p>
        <p>
          You can spend your presentation time however you see fit, and we
          highly encourage creative presentation formats!
        </p>
        <p>
          Make sure to clearly articulate each team member&apos;s role in
          bringing the project to life.
        </p>
      </>
    ),
  },
  {
    id: "winning",
    question: "How do we win?",
    answer: (
      <>
        <p>
          Teams can win People&apos;s Choice, 3rd Place, 2nd Place, or 1st
          Place.
        </p>
        <p>People's Choice is determined by audience vote.</p>
        <p>
          The top 3 teams are decided by a panel of judges who score out of 10
          points. Additional bonus points will be awarded based on criteria
          announced closer to the event date.
        </p>
      </>
    ),
  },
  {
    id: "prizes",
    question: "What are the prizes?",
    answer: (
      <p>
        Specific prize details will be announced closer to the event date.
      </p>
    ),
  },
  {
    id: "submissions",
    question: "What can we build?",
    answer: (
      <>
        <p>
          You can build whatever you like — there&apos;s no theme restriction!
          Common formats include mobile apps, desktop apps, web apps, websites,
          games, hardware projects, open source contributions, and more.
        </p>
        <p>
          Important: Do not start actively building your project (brainstorming
          is fine) until after the Opening Keynote on Friday.
        </p>
        <p>
          Before presenting, ensure your project is open-source or otherwise
          publicly accessible.
        </p>
        <p>
          Submissions don&apos;t have to be complete. Share what worked, what
          didn&apos;t, and how you would continue developing the project.
        </p>
      </>
    ),
  },
  {
    id: "registration",
    question: "What are the important deadlines?",
    answer: (
      <>
        <p>Registration deadline: November 07, 09:00pm</p>
        <p>Team formation deadline: November 07, 11:59pm</p>
        <p>Project submission deadline: November 9, 12:00pm (noon)</p>
        <p>
          You can form teams of 1–4 people. Register as an individual and find
          teammates at the event, or come with a pre-formed team.
        </p>
        <p>
          All team members must be present for the final presentation to be
          eligible for prizes.
        </p>
        <p>
          We&apos;ll have team formation activities during the opening event to
          help you connect with other participants!
        </p>
      </>
    ),
  },
  {
    id: "places-to-work",
    question: "Where can I work with my team?",
    answer: (
      <p>
        You can work anywhere — cafes, classrooms, conference rooms, dorms,
        apartments, parks, etc. Working in person is important!
      </p>
    ),
  },
  {
    id: "resources",
    question: "What resources are available?",
    answer: (
      <>
        <p>
          Check out{" "}
          <a
            href="https://www.figma.com/community/file/1144013421600974167"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-compsigh hover:underline hover:decoration-[var(--color-compsigh)]"
            style={{ color: "var(--color-compsigh)" }}
          >
            GitHub&apos;s design system for hackathons
          </a>{" "}
          for inspiration and best practices.
        </p>
        <p>
          Our organizers and other teams will be available during office hours
          on Saturday to help with React & Next.js, design, or presentations.
        </p>
        <p>
          Pro tip: Document your process! Not just for the presentations, but
          for the camera roll too. :)
        </p>
      </>
    ),
  },
  {
    id: "advice",
    question: "Do you have any tips for first-time hackers?",
    answer: (
      <>
        <p>
          Whether it&apos;s your first-ever hackathon or you&apos;re a seasoned
          hacker, here are some pieces of advice from compsigh members to help
          you get the most out of the experience:
        </p>
        <p>
          <strong>
            Don&apos;t be afraid to mess up or not have something
            functioning
          </strong>{" "}
          — what matters is that you take something away from it!
        </p>
        <p>
          <strong>Go in with a plan to learn and have fun.</strong>{" "}
          It&apos;s a great place to network, meet new people, and explore
          different opportunities.
        </p>
        <p>
          <strong>Document your process!</strong> Not just for the
          presentations, but for the camera roll too. :)
        </p>
      </>
    ),
  },
];

export function FAQAccordion() {
  return (
    <Accordion.Root type="single" collapsible className="w-full">
      {faqData.map((item, index) => (
        <Accordion.Item
          key={item.id}
          value={item.id}
          className={`overflow-hidden ${index > 0 ? "border-t" : ""} ${
            index < faqData.length - 1 ? "border-b" : ""
          }`}
          style={{ borderColor: "var(--color-light-30)" }}
        >
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between p-4 text-left hover:opacity-80 focus:outline-none">
              <span className="max-w-[480px] text-lg font-semibold">
                {item.question}
              </span>
              <ChevronDownIcon
                className="h-5 w-5 group-data-[state=open]:rotate-180"
                aria-hidden
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
            <div className="max-w-[480px] px-4 pb-4 space-y-3">{item.answer}</div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
