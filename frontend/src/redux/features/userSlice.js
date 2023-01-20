import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../../App';

// get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
	user: user ? user : null,
	loginStatus: 'idle',
	loginError: null,
	signupStatus: 'idle',
	signupError: null,
};

export const loginUser = createAsyncThunk(
	'users/login',
	async ({ email, password }, { rejectWithValue }) => {
		const response = await fetch(`${URL}/api/user/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		const json = await response.json();

		if (!response.ok) {
			return rejectWithValue(json);
		}
		if (response.ok) {
			localStorage.setItem('user', JSON.stringify(json));
			return json;
		}
	}
);
export const signupUser = createAsyncThunk(
	'users/signup',
	async ({ email, password }, { rejectWithValue }) => {
		const response = await fetch(`${URL}/api/user/signup`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});
		const json = await response.json();

		if (!response.ok) {
			return rejectWithValue(json);
		}
		if (response.ok) {
			localStorage.setItem('user', JSON.stringify(json));
			return json;
		}
	}
);

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		logoutUser: (state, action) => {
			localStorage.removeItem('user');

			state.user = null;
			state.loginStatus = 'idle';
			state.loginError = null;
			state.signupStatus = 'idle';
			state.signupError = null;
		},
	},
	extraReducers(builder) {
		builder.addCase(loginUser.pending, (state, action) => {
			state.loginStatus = 'loading';
			state.loginError = null;
		})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loginStatus = 'succeeded';
				state.loginError = null;
				state.user = action.payload;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loginStatus = 'failed';
				state.loginError = action.payload.error;
			})
			.addCase(signupUser.pending, (state, action) => {
				state.signupStatus = 'loading';
				state.signupError = null;
			})
			.addCase(signupUser.fulfilled, (state, action) => {
				state.signupStatus = 'succeeded';
				state.signupError = null;
				state.user = action.payload;
			})
			.addCase(signupUser.rejected, (state, action) => {
				state.signupStatus = 'failed';
				state.signupError = action.payload.error;
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
export const { logoutUser } = userSlice.actions;
