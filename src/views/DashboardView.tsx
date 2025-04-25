import { useState } from "react";
import SearchBar from "../components/Dashboard/SearchBar";
import ContactList from "../components/Dashboard/ContactList";
import AddContactModal from "../components/Contact/AddContactModal";
import EditContactData from "../components/Contact/EditContactData";

export default function DashboardView() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className="container mx-auto py-4 sm:p-4 mt-4 mb-auto">
        <div className="flex flex-row justify-between items-center mb-6 gap-4">
          <SearchBar onSearch={setSearchTerm} />
        </div>
        <ContactList searchTerm={searchTerm} />
      </div>
      <AddContactModal />
      <EditContactData />
    </>
  );
}