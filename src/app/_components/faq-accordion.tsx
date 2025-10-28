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
      <div className="text-sm">
        <p>
          DEPLOY/25 is geared towards CS aswell as our friends from other disciplines of study like design, engineering, and E&I, but all USF students
          are welcome and encouraged to participate!
        </p>
        <p> 
          Anyone is welcome to come hang out and hack, but only USF students who
          register for the event will be eligible to win.
        </p>
        <p>
          Participants can form teams of 1–4. All team members must be on stage
          on presentation day to be eligible to win.
        </p>
      </div>
    ),
  },
  {
    id: "presentations",
    question: "How do presentations work?",
    answer: (
      <div className="text-sm">
        <p>
          Your team presents for 5 minutes, judges ask questions for 2 minutes,
          and audience asks questions for 2 minutes.
        </p>
        <p>
          You&apos;re welcome to spend your presentation time in whichever way
          you see fit. We highly encourage creative presentation formats!
        </p>
        <p>
          In your presentation, please make sure your team members&apos; roles
          in bringing the project to life are clearly articulated.
        </p>
      </div>
    ),
  },
  {
    id: "winning",
    question: "How do we win?",
    answer: (
      <div className="text-sm">
        <p>
          Teams can earn a People&apos;s Choice, 3rd, 2nd, or 1st Place victory.
        </p>
        <p>
          An array of professors — primarily from computer science — will be
          joining us on Sunday to judge presentations.
        </p>
        <p>
          Judging Criteria: Polish & User Experience, Creative Presentation,
          Problem Definition, Solution Showcase, Ambition.
        </p>
        <p>
          Grade Level Multipliers: All 4th-year team (1.00x), All 3rd-year team
          (1.10x), All 2nd-year team (1.15x), All 1st-year team (1.20x), One out
          of each (1.1125x).
        </p>
      </div>
    ),
  },
  {
    id: "prizes",
    question: "What are the prizes?",
    answer: (
      <div className="text-sm">
        <p>
          We have exciting prizes for the top teams, including trophies,
          software subscriptions, and opportunities for further development.
        </p>
        <p>
          All winning teams will receive automatic approval for microgrants from
          the Entrepreneurship & Innovation IDEA Initiative to continue
          developing their projects.
        </p>
        <p>
          Specific prize details will be announced closer to the event date.
        </p>
      </div>
    ),
  },
  {
    id: "submissions",
    question: "What can we build?",
    answer: (
      <div className="text-sm">
        <p>
          Only one team member has to submit the project on behalf of the team.
        </p>
        <p>
          Project submissions are not limited to a theme — build whatever you
          like! Common formats: Mobile app, Desktop app, Web app, Website, Game,
          Hardware, Open source, Other.
        </p>
        <p>
          Important: Please do not start actively building your project
          (brainstorming is great though) until after the Opening Keynote on
          Friday.
        </p>
        <p>
          For any submission, before you present your project, please ensure it
          is open-source or otherwise publicly accessible.
        </p>
        <p>
          Submissions don&apos;t have to be complete! What worked? What
          didn&apos;t? How would you continue to develop the project?
        </p>
      </div>
    ),
  },
  {
    id: "registration",
    question: "Registration & Deadlines",
    answer: (
      <div className="text-sm">
        <p>Registration Deadline: November 08, 08:00pm</p>
        <p>Team Formation Deadline: November 08, 11:59pm</p>
        <p>Project Submission Deadline: November 10, 11:30am</p>
        <p>
          Form teams of 1–4 people. You can register as an individual and find
          teammates at the event, or come with a pre-formed team.
        </p>
        <p>
          All team members must be present for the final presentation to be
          eligible for prizes.
        </p>
        <p>
          Looking for teammates? We&apos;ll have team formation activities
          during the opening event to help you connect with other participants!
        </p>
      </div>
    ),
  },
  {
    id: "places-to-work",
    question: "Where can I work with my team?",
    answer: (
      <div className="text-sm">
        <p>
          These rooms will be available throughout the weekend for teams to work
          in: LS 103, LS 209, LS 210, LS 303, LS 307. People have worked in
          cafes, classrooms, conference rooms, dorms, apartments, parks, etc.
          Working in person is important!
        </p>
      </div>
    ),
  },
  {
    id: "resources",
    question: "Additional Resources",
    answer: (
      <div className="text-sm">
        <p>
          Check out{" "}
          <a
            href="https://www.figma.com/community/file/1144013421600974167"
            target="_blank"
            rel="noopener noreferrer"
            className="text-compsigh"
            style={{ color: "var(--color-compsigh)" }}
          >
            GitHub&apos;s design system for hackathons
          </a>{" "}
          for inspiration and best practices.
        </p>
        <p>
          Need help with React & Next.js, design, or presentations? Our
          organizers and other teams will be available during office hours on
          Saturday.
        </p>
        <p>
          Pro tip: Document your process! Not just for the presentations, but
          for the camera roll too. :)
        </p>
      </div>
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
            <Accordion.Trigger className="group flex w-full items-center justify-between p-4 text-left transition-all duration-200 hover:opacity-80 focus:outline-none">
              <span className="text-lg font-semibold">{item.question}</span>
              <ChevronDownIcon
                className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-180"
                aria-hidden
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
            <div className="px-4 pb-4">{item.answer}</div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
