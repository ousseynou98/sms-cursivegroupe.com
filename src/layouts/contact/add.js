/* eslint-disable prettier/prettier */
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material UI components
import { Box, TextField} from "@material-ui/core";

// Axios for API requests
import axios from "axios";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// React Router Dom
import { useNavigate,Link,useParams } from "react-router-dom";
import React, { useState } from "react";
import Swal from 'sweetalert2';


function AddContact() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [idCampagne, setIdCampagne] = useState(id || 'defaultId');
  const handleIdCampagneChange = (event) => {
    setIdCampagne(event.target.value);
  };
  

  
  const [nom, setNom] = useState("");
  const handleNomChange = (event) => {
    setNom(event.target.value);
  };

  const [numero, setNumero] = useState("");
  const handleNumeroChange = (event) => {
    setNumero(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      nom,
      numero,
      idCampagne
    };
  axios.post("http://127.0.0.1:8000/api/contact/store", data)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Campagne ajoutée avec succès!',
      }).then(() => {
        // redirection vers la page de liste d'utilisateurs
        navigate("/campagnes");
      });
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Une erreur est survenue, veuillez réessayer!',
      });
    });
};

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Ajout contact
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* Formulaire d'ajout utilisateur */}
                <MDBox p={3}>
                  <form onSubmit={handleSubmit}>
                  <Box p={3}>
                    <TextField
                        label="Prenom & Nom"
                        value={nom}
                        onChange={handleNomChange}
                        fullWidth
                    />
                    </Box>
                    <Box p={3}>
                    <TextField
                        label="Numéro"
                        type="number"
                        value={numero}
                        onChange={handleNumeroChange}
                        fullWidth
                    />

                    <TextField
                        type="hidden"
                        name="idCampagne"
                        value={idCampagne}
                        onChange={handleIdCampagneChange}
                        fullWidth
                    />
                    </Box>
                    <MDBox p={3} textAlign="right">
                        <Link to='/campagnes' component={Link} >
                            <MDButton
                            variant="gradient"
                            color="primary"
                            style={{ marginRight: '10px' }}
                            >
                            Retour
                            </MDButton>
                        </Link>
                        <MDButton
                            variant="gradient"
                            color="info"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Enregistrer
                        </MDButton>
                    </MDBox>
                  </form>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AddContact;

                    