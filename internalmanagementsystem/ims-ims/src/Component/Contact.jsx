import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message sent successfully ✅");

        setForm({
            name: "",
            email: "",
            message: ""
        });
    };

    return (
        <div className="contact-container">
            <div className="contact-card">

                <h2>📞 Contact Us</h2>
                <p className="subtitle">
                    We'd love to hear from you!
                </p>

                <form onSubmit={handleSubmit} className="contact-form">

                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={form.message}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Send Message</button>
                </form>

            </div>
        </div>
    );
};

export default Contact;