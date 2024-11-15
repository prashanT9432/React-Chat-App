import React from "react";
import ContactTab from "./ContactTab";

function ContactList({ contacts }) {
  const parseTimestamp = (timestamp) => {
    const [time, modifier] = timestamp.split(" ");
    let [hours, minutes, seconds] = time.split(":");

    // Default seconds to '00' if missing
    seconds = seconds ? seconds : "00";

    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    // Return a Date object
    const dateStr = `1970-01-01T${hours}:${minutes}:${seconds}`;
    return new Date(dateStr);
  };

  console.log("Contacts before sorting:", contacts);

  const sortedContacts = contacts.slice().sort((a, b) => {
    const aLength = a.chatlog.length;
    const bLength = b.chatlog.length;

    const aLatest =
      aLength > 0
        ? parseTimestamp(a.chatlog[aLength - 1].timestamp)
        : new Date(0);
    const bLatest =
      bLength > 0
        ? parseTimestamp(b.chatlog[bLength - 1].timestamp)
        : new Date(0);

    console.log(`Comparing ${aLatest} and ${bLatest}`);

    return bLatest - aLatest; // Descending order to move latest message to the top
  });

  console.log("Contacts after sorting:", sortedContacts);

  return (
    <>
      <div style={styles.contactList} className="contactscreen">
        {sortedContacts.map((contact) => (
          <ContactTab contact={contact} key={contact.id} />
        ))}
      </div>
    </>
  );
}

const styles = {
  contactList: {
    overflowY: "scroll",
    height: "84vh",
    zIndex: "2",
    backgroundColor: "#fff",
  },
};

export default ContactList;
