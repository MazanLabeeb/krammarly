import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { IconButton } from "@mui/material";

interface Props {
  value: string | null | undefined;
  setValue: (value: string) => void;
}

export default function Presets({ value, setValue }: Props) {
  const [open, setOpen] = React.useState(
    JSON.parse(window.localStorage.getItem("collapse-open") || "false")
  );

  const handlerToggle = () => {
    setOpen(!open);
    window.localStorage.setItem("collapse-open", JSON.stringify(!open));
  };

  return (
    <div className="relative">
      <IconButton
        size="small"
        title="Toggle Presets"
        onClick={() => handlerToggle()}
        style={{ position: "absolute", right: 0, top: -40 }}
      >
        {open ? <ExpandLessIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
      <Collapse in={open} timeout="auto">
        <Autocomplete
          disablePortal
          fullWidth
          value={
            value === "" || value === null || value === undefined
              ? top100Films[0]
              : top100Films.find((option) => option.label === value)
          }
          onChange={(_, value) => setValue(value?.label || "")}
          size="small"
          id="combo-box-demo"
          options={top100Films}
          renderInput={(params) => <TextField {...params} label="Preset" />}
        />
      </Collapse>
    </div>
  );
}

const top100Films = [
  { label: "Remove grammar mistakes from the following text." },
  { label: "Write the following text in a very professional way." },
  { label: "Summarize the following text." },
];
