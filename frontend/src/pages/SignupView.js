import React from "react";
import axios from "axios";

class SignupView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                type: "login"
            }
        };
    }

    QGetTextFromField = (e) => {
        this.setState((prevState) => ({
            user: { ...prevState.user, [e.target.name]: e.target.value }
        }));
    };

    QSentUserToParent = () => {
        this.props.QUserFromChild(this.state.user);
    };

    QPostSignUp = () => {

        let user = this.state.user

        axios.post("/users/register/", {
            username: user.username,
            email: user.email,
            password: user.password
        }).then(res => {
            console.log("User sent to server ...")
        }).catch(err => {
            console.log(err)
        })
    }


    render() {
        return (
            <div
                className="card"
                style={{
                    width: "400px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "10px",
                    marginBottom: "10px"
                }}
            >
                <form style={{ margin: "20px" }}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            name="username"
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input
                            onChange={(e) => this.QGetTextFromField(e)}
                            name="username"
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            onChange={(e) => this.QGetTextFromField(e)}
                            name="username"
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                    </div>
                </form>
                <button
                    onClick={() => this.QPostSignUp()}
                    style={{ margin: "10px" }}
                    className="btn btn-primary bt"
                >
                    Submit
                </button>
            </div>
        );
    }
}
export default SignupView;
