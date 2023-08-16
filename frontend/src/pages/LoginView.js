import axios from "axios";
import React from "react";

class LoginView extends React.Component {

    QGetTextFromField = (e) => {
        this.setState((prevState) => ({
            user: { ...prevState.user, [e.target.name]: e.target.value }
        }));
    };

    QSendUserToParent = (obj) => {
        this.props.QUserFromChild(obj)
    }

    QPostLogin = () => {
        let user = this.state.user
        axios.post("/users/login", {
            username: user.username,
            password: user.password
        }, {withCredentials: true})
            .then(res => {
                console.log("Sent to server ...")
                this.QSendUserToParent(res.data)
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
                            onChange={(e) => this.QGetTextFromField(e)}
                            name="username"
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            onChange={(e) => this.QGetTextFromField(e)}
                            name="password"
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                </form>
                <button
                    onClick={() => this.QPostLogin()}
                    style={{ margin: "10px" }}
                    className="btn btn-primary bt"
                >
                    Login
                </button>
            </div>
        );
    }
}

export default LoginView;
