import { Button } from "@mui/material";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const Copy = ({ text }: { text: string }) => {
  const [loading, setLoading] = useState<boolean>(false);

  if (!text) return null;

  return (
    <Button
      variant="outlined"
      color="success"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
      }}
      disabled={loading}
    >
      {loading ? "Copied!" : "Copy"}
    </Button>
  );
};

export default Copy;
