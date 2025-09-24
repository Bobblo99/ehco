async function testContactApi() {
  const payload = {
    name: "Max Mustermann",
    email: "max@example.com",
    phone: "0171 1234567",
    subject: "Testanfrage",
    message: "Dies ist eine Testnachricht aus dem Script 🚀",
  };

  try {
    const res = await fetch("http://localhost:3000/api/contact-send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("📨 API Response:", data);
  } catch (err) {
    console.error("❌ Fehler beim Aufruf:", err);
  }
}

testContactApi();
