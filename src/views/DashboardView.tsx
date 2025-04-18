import SearchBar from "../components/Dashboard/SearchBar";
import ContactList from "../components/Dashboard/ContactList";

export default function DashboardView() {
  return (
    <div className="container mx-auto py-4 sm:p-4   mt-4 mb-auto">

      <div className="flex flex-row justify-between items-center mb-6 gap-4">
        <SearchBar />
       
      </div>

      <ContactList />
    </div>
  );
}
