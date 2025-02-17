import { Button, Container, Typography } from "@mui/material";
import FirmCard from "../components/Cards/FirmCard";

const Firms = () => {
  return (
    <Container>
      <Button variant="contained" sx={{ mt: 2 }}>
        NEW FIRM
      </Button>
      <Typography variant="h4" color="secondary.main" align="center">
        <FirmCard />
      </Typography>
    </Container>
  );
};

export default Firms;
