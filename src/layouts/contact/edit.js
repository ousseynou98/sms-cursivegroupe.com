/* eslint-disable prettier/prettier */
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material UI components
import {
  Box,
  TextField,
} from "@material-ui/core";

// Axios for API requests
import axios from "axios";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// React Router Dom
import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function EditContact() {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [nom, setNom] = useState("");
  const [numero, setNumero] = useState("");

  // Cette fonction sera exécutée lorsque le composant sera monté pour la première fois
  useEffect(() => {
    // On fait une requête à l'API pour récupérer les données  correspondant à l'id dans l'URL
    axios
      .get(`http://127.0.0.1:8000/api/contact/${id}`)
      .then((response) => {
        const contactData = response.data;
        // On met à jour les états avec les données récupérées
        setNom(contactData.nom);
        setNumero(contactData.numero);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Une erreur est survenue, veuillez réessayer!",
        });
      });
  }, [id]);

  const handleNomChange = (event) => {
    setNom(event.target.value);
  };

  const handleNumeroChange = (event) => {
    setNumero(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      nom,
      numero,
    };
    axios
      .put(`http://127.0.0.1:8000/api/contact/update/${id}`, data)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Succès",
          text: "Contact modifiée avec succès!",
        }).then(() => {
          // Redirection vers la page de liste contact
          navigate("/contacts");
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Une erreur est survenue, veuillez réessayer!",
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
                  Modifier utilisateur
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* Formulaire de modification utilisateur */}
                <MDBox p={3}>
                  <form onSubmit={handleSubmit}>
                    <Box p={3}>
                      <TextField
                        label="Nom contact"
                        value={nom}
                        onChange={handleNomChange}
                        fullWidth
                      />
                    </Box>
                    <Box p={3}>
                      <TextField
                        label="Numero "
                        type="number"
                        value={numero}
                        onChange={handleNumeroChange}
                        fullWidth
                      />
                    </Box>
                    <MDBox p={3} textAlign="right">
                      <Link to="/contacts" component={Link}>
                        <MDButton
                          variant="gradient"
                          color="primary"
                          style={{ marginRight: "10px" }}
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

export default EditContact;
