import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
    }

    if (formData.message.trim().length < 10) {
      newErrors.message =
        "Message must contain at least 10 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        const data = await response.json();

        if (!response.ok) {
          setErrors(data.details || { message: data.error });
          setSuccess("");
          return;
        }

        setSuccess(data.message);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } catch {
        setErrors({ message: "Could not reach the server. Please try again." });
        setSuccess("");
      }
    } else {
      setSuccess("");
    }
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1>Contact Us</h1>
        <p className="text-muted">
          Have a question or suggestion? We'd love to hear from you.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <form
            className="card shadow-sm p-4"
            onSubmit={handleSubmit}
          >
            {success && (
              <div className="alert alert-success">
                {success}
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">
                Name
              </label>

              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              {errors.name && (
                <small className="text-danger">
                  {errors.name}
                </small>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">
                Email
              </label>

              <input
                type="text"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              {errors.email && (
                <small className="text-danger">
                  {errors.email}
                </small>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">
                Subject
              </label>

              <input
                type="text"
                className="form-control"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />

              {errors.subject && (
                <small className="text-danger">
                  {errors.subject}
                </small>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">
                Message
              </label>

              <textarea
                className="form-control"
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>

              {errors.message && (
                <small className="text-danger">
                  {errors.message}
                </small>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-success"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;