import React, {FC} from 'react';
import { Layout, Menu, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';

const Navbar: FC = () => {
	const navigate = useNavigate();
	const {isAuth} = useTypedSelector(state => state.auth);

	return (
		<Layout.Header>
			<Row justify="end">
				{isAuth 
					? 
					<>
						<div style={{color: 'white'}}>
							Hello
						</div>
						<Menu theme="dark" mode="horizontal" selectable={false}>
							<Menu.Item onClick={() => console.log('Logout')} key={1}>
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