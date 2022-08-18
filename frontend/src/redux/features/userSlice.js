import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	loginStatus: "idle",
	loginError: null,
	signupStatus: "idle",
	signupError: null,
};

export const login = createAsyncThunk(
	"users/login",
	async ({ email, password }, { rejectWithValue }) => {
		const response = await fetch("/api/user/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		const json = await response.json();

		if (!response.ok) {
			return rejectWithValue(json);
		}
		if (response.ok) {
			localStorage.setItem("user", JSON.stringify(json));
			return json;
		}
	}
);
export const signup = createAsyncThunk(
	"users/signup",
	async ({ email, password }, { rejectWithValue }) => {
		const response = await fetch("/api/user/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});
		const json = await response.json();

		if (!response.ok) {
			return rejectWithValue(json);
		}
		if (response.ok) {
			localStorage.setItem("user", JSON.stringify(json));
			return json;
		}
	}
);

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setLogout: (state, action) => {
			localStorage.removeItem("user");
			state.user = null;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(login.pending, (state, action) => {
				state.loginStatus = "loading";
				state.loginError = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loginStatus = "succeeded";
				state.loginError = null;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.loginStatus = "failed";
				console.log(action.error);
				state.loginError = action.error.message;
			})
			.addCase(signup.pending, (state, action) => {
				state.signupStatus = "loading";
				state.signupError = null;
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.signupStatus = "succeeded";
				state.signupError = null;
				state.user = action.payload;
			})
			.addCase(signup.rejected, (state, action) => {
				state.signupStatus = "failed";
				state.signupError = action.error.message;
			});
	},
});

export default userSlice.reducer;

// selectors
export const selectUser = (state) => state.users.user;
export const selectLoginStatus = (state) => state.users.loginStatus;
export const selectLoginError = (state) => state.users.loginError;
export const selectSignupError = (state) => state.users.signupError;
export const selectSignupStatus = (state) => state.users.signupStatus;

// actions
export const { setUser, setLogout } = userSlice.actions;
