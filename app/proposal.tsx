"use client";
import Copy from "@/components/copy";
import { runChat } from "@/lib/gemini";
import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress, Divider, Typography } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import EditIcon from "@mui/icons-material/Edit";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GitHubIcon from "@mui/icons-material/GitHub";
import Presets from "@/components/presets";

export default function Proposal() {
  const [prompt, setPrompt] = useState<string | null>();
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
      <Typography
        style={{
          fontFamily: "Poppins",
          color: "black",
        }}
        variant="h4"
        // color="primary"
        align="center"
      >
        <MenuBookIcon
          sx={{
            mt: -1,
            mr: 1,
            fontSize: "52px",
          }}
        />
        Krammarly
      </Typography>
      <div className="mt-6">
        <Presets value={prompt} setValue={setPrompt} />
        <TextField
          autoFocus
          sx={{ mt: 2 }}
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
          label="Text"
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
            Correct
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

            <Typography sx={{ mt: 2 }} variant="body2">
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
