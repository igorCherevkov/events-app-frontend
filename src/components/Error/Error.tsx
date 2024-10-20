import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import styles from "./Error.module.css";

type ErrorProps = {
  message: string | null;
  severity: "error" | "info";
};

export const Error = ({ message, severity }: ErrorProps) => {
  return (
    <Stack spacing={2}>
      <Alert
        className={styles.errorContainer}
        variant="filled"
        severity={severity}
      >
        {message}
      </Alert>
    </Stack>
  );
};
