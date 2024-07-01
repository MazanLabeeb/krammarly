"use client";
import Copy from "@/components/copy";
import { runChat } from "@/lib/gemini";
import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  CircularProgress,
  Divider,
  InputLabel,
  Typography,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import EditIcon from "@mui/icons-material/Edit";
import GitHubIcon from "@mui/icons-material/GitHub";

const prompt = `I am a full-stack JavaScript developer with over 5 years of experience. I am applying for a job on Upwork and need you to craft a highly tailored proposal based on the job description and my skills.

On Upwork, only the first two lines of a proposal are visible in the preview. To ensure the client clicks to read the full proposal, the opening lines must be exceptionally attention-grabbing. Additionally, the proposal should be very concise and extremely short, as clients prefer brief and direct applications. (Proposal length should be depend upon job description)

I am providing you GENERAL PROFILE SECTION and LIVE WORK SECTION. Try to must include those live projects atleast (links if useful) and my portfolio and github links.

START - GENERAL PROFILE SECTION
· 2000+ Work Hours
· 100% Client Satisfaction
· Top Rated

I am a full stack MERN developer and JavaScript enthusiast with more than 5 years' work experience. I have hand-on experience in developing Highly *Scalable* web applications. Proven ability to deliver high-quality software on time and within budget. Always eager to learn new web technologies.

 Why to Hire Me?
· I will write clean, highly scalable code.
· I will deliver a thoroughly tested application.
· I will be available for maintenance at an additional cost.
· I will never share code with anyone and will keep the project confidential.

> Artificial Intelligence 
· OpenAI (GPT), Langchain, Gemini, LLM, Text generation, Chat bots, DALL-E

> BACKEND STACK 
· Node.js, Express.js, Nestjs, PHP, Laravel
· RestAPI, GraphQL, WebSockets,
· Template Engines: Handlebars and EJS
· APIs: Stripe, Twillio, Sendgrid, Mailchimp

> DATABASES 
· MongoDB, Firebase, Supabase
· MySQL and PostgreSQL
· ORM: Sequelize, Mongoose, and Prisma

> FRONTEND STACK 
· Next.js, React.js, React Native
· SWR, Redux, React Query, Zustand, Sentry
· TailwindCSS, Bootstrap, Material UI, Chakra UI, Ant Design, React Native Paper
· SASS, CSS, Styled Components, Emotion, Storybook
· GraphQL and Rest API integration
· Figma or Adobe XD to React Pixel Perfect Conversion.
· Pusher, Stripe, Twilio, Sendgrid, Mailchimp etc.
· Localization/Multi-Language App.

> MOBILE APP DEVELOPMENT - iOS & android
· React Native, Expo
· React Native Paper

> Prototype Design
· Figma UI/UX

> WEB AUTOMATION AND SCRAPING 
· With Puppeteer, Node-Fetch, and Cheerio.

> DEVOPS 
· AWS EC2, Azure, Digital Ocean, GCP, Vercel, Heroku.
· Cloudflare, cPanel, Plesk, CyberPanel, etc.
· Docker, Jenkins

> VERSION CONTROL SYSTEM 
· Git and Github.

END - GENERAL PROFILE SECTION

START - LIVE WORK SECTION
I have worked on various SaaS applications and portals as a full stack developer. Here are some projects I have recently worked on:
· https://www.mara-solutions.com  
  A fully automated reviews reply generation system for your business. Fully developed product for over 4 years and very good user database. It uses GPT and other text generation models.
· https://app.courseai.com
  A SaaS product launched in July 2023. Over 100k+ users and is generating a good revenue. Generates courses using GPT.
  
· https://app.guidely.com
  A SaaS
· https://www.quickround.studio
  A personalized meeting management software for a company.
· https://bobbytariq.com
  A blog type MERN app by my client focused on selling his educational skills across students.

· https://sitkaseafoodmarket.com 
  An ecommerce website, contructed on top of shopify API and various technologies.

· https://novodraft.vercel.app (Under dev)
  A private tool for lawyers for creating and managing drafts.

· https://myerecruiter-5b20792904b3.herokuapp.com (under dev) 
  An AI based talent recruit and job apply platform for Canada. 

Here are my GitHub and portfolio links:
https://www.mazanlabeeb.me
https://github.com/mazanlabeeb
END - LIVE WORK

Please create a proposal that meets above criteria and following rules:
· First two sentences should be very attention grabbing for client.
· Output should be in plain text format for used on upwork.
· Ouptut should only include the proposal text without any additional phrases or explanations. Proposal itself must not start with heading.
· Use medium level english. Don't pick hard words.
`

export default function Proposal() {
//   const [prompt, setPrompt] = useState<string | null>();
  const r = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const handler = async () => {
    setLoading(true);
    runChat(input, prompt)
      .then((res) => setOutput(res))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (output) {
      navigator.clipboard.writeText(output);
    }
  }, [output]);

  return (
    <main className="min-h-screen p-4">
      <div className="mt-6">
        <TextField
          autoFocus
          inputRef={r}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) handler();
            if (e.key === "Escape" || (e.key === "Backspace" && e.ctrlKey))
              setInput("");
            if (e.key === "Tab") e.preventDefault();
            if (e.key === "Tab") setInput((prev) => prev + "  ");
            if (e.key === "Enter" && e.shiftKey) {
              setInput((prev) => prev + "\n");
            }
          }}
          id="filled-multiline-flexible"
          placeholder="Enter your text here."
          label="Job Description"
          multiline
          fullWidth
          disabled={loading}
          rows={3}
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <br />
        <div className="flex flex-row gap-3 mt-3 w-full  flex-wrap">
          <Button
            variant="outlined"
            onClick={() => handler()}
            disabled={loading || !input || input?.trim() === ""}
            startIcon={
              loading ? <CircularProgress size={20} /> : <AutoAwesomeIcon />
            }
          >
            Generate Proposal
          </Button>
          {output && (
            <Button
              variant="outlined"
              onClick={() => setInput("")}
              disabled={loading}
              color="warning"
              startIcon={<ClearAllIcon />}
            >
              Clear
            </Button>
          )}
          <div>
            <div className="flex flex-row gap-3 ">
              {output && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setInput(output);
                    setOutput("");
                    if (r.current) {
                      r.current.focus();
                    }
                  }}
                  color={"info"}
                  disabled={loading}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              )}
              <div className="justify-end flex ">
                <Copy text={output} />
              </div>
            </div>
          </div>
        </div>
        {output && (
          <div>
            <Divider sx={{ my: 3 }} />

            <Typography sx={{ mt: 2, maxWidth:'100%', overflow:'auto' }} component="pre">
              {output}
            </Typography>
          </div>
        )}
      </div>
      <footer className="fixed bottom-0 right-0 p-4">
        <a
          href="https://github.com/MazanLabeeb/krammarly"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon /> <span>Contribute here</span>
        </a>
      </footer>
    </main>
  );
}
