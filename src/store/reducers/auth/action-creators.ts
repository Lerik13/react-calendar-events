import { AppDispatch } from './../../index';
import { IUser } from "../../../models/IUser";
import { AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction } from "./types";
import axios from 'axios';

export const AuthActionCreators = {
	setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
	setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
	setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
	setError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
	login: (username: string, password: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch(AuthActionCreators.setIsLoading(true));
			setTimeout(async () => {
				const response = await axios.get<IUser[]>('./users.json')
				const mockUsers = response.data
				
				const mockUser = mockUsers.find(user => user.username === username && user.password === password)
				//console.log(mockUser)
				if (mockUser) {
					localStorage.setItem('auth', 'true')
					localStorage.setItem('username', mockUser.username)
					dispatch(AuthActionCreators.setIsAuth(true))
					dispatch(AuthActionCreators.setUser(mockUser))
				} else {
					dispatch(AuthActionCreators.setError('Incorrect username or password'))
				}
			}, 1000)
		} catch (e) {
			dispatch(AuthActionCreators.setError('Error during Login'))
		}
		dispatch(AuthActionCreators.setIsLoading(false))
	},
	logout: () => async (dispatch: AppDispatch) => {
		localStorage.removeItem('auth')
		localStorage.removeItem('username')
		dispatch(AuthActionCreators.setUser({} as IUser))
		dispatch(AuthActionCreators.setIsAuth(false))
	},
}