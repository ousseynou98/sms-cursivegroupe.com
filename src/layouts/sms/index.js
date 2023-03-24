/* eslint-disable prettier/prettier */
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import {useParams } from "react-router-dom";


function SendSms() {
  const { id } = useParams();
  const [idCampagne, setIdCampagne] = useState(id || 'defaultId');
  const handleIdCampagneChange = (event) => {
    setIdCampagne(event.target.value);
  };
  
  const [message, setMessage] = useState("");
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`http://127.0.0.1:8000/api/sms/send`, {
        message,
        idCampagne
      })
      .then((response) => {
        console.log(response.data);
        Swal.fire(
          "Succès!",
          "Le message a été envoyé.",
          "success"
        );
      })
      .catch((error) => {
        console.log(error);
        Swal.fire(
          "Erreur!",
          "Le message n'a pas pu être envoyé.",
          "error"
        );
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
                  Envoie SMS
                </MDTypography>
              </MDBox>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <Grid pt={3} container spacing={2}>
                    <Grid  item xs={12}>
                      <TextField
                        label="Message"
                        multiline
                        rows={4}
                        fullWidth
                        value={message}
                        onChange={handleMessageChange}
                      />
                    </Grid>
                    
                      <TextField
                        type="hidden"
                        fullWidth
                        name="idCampagne"
                        value={idCampagne}
                        onChange={handleIdCampagneChange}
                        style={{ display: "none" }}
                      />
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary" style={{ color: "white" }} >
                        Envoyer
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default SendSms;
