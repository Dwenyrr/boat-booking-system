import SailingIcon from "@mui/icons-material/Sailing";
import { Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const Navigointi: React.FC = (): React.ReactElement => {

  return (

    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "1.5rem",
        padding: "1.5rem",
        color: "#fff",
        backgroundColor: "#245CA6",
      }}
    >
      <SailingIcon sx={{ mr: "0.5rem" }} />

      <Typography variant="h5" sx={{ fontWeight: "bold", mr: "2rem" }}>
        VeVa
      </Typography>

      <Button
        variant="text"
        color="inherit"
        size="large"
        component={Link}
        to={"/etusivu"}
        sx={{ flexGrow: "1", fontWeight: "bold" }}
      >
        Etusivu
      </Button>

      <Button
        variant="text"
        color="inherit"
        size="large"
        component={Link}
        to={"/vene"}
        sx={{ flexGrow: "1", fontWeight: "bold" }}
      >
        Vene
      </Button>

      <Button
        variant="text"
        color="inherit"
        size="large"
        component={Link}
        to={"/uusiVaraus"}
        sx={{ flexGrow: "1", fontWeight: "bold" }}
      >
        Varaa
      </Button>

      <Button
        variant="text"
        color="inherit"
        size="large"
        component={Link}
        to={"/varaukset"}
        sx={{ flexGrow: "1", fontWeight: "bold" }}
      >
        Varaukset
      </Button>

      <IconButton 
        sx={{ 
            color: "#fff" 
            }} 
        component={Link} 
        to={"/"}
        >
        <LogoutIcon color="inherit" />
      </IconButton>
    </div>
  );
};

export default Navigointi;
