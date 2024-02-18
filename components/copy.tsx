import { Button } from "@mui/material";
import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Copy = ({ text }: { text: string }) => {
  const [loading, setLoading] = useState<boolean>(false);

  if (!text) return null;

  return (
    <Button
      variant="outlined"
      color="success"
      startIcon={<ContentCopyIcon />}
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
