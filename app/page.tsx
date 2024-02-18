"use client";
import Copy from "@/components/copy";
import { runChat } from "@/lib/gemini";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress, Divider, Typography } from "@mui/material";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const handler = async () => {
    setLoading(true);
    runChat(input)
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
        }}
        variant="h3"
        color="primary"
        align="center"
      >
        Krammarly
      </Typography>
      <div className="mt-6">
        <TextField
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") handler();
            if (e.key === "Escape") setInput("");
            if (e.key === "Tab") e.preventDefault();
            if (e.key === "Tab") setInput((prev) => prev + "  ");
            if (e.key === "Enter" && e.ctrlKey) {
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
          maxRows={6}
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <br />
        <div className="flex flex-row gap-3 mt-3">
          <Button
            variant="outlined"
            onClick={() => handler()}
            disabled={loading || !input || input?.trim() === ""}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            Correct
          </Button>
        </div>
        {output && (
          <div>
            <Divider sx={{ my: 3 }} />
            <Copy text={output} />
            <Typography sx={{ mt: 2 }} variant="body2">
              {output}
            </Typography>
          </div>
        )}
      </div>
    </main>
  );
}
