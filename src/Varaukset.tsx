import { IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import Navigointi from "./components/Navigointi";
import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

interface Props {
  varaukset: Varaus[];
}

const Varaukset: React.FC<Props> = ({ varaukset }): React.ReactElement => {
  
  const tulevatVaraukset : Varaus[] = varaukset.filter(
    (varaus) => varaus.alkamisaika.getTime() > Date.now()
  );

  tulevatVaraukset.sort((a, b) => 
    a.loppumisaika.getTime() - b.loppumisaika.getTime()
  );

  const menneetVaraukset : Varaus[] = varaukset.filter(
    (varaus) => varaus.alkamisaika.getTime() <= Date.now()
  );
  
  menneetVaraukset.sort((a, b) => 
    a.loppumisaika.getTime() - b.loppumisaika.getTime()
  );

  return (
    <>
      <Navigointi />

      <div style={{ padding: "1.5rem" }}>

        <Typography variant="h5" sx={{ mb: "1rem" }}>
          Varaukset:
        </Typography>

        <div style={{ margin: "0.5rem" }}>
          <Typography variant="h6">Tulevat varaukset:</Typography>
          {tulevatVaraukset.length > 0 ? (
            <List>
              {tulevatVaraukset.map((varaus: Varaus, idx: number) => {
                return (
                  <ListItem divider key={idx}>
                    <ListItemText primary={varaus.varaaja} />
                    <ListItemText
                      primary={format(varaus.alkamisaika, "d.M.Y HH:mm")}
                    />
                    <ListItemText
                      primary={format(varaus.loppumisaika, "d.M.Y HH:mm")}
                    />
                    <ListItemIcon>
                      <IconButton
                        edge="end"
                        component={Link}
                        to={`/muokkaa/${varaus.id}`}
                      >
                        <EditIcon />
                      </IconButton>
                    </ListItemIcon>
                    <ListItemIcon>
                      <IconButton
                        edge="end"
                        component={Link}
                        to={`/poista/${varaus.id}`}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemIcon>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <Typography sx={{ml: '.5rem'}}>Ei tulevia varauksia.</Typography>
          )}

          <Typography variant="h6" sx={{mt: '1rem'}}>Menneet varaukset:</Typography>

          {menneetVaraukset.length > 0 
          
            ? <List>
                {menneetVaraukset.map((varaus: Varaus, idx: number) => {
                  return (
                    <ListItem divider key={idx}>
                      <ListItemText primary={varaus.varaaja} />
                      <ListItemText
                        primary={format(varaus.alkamisaika, "d.M.Y HH:mm")}
                      />
                      <ListItemText
                        primary={format(varaus.loppumisaika, "d.M.Y HH:mm")}
                      />
                      <ListItemIcon>
                        <IconButton
                          edge="end"
                          component={Link}
                          to={`/muokkaa/${varaus.id}`}
                        >
                          <EditIcon />
                        </IconButton>
                      </ListItemIcon>
                      <ListItemIcon>
                        <IconButton
                          edge="end"
                          component={Link}
                          to={`/poista/${varaus.id}`}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemIcon>
                    </ListItem>
                  );
                })}
              </List>
             
          
          : <Typography sx={{ml: '.5rem'}}>Ei menneitä varauksia.</Typography>
            
          }

        </div>
      </div>
    </>
  );
};

export default Varaukset;
