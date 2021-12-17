import React, {FC} from 'react';
import { Layout, Menu, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { AuthActionCreators } from '../store/reducers/auth/action-creators';
import { useDispatch } from 'react-redux';

const Navbar: FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {isAuth, user} = useTypedSelector(state => state.auth);

	return (
		<Layout.Header>
			<Row justify="end">
				{isAuth 
					? 
					<>
						<div style={{color: 'white'}}>
							{user.username}
						</div>
						<Menu theme="dark" mode="horizontal" selectable={false}>
							<Menu.Item 
								onClick={() => dispatch(AuthActionCreators.logout())}
								key={1}
							>
								LogOut
							</Menu.Item>
						</Menu>
					</>
					: 
					<>
						<Menu theme="dark" mode="horizontal" selectable={false}>
							<Menu.Item onClick={() => navigate('/login')} key={1}>
								LogIn
							</Menu.Item>
						</Menu>
					</>
				}
			</Row>
		</Layout.Header>
	);
};

export default Navbar;