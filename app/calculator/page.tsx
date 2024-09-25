"use client";
import Copy from "@/components/copy";
import { runChat } from "@/lib/gemini";
import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress, Divider, Typography } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import EditIcon from "@mui/icons-material/Edit";
import GitHubIcon from "@mui/icons-material/GitHub";
import Presets from "@/components/presets";
import CalculateIcon from "@mui/icons-material/Calculate";

type InputType = {
  rate: number;
  balance: number | null;
};

export default function Home() {
  const [prompt, setPrompt] = useState<string | null>();
  const r1 = useRef<HTMLInputElement>(null);
  const r2 = useRef<HTMLInputElement>(null);
  const r3 = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<InputType>({
    rate: 15,
    balance: null,
  });
  const [fixInput, setFixInput] = useState<number | null>(null);
  const [output, setOutput] = useState<string>("");
  const [outputFixed, setOutputFixed] = useState<string>("");

  const hourlyHandler = () => {
    
    const paying = (input.balance || 0) * (100 / 105);
    const totalHours = paying / input.rate;
    const receivable = paying - paying / 10;
    const tax = paying - receivable + (input.balance || 0) - paying;

    // Convert hours to time readable format
    const hours = Math.floor(totalHours);
    const minutes = Math.floor((totalHours - hours) * 60);
    const readableTime = `${hours} hours and ${minutes} minutes`;

    setOutput(
      `<strong>Total Hours:</strong> ${readableTime} <br/><strong>To be Paid:</strong> ${paying.toFixed(
        2
      )} <br/><strong>Total Taxes:</strong> ${tax.toFixed(
        2
      )} <br/><strong>Receivable:</strong> ${receivable.toFixed(2)}`
    );
  };
  const fixedandler = () => {
    const paying = (fixInput || 0) * (100 / 105);
    const receivable = paying - paying / 10;
    const tax = paying - receivable + (fixInput || 0) - paying;

    setOutputFixed(
      `<strong>To be Paid:</strong> ${paying.toFixed(
        2
      )} <br/><strong>Total Taxes:</strong> ${tax.toFixed(
        2
      )} <br/><strong>Receivable:</strong> ${receivable.toFixed(2)}`
    );
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
        <CalculateIcon
          sx={{
            mt: -1,
            mr: 1,
            fontSize: "52px",
          }}
        />
        Krammarly Calculator
      </Typography>
      <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-xl font-bold text-center">
            Hourly Payment Calculator
          </h1>
          <div>
            <TextField
              autoFocus
              sx={{ mt: 2 }}
              inputRef={r1}
              type="number"
              id="filled-multiline-flexible"
              placeholder="Enter your per hour rate here."
              label="Per/Hour Rate"
              fullWidth
              disabled={loading}
              variant="outlined"
              value={input.rate}
              onChange={(e) =>
                setInput({
                  ...input,
                  rate: Number(e.target.value),
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) r2.current?.focus();
                if (
                  e.key === "Escape" ||
                  (e.key === "Backspace" && e.ctrlKey)
                ) {
                  setInput({ balance: 0, rate: 0 });
                }
              }}
            />
            <TextField
              autoFocus
              sx={{ mt: 2 }}
              inputRef={r2}
              type="number"
              placeholder="Enter Total Available Balance here."
              label="Available Balance"
              fullWidth
              disabled={loading}
              variant="outlined"
              value={input.balance}
              onChange={(e) =>
                setInput({
                  ...input,
                  balance: Number(e.target.value),
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey)
                  !(!input || input?.balance === 0)
                    ? hourlyHandler()
                    : r2.current?.focus();
                if (
                  e.key === "Escape" ||
                  (e.key === "Backspace" && e.ctrlKey)
                ) {
                  setInput({ balance: 0, rate: 0 });
                }
              }}
            />

            <br />
            <div className="flex flex-row gap-3 mt-3 w-full  flex-wrap">
              <Button
                variant="outlined"
                onClick={() => hourlyHandler()}
                disabled={loading || !input || input?.balance === 0}
                startIcon={
                  loading ? <CircularProgress size={20} /> : <AutoAwesomeIcon />
                }
              >
                Calculate
              </Button>
              {output && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setInput({ rate: 0, balance: 0 });
                    setOutput("");
                  }}
                  disabled={loading}
                  color="warning"
                  startIcon={<ClearAllIcon />}
                >
                  Clear
                </Button>
              )}
            </div>
            {output && (
              <div>
                <Divider sx={{ my: 3 }} />
                <Typography
                  sx={{ mt: 2 }}
                  variant="body2"
                  dangerouslySetInnerHTML={{ __html: output }}
                />
              </div>
            )}
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold text-center">
            Fixed Payment Calculator
          </h1>
          <div>
            <TextField
              autoFocus
              sx={{ mt: 2 }}
              inputRef={r3}
              type="number"
              placeholder="Enter Total Available Balance here."
              label="Available Balance"
              fullWidth
              disabled={loading}
              variant="outlined"
              value={fixInput}
              onChange={(e) => setFixInput(Number(e.target.value))}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey)
                  !(!fixInput || fixInput === 0)
                    ? fixedandler()
                    : r3.current?.focus();
                if (
                  e.key === "Escape" ||
                  (e.key === "Backspace" && e.ctrlKey)
                ) {
                  setInput({ balance: 0, rate: 0 });
                }
              }}
            />

            <br />
            <div className="flex flex-row gap-3 mt-3 w-full  flex-wrap">
              <Button
                variant="outlined"
                onClick={() => fixedandler()}
                disabled={loading || !fixInput || fixInput === 0}
                startIcon={
                  loading ? <CircularProgress size={20} /> : <AutoAwesomeIcon />
                }
              >
                Calculate
              </Button>
              {outputFixed && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setFixInput(0);
                    setOutputFixed("");
                  }}
                  disabled={loading}
                  color="warning"
                  startIcon={<ClearAllIcon />}
                >
                  Clear
                </Button>
              )}
            </div>
            {outputFixed && (
              <div>
                <Divider sx={{ my: 3 }} />
                <Typography
                  sx={{ mt: 2 }}
                  variant="body2"
                  dangerouslySetInnerHTML={{ __html: outputFixed }}
                />
              </div>
            )}
          </div>
        </div>
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
