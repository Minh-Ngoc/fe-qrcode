import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Login() {
    // initial state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        // set configurations
        const configuration = {
        method: "post",
        url: "http://localhost:4000/api/login",
        data: {
            username,
            password,
        },
        };

        // make the API call
        axios(configuration)
            .then((result) => {
                setLogin(true);
            })
            .catch((error) => {
                error = new Error();
            })
    
        //     // set the cookie
        //     cookies.set("TOKEN", result.data.token, {
        //         path: "/",
        //     });
        //     // redirect user to the auth page
        //     window.location.href = "/auth";

        //     setLogin(true);
        // })
        // .catch((error) => {
        //     error = new Error();
        // });
    };

    return (
        <>
            <h2>Login</h2>
            <Form onSubmit={(e) => handleSubmit(e)}>
                {/* username */}
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username address</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                    />
                </Form.Group>

                {/* password */}
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </Form.Group>
                {/* submit button */}
                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                >
                    Login
                </Button>
                 {/* display success message */}
                {login ? (
                <p className="text-success">You Are Logged in Successfully</p>
                ) : (
                <p className="text-danger">You Are Not Logged in</p>
                )}
                
                
            </Form>
        </>
    );
}