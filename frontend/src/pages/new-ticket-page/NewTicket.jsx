import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../features/auth/authSlice";
import {
  createNewTicket,
  fetchProjects,
  getProjects,
  getTicket,
  reset,
} from "../../features/tickets/ticketSlice";
import { Button, Form, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { BackButton } from "../../components";

function NewTicket() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(getUser);
  const projects = useSelector(getProjects);
  const { isLoading, isSuccess, isError, message } = useSelector(getTicket);

  useEffect(() => {
    dispatch(fetchProjects());

    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("Ticket Created Successfully");
      navigate("/tickets");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [project, setProject] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const clearForm = () => {
    setProject("");
    setTitle("");
    setDescription("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (project === "" || title === "" || description === "") {
      toast.error("Please fill out the required fields");
      return;
    }

    const ticketData = {
      project,
      title,
      description,
    };

    dispatch(createNewTicket(ticketData));
  };

  return (
    <Container>
      <BackButton url="/" />
      <section>
        <h1 className="heading custom-text-primary">Create Ticket</h1>
        <p className="heading-sub custom-text-secondary">
          Please enter the details to create a new ticket
        </p>
      </section>

      <Form onSubmit={onSubmit}>
        {/* Name */}
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Name</strong>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Jhon Smith"
            id="name"
            value={name}
            name="name"
            disabled
          />
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Email</strong>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="name@youroganization.com"
            id="email"
            value={email}
            name="email"
            disabled
          />
        </Form.Group>

        {/* Projects */}
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Choose a Project *</strong>
          </Form.Label>
          <Form.Select
            type="checkbox"
            onChange={(e) => setProject(e.target.value)}
            required
          >
            <option value="">Select a Project</option>
            {projects.map((project) => (
              <option key={project._id} value={project.projectName}>
                {project.projectName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Title */}
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Issue Title *</strong>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the issue title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Issue Description *</strong>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter the issue description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <div className="button-group">
          <Button
            className="btn btn-light"
            style={{ marginRight: "10px" }}
            onClick={clearForm}
          >
            Clear
          </Button>
          <Button className="btn btn-dark" type="submit" disabled={isLoading}>
            {isLoading ? "Loading…" : "Open Ticket"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default NewTicket;
