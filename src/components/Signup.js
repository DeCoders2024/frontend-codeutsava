import React, { useState, useRef, useContext } from "react";
// import '../css/signup.css'
import { postRequest } from "../api/server";
import { Grid, Button, TextField } from "@material-ui/core";
import {useHistory} from "react-router-dom"
import ContextMain from "../context/ContextMain";
export default function Signup() {
    const context = useContext(ContextMain);
    const history=useHistory()
	const [getData, setData] = useState({ emailid: "", password: "", name: "" });
	const formRef = useRef();
	const handleClick = async (e) => {
		context.setLoading(true);
		e.preventDefault();
		let res = await postRequest("user/", getData);
		context.setLoading(false);
		if (res.status) {
			context.Alert("SignUp SuccessFully", "success");
			window.location.href = "/";
		} else {
			alert(res.error);
		}
	};
	const setUserData = (e, type) => {
		let obj = getData;
		obj[type] = e.currentTarget.value;
		setData(obj);
	};
	return (
        <div className="login-main-div">
            <div className="login-sec-1">
				<img
					className="login-sec-1-img"
					src="https://images.unsplash.com/photo-1674482292543-68ec8f11114b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
					alt="..."
				/>
			</div>
			<div className="login-sec-2">
				<div className="login-sec-2-main">
					<Grid containor>
						<Grid style={{ margin: 20 }} xs={12} item>
							<div class="login-sec-2-label"> Signup</div>
						</Grid>
						<form ref={formRef} onSubmit={handleClick}>
							<Grid style={{ margin: 20 }} item xs={12}>
								<TextField
									fullWidth
									onChange={(e) => {
										setUserData(e, "name");
									}}
									required={true}
									variant="standard"
									label="Name"
									type="text"
								/>
							</Grid>
							<Grid style={{ margin: 20 }} item xs={12}>
								<TextField
									fullWidth
									onChange={(e) => {
										setUserData(e, "emailid");
									}}
									required={true}
									variant="standard"
									label="Email Id"
									type="email"
								/>
							</Grid>
							<Grid style={{ margin: 20 }} item xs={12}>
								<TextField
									fullWidth
									variant="standard"
									onChange={(e) => {
										setUserData(e, "password");
									}}
									required={true}
									label="Password"
									type="password"
								/>
							</Grid>
							<Grid style={{ margin: 20 }} item xs={12}>
								<Button
									fullWidth
									variant="outlined"
									color="secondary"
									type="submit"
								>
									Signup
								</Button>
							</Grid>
						</form>
						<Grid style={{ margin: 20 }} item xs={12}>
							<div class="signup-sec-2-txt">
								If You Already Have Account ?{" "}
								<span
									onClick={() => {
										history.push("/login")
									}}
									className="login-sec-2-warn"
								>
									Login
								</span>
							</div>
						</Grid>
					</Grid>
				</div>
			</div>
			
		</div>
	);
}