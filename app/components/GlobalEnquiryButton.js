"use client";

export default function GlobalEnquiryButton() {

  const handleClick = () => {
    const section = document.getElementById("enquiry-form");

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/contactus";
    }
  };

  return (
    <div style={styles.button} onClick={handleClick}>
      Book Enquiry
    </div>
  );
}

const styles = {
  button: {
    position: "fixed",
    right: "-60px",
    top: "50%",
    transform: "rotate(-90deg)",
    background: "#ff6a00",   // TENDA orange
    color: "#fff",
    padding: "12px 28px",
    fontWeight: "600",
    cursor: "pointer",
    zIndex: "999999",
    borderRadius: "6px 6px 0 0",
    letterSpacing: "1px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease"
  }
};