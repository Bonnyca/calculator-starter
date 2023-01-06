import { Container, Stack, Typography } from "@mui/material";

import Calculator from "../components/Calculator";
import CurrentCalculator from "./[operation]/[first]/[second]/index"

export default function Home(): JSX.Element {
  return (
    <Container maxWidth="sm">
      <Stack>
        <Typography variant="h2" gutterBottom sx={{ marginBottom: "30px" }}>
          The Amazing Calculator
        </Typography>
        <Calculator
        />
   
      </Stack>
    </Container>
  );
}

