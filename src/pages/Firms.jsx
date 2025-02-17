import { Button, Container, Typography } from "@mui/material";

import FirmCard from "../components/Cards/FirmCard";

const Firms = () => {
  return (
    <Container>
      <Typography variant="h4" color="secondary.main" align="center">
        <FirmCard />
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }}>
        NEW FIRM
      </Button>
    </Container>
  );
};

export default Firms;
