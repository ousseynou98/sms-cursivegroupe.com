/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";

export default function CampagnesTable() {
  const [campagnes, setCampagnes] = useState([]);

  async function getCampagnes() {
    const response = await axios.get("http://127.0.0.1:8000/api/campagnes");
    return response.data;
  }

  async function deleteCampagne(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/campagne/${id}`);
      const newCampagnes = campagnes.filter((campagne) => campagne.id !== id);
      setCampagnes(newCampagnes);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Campagne supprimée",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Erreur utilisateur non supprimé",
      });
    }
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getCampagnes();
      setCampagnes(data);
    }

    fetchData();
  }, []);

  return {
    columns: [
      { Header: "Nom", accessor: "Nom", width: "45%", align: "left" },
      { Header: "Description", accessor: "Description", align: "left" },
      { Header: "Contacts", accessor: "Contacts", align: "center" },
      { Header: "SMS", accessor: "SMS", align: "center" },
      { Header: "Action", accessor: "Action", align: "center" },
    ],

    rows: campagnes.map((campagne) => ({
      Nom: campagne.nom,
      Description: campagne.description,
      Contacts: [
        <Link key="contact" to={`/contacts/${campagne.id}`} component={Link}>
          <MDButton variant="text" color="dark">
            <Icon>call</Icon>&nbsp;contact
          </MDButton>
        </Link>
      ],
      SMS: [
        <Link key="contact" to={`/sms/send/${campagne.id}`} component={Link}>
          <MDButton variant="text" color="dark">
            <Icon>chat</Icon>&nbsp;SMS
          </MDButton>
        </Link>
      ],
      Action: [
        <Link key="edit" to={`/campagne/edit/${campagne.id}`} component={Link}>
          <MDButton variant="text" color="dark">
            <Icon>edit</Icon>&nbsp;edit
          </MDButton>
        </Link>,
        <MDButton
        key="delete"
        variant="text"
        color="primary"
        onClick={() => {
          Swal.fire({
            title: "Voulez vous confirmer la suppression?",
            text: "Vous ne pourrez pas revenir en arrière !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Supprimer",
            cancelButtonText: "Annuler",
          }).then((result) => {
            if (result.isConfirmed) {
              deleteCampagne(campagne.id);
            }
          });
        }}
      >
        <Icon>delete</Icon>&nbsp;delete
      </MDButton>,
      ],
    })),
  };
}
