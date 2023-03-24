/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link,useParams } from "react-router-dom";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";

export default function ContactsTable() {
  const [contacts, setContacts] = useState([]);
  const { id } = useParams();

  async function getContacts() {
    const response = await axios.get(`http://127.0.0.1:8000/api/contacts/${id}`);
    return response.data;
  }

//   async function deleteContact(id) {
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/contact/${id}`);
//       const newContacts = contacts.filter((contact) => contact.id !== id);
//       setContacts(newContacts);
//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Contact supprimée",
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Erreur utilisateur non supprimé",
//       });
//     }
//   }

async function deleteContact(contactId) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/contact/${contactId}`);
      const newContacts = contacts.filter((contact) => contact.id !== contactId);
      setContacts(newContacts);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Contact supprimée",
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
      const data = await getContacts();
      setContacts(data);
    }

    fetchData();
  }, []);

  return {
    columns: [
      { Header: "Nom", accessor: "Nom", width: "45%", align: "left" },
      { Header: "Numero", accessor: "Numero", align: "left" },
      { Header: "Action", accessor: "Action", align: "center" },
    ],

    rows: contacts.map((contact) => ({
      Nom: contact.nom,
      Numero: contact.numero,
      Action: [
        <Link key="edit" to={`/contact/edit/${contact.id}`} component={Link}>
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
              deleteContact(contact.id);
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
